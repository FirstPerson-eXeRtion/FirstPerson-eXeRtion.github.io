import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const base = process.env.TEST_URL || 'http://127.0.0.1:4321';
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH });
try {
  const page = await browser.newPage();
  const failed = [];
  page.on('response', r => { if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`); });
  page.on('pageerror', e => failed.push(e.message));
  await page.goto(base);
  await page.evaluate(() => document.fonts.ready);
  const metadata = await page.evaluate(() => ({
    title: document.title,
    canonical: document.querySelector('link[rel=canonical]')?.getAttribute('href'),
    image: document.querySelector('meta[property="og:image"]')?.getAttribute('content'),
    icon: document.querySelector('link[rel=icon]')?.getAttribute('href'),
    font: getComputedStyle(document.body).fontFamily,
    links: Array.from(document.querySelectorAll('a[href^="#"]')).every(a => document.getElementById(a.getAttribute('href').slice(1))),
  }));
  assert(metadata.links, 'All internal anchors resolve');
  assert.equal(failed.length, 0, failed.join('\n'));
  if (process.env.EXPECTED_CANONICAL) {
    assert.equal(metadata.canonical, process.env.EXPECTED_CANONICAL);
    assert.equal(metadata.image, new URL('social-card.png', metadata.canonical).href);
  }
  for (const path of ['favicon.svg', 'social-card.png', 'robots.txt', 'sitemap.xml']) {
    const url = new URL(path, `${base.replace(/\/$/, '')}/`);
    const response = await fetch(url);
    assert(response.ok, `${path} returns ${response.status}`);
    if (path === 'sitemap.xml' && metadata.canonical) assert((await response.text()).includes(metadata.canonical));
  }
  for (const source of await page.locator('.organizer-card img').evaluateAll(images => images.map(image => image.src))) {
    const response = await fetch(source);
    assert(response.ok, `Organizer photo returns ${response.status}: ${source}`);
    assert(response.headers.get('content-type')?.startsWith('image/'), `Photo has an image content type: ${source}`);
  }
  console.log(JSON.stringify({ success: true, base, ...metadata }));
} finally { await browser.close(); }
