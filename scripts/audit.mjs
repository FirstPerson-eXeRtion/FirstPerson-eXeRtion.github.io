import lighthouse from 'lighthouse';
import { chromium } from '@playwright/test';
import { createServer } from 'node:net';
import { mkdir, writeFile } from 'node:fs/promises';

const portProbe = createServer();
await new Promise(resolve => portProbe.listen(0, '127.0.0.1', resolve));
const address = portProbe.address();
const port = typeof address === 'object' && address ? address.port : 9222;
await new Promise(resolve => portProbe.close(resolve));
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
  args: [`--remote-debugging-port=${port}`],
});
try {
  await mkdir('artifacts', { recursive: true });
  for (const mode of ['mobile', 'desktop']) {
    const result = await lighthouse(process.env.TEST_URL || 'http://127.0.0.1:4321', {
      port,
      output: 'html',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      ...(mode === 'desktop' ? { preset: 'desktop' } : {}),
    });
    await writeFile(`artifacts/lighthouse-${mode}.html`, result.report);
    const scores = Object.fromEntries(Object.entries(result.lhr.categories).map(([key, value]) => [key, Math.round(value.score * 100)]));
    console.log(mode, JSON.stringify(scores));
    await writeFile(`artifacts/lighthouse-${mode}.json`, JSON.stringify({ scores, audits: result.lhr.audits }, null, 2));
  }
} finally { await browser.close(); }
