import { test } from 'node:test'
import assert from 'node:assert/strict'

import { isFullscreenDemo, hidesRail } from './fullscreen-demos.ts'

/**
 * Which routes the site chrome sits out of.
 *
 * The two lists are matched differently and that is the whole trap. A
 * full-screen demo matches by prefix, because the app routes have pages under
 * them and every one of them is still the app. The rail-less list matches
 * exactly, because it names one page rather than a tree. Swapping the two
 * comparisons type-checks, renders, and is invisible until a header lands on
 * top of a demo's own toolbar or a write-up loses its way home.
 */
test('a page under a full-screen demo is still the demo', () => {
  assert.equal(isFullscreenDemo('/demo/hitl-ai/sheet'), true)
})

/*
 * The pair that makes the prefix rule necessary and dangerous at once. The
 * write-up is an article and keeps the header; the prototype under it fills
 * the viewport and does not. A prefix that matched one character less would
 * take the header off the write-up too.
 */
test('a write-up is not full-screen, but the prototype under it is', () => {
  assert.equal(isFullscreenDemo('/demo/bodylog'), false)
  assert.equal(isFullscreenDemo('/demo/bodylog/v1'), true)
})

test('the music write-up keeps its header and only the running app loses it', () => {
  assert.equal(isFullscreenDemo('/demo/music-analysis-chat'), false)
  assert.equal(isFullscreenDemo('/demo/music-analysis-chat/app'), true)
})

/*
 * The portfolio is not a demo at all. It is on the list because a fixed header
 * would print on all sixteen sheets of the PDF.
 */
test('the portfolio counts as full-screen', () => {
  assert.equal(isFullscreenDemo('/portfolio'), true)
})

test('an ordinary write-up keeps the chrome', () => {
  assert.equal(isFullscreenDemo('/demo/ubik'), false)
  assert.equal(isFullscreenDemo('/'), false)
})

/*
 * The rail is a reading aid for an article, and the Ubik page stopped being
 * one. It is the only exact match on the site: the page itself drops the rail
 * and anything nested under it is a different page that keeps it.
 */
test('the rail-less list matches one page exactly, not a tree', () => {
  assert.equal(hidesRail('/demo/ubik'), true)
  assert.equal(hidesRail('/demo/ubik/anything'), false)
})

test('a route that merely starts the same way keeps its rail', () => {
  assert.equal(hidesRail('/demo/ubikx'), false)
})

/*
 * `usePathname` returns null before hydration on a statically rendered route,
 * and both callers pass it straight through. A throw here is a blank page.
 */
test('no pathname is not a match, and does not throw', () => {
  assert.equal(isFullscreenDemo(null), false)
  assert.equal(isFullscreenDemo(undefined), false)
  assert.equal(hidesRail(null), false)
  assert.equal(hidesRail(undefined), false)
})
