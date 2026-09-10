import { test } from 'node:test'
import assert from 'node:assert/strict'

import { SUMMARIES, captionFor } from './plain-summaries.ts'

/**
 * The caption under a cover on the deck.
 *
 * It is deliberately not its own field. `In simple terms` already answers
 * "what is this" in one sentence on every write-up, so the deck reads that
 * rather than carrying a second copy that could disagree with the page it
 * links to. These assert the relationship instead of the wording, so rewriting
 * a summary does not fail a test.
 */
test('a project with a summary is captioned by its first plain sentence', () => {
  const path = '/demo/ubik'
  assert.ok(SUMMARIES[path], 'the Ubik write-up should have a summary')
  assert.equal(captionFor(path, 'the card blurb'), SUMMARIES[path].what[0])
})

/*
 * Three of the top-level entries are not write-ups and have no summary. They
 * fall back to the one-line description the project already carries, which is
 * why the deck has no blank captions.
 */
test('a project with no summary falls back to the card description', () => {
  const path = '/demo/nothing-here'
  assert.equal(SUMMARIES[path], undefined)
  assert.equal(captionFor(path, 'the card blurb'), 'the card blurb')
})

/*
 * The caption is the first line, so an empty one is an empty caption on the
 * wall. Cheaper to assert here than to notice on the deck.
 */
test('every summary opens with a real sentence', () => {
  for (const [path, summary] of Object.entries(SUMMARIES)) {
    assert.ok(summary.what.length > 0, `${path} has no plain-terms lines`)
    assert.ok(summary.what[0].trim().length > 0, `${path} opens with an empty line`)
  }
})

/*
 * The house rule, checked where the copy lives rather than by eye: sentences
 * or colons, never a dash splice. The check script enforces this on the
 * components; this is the data file the components read.
 */
test('no summary uses an em dash', () => {
  for (const [path, summary] of Object.entries(SUMMARIES)) {
    for (const line of [...summary.what, summary.impact ?? '']) {
      assert.equal(line.includes('—'), false, `${path} has an em dash: ${line.slice(0, 60)}`)
    }
  }
})
