import { test } from 'node:test'
import assert from 'node:assert/strict'

import { isCovered, flowAt } from './cover-flow.ts'

/**
 * Which covers in the deck are completely hidden behind another one.
 *
 * Past the clamp, every cover shares a single pose and they pile up exactly on
 * top of one another. Only the one that paints last in each pile is ever seen,
 * and the rest can stop drawing. Getting this wrong is invisible in code review
 * and shows up as one project's art appearing where another's should be.
 */
test('a cover buried in the right-hand pile is covered', () => {
  assert.equal(isCovered(10, 0, 18), true)
})

/*
 * The one that shipped broken, twice. First the right-hand pile was left to
 * document order, so the last cover on the page painted on top of it and
 * culling it swapped the sliver's art. Then the deck stopped relying on 3D
 * sorting at all: every cover stacks by its distance from the centre, the
 * nearest on top, so the last cover is buried like any other far one and the
 * exception that spared it is gone.
 */
test('the last cover is buried in the right-hand pile like any other far cover', () => {
  assert.equal(isCovered(17, 0, 18), true)
})

test('a cover buried in the left-hand pile is covered', () => {
  // Centred on 12: covers 0..5 sit behind the one at 6, which tops that pile.
  assert.equal(isCovered(2, 12, 18), true)
})

/**
 * Where the deck sits for a given fraction of the scroll through it.
 *
 * Not linear. Most of the scroll between two covers holds the current one dead
 * centre and the turn happens across the middle, so stopping on a half-turned
 * cover is something you have to aim for. The alternative was scroll-snap,
 * which moved the page under the reader and felt awful.
 */
test('holds a cover dead centre through the start of a step', () => {
  const step = 1 / 17
  assert.equal(flowAt(3 * step + step * 0.2, 18), 3)
})

test('lands a cover dead centre at both ends of the deck', () => {
  assert.equal(flowAt(0, 18), 0)
  assert.equal(flowAt(1, 18), 17)
})

test('never moves the deck backwards as the scroll advances', () => {
  let prev = -1
  for (let s = 0; s <= 1000; s++) {
    const v = flowAt(s / 1000, 18)
    assert.ok(v >= prev, `went backwards at ${s / 1000}: ${v} < ${prev}`)
    prev = v
  }
})

/*
 * The whole reason the mapping is not linear, stated as a number. Measured in
 * the browser first: sixteen of twenty-one sampled positions across one step
 * showed a landed cover. This keeps that true without a browser.
 */
test('most positions in the deck show a landed cover rather than a half-turn', () => {
  let landed = 0
  const total = 1001
  for (let s = 0; s < total; s++) {
    const v = flowAt(s / (total - 1), 18)
    if (Math.abs(v - Math.round(v)) < 0.001) landed++
  }
  const ratio = landed / total
  assert.ok(ratio > 0.6, `only ${(ratio * 100).toFixed(0)}% of positions were landed`)
})
