import { test } from 'node:test'
import assert from 'node:assert/strict'

import { SITE_URL, abs } from './site.ts'

/**
 * The absolute URLs a crawler is handed.
 *
 * Every canonical, share image and JSON-LD id on the site is built here. The
 * failure mode is not a crash: a doubled slash or a missing one still renders,
 * still deploys, and quietly tells a crawler that two URLs are two pages. So
 * these assert the shape of the join rather than any one address, and stay
 * true on a preview deployment, where the origin is whatever Vercel named it.
 */
test('the origin never ends in a slash, so the join cannot double one', () => {
  assert.equal(SITE_URL.endsWith('/'), false)
})

test('a rooted path is appended as it is', () => {
  assert.equal(abs('/demo/ubik'), `${SITE_URL}/demo/ubik`)
})

/*
 * Not every caller passes the leading slash, and the ones that forget are the
 * reason this normalises rather than concatenates.
 */
test('a bare path gets the slash it is missing', () => {
  assert.equal(abs('demo/ubik'), `${SITE_URL}/demo/ubik`)
})

test('the site root is the origin plus one slash', () => {
  assert.equal(abs('/'), `${SITE_URL}/`)
})

test('no absolute URL ever carries a doubled slash after the origin', () => {
  for (const path of ['/', '/demo', 'demo', '/demo/ubik', 'icon.png', '/icon.png']) {
    const url = abs(path)
    assert.equal(url.startsWith(SITE_URL), true, `${url} left the origin`)
    assert.equal(url.slice(SITE_URL.length).startsWith('//'), false, `${url} doubled the slash`)
  }
})
