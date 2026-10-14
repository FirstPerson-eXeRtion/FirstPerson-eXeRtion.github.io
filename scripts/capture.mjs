import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH });
try {
  await mkdir('artifacts/screenshots', { recursive: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const base = process.env.TEST_URL || 'http://127.0.0.1:4321';
  await page.goto(`${base.replace(/\/$/, '')}/social-card.svg`);
  await page.screenshot({ path: 'public/social-card.png' });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(base);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `artifacts/screenshots/hero-${width}.png`, animations: 'disabled' });
    for (const section of ['topics', 'dates', 'program', 'organizers']) {
      await page.locator(`#${section}`).screenshot({ path: `artifacts/screenshots/${section}-${width}.png`, animations: 'disabled', style: '.site-header, .skip-link { visibility: hidden !important; }' });
    }
  }
} finally { await browser.close(); }
