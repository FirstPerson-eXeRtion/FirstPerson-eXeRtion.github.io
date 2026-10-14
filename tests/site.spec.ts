import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const widths = [320, 375, 390, 768, 1024, 1440];
for (const width of widths) {
  test(`${width}px: layout, resources, anchors and accessibility`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('h1')).toContainText('First-Person');
    await expect(page.locator('.organizer-card')).toHaveCount(8);
    await expect(page.locator('.organizer-card img')).toHaveCount(8);
    await expect(page.locator('.agenda-item')).toHaveCount(8);
    const overflows = await page.evaluate(() => {
      const viewport = document.documentElement.clientWidth;
      return Array.from(document.querySelectorAll('main h1, main h2, main h3, main p, .button, .organizer-card, .agenda-item, footer, header')).filter(element => {
        const box = element.getBoundingClientRect();
        return box.left < -1 || box.right > viewport + 1;
      }).map(element => `${element.tagName}.${element.className}`);
    });
    expect(overflows).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const brokenAnchors = await page.locator('a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute('href')!).filter(href => !document.getElementById(href.slice(1))));
    expect(brokenAnchors).toEqual([]);
    expect(errors).toEqual([]);
    const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(accessibility.violations.map(item => ({ id: item.id, nodes: item.nodes.map(node => node.target) }))).toEqual([]);
    await page.screenshot({ path: `artifacts/screenshots/home-${width}.png`, fullPage: true, animations: 'disabled' });
    for (const portrait of await page.locator('.organizer-card img').all()) {
      await portrait.scrollIntoViewIfNeeded();
      await portrait.evaluate((image: HTMLImageElement) => image.decode());
      expect(await portrait.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
    }
    expect(errors).toEqual([]);
  });
}

test('mobile menu: keyboard, escape, navigation and viewport changes', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menu = page.locator('.menu-toggle');
  await menu.focus();
  await page.keyboard.press('Enter');
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'About', exact: true })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await menu.click();
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Program', exact: true }).click();
  await expect(page).toHaveURL(/#program$/);
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('a[data-nav-link][href="#program"]')).toHaveAttribute('aria-current', 'location');
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.locator('#primary-navigation')).not.toHaveAttribute('inert', '');
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
});

test('motion controls and reduced motion preference', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Pause motion' }).click();
  await expect(page.getByRole('button', { name: 'Resume motion' })).toHaveAttribute('aria-pressed', 'true');
  expect(await page.locator('.moving-trail').evaluate(el => getComputedStyle(el).animationPlayState)).toBe('paused');
  await page.getByRole('button', { name: 'Resume motion' }).click();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.motion-toggle')).toBeHidden();
  expect(await page.locator('.moving-trail').evaluate(el => getComputedStyle(el).animationName)).toBe('none');
  expect(await page.locator('html').evaluate(el => getComputedStyle(el).scrollBehavior)).toBe('auto');
});

test('FAQ, review disclosure, unavailable submissions and skip link', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  await page.getByText('How submissions are reviewed', { exact: true }).click();
  await expect(page.getByText(/Non-conflicted organizers will assess/)).toBeVisible();
  await page.getByText('Do I need a headset or need to exercise?', { exact: true }).click();
  await expect(page.getByText(/No. Wearing a headset/)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Submission portal coming soon' })).toBeDisabled();
});

test('content and mobile navigation remain usable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
  const page = await context.newPage();
  await page.goto(process.env.TEST_URL || 'http://127.0.0.1:4321');
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Organizers' })).toBeVisible();
  await expect(page.locator('#participate')).toBeVisible();
  await context.close();
});
