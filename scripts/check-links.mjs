import { writeFile, mkdir } from 'node:fs/promises';
const base = process.env.TEST_URL || 'http://127.0.0.1:4321';
const html = await (await fetch(base)).text();
const urls = [...new Set([...html.matchAll(/href="(https?:[^\"]+)"/g)].map(match => match[1].replace(/&amp;/g, '&')))];
const results = await Promise.all(urls.map(async url => {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(20_000), redirect: 'follow' });
    await response.body?.cancel();
    return { url, status: response.status, finalUrl: response.url, ok: response.ok };
  } catch (error) { return { url, ok: false, error: String(error) }; }
}));
await mkdir('artifacts', { recursive: true });
await writeFile('artifacts/links.json', JSON.stringify(results, null, 2));
for (const result of results) console.log(JSON.stringify(result));
// Network failures and bot protection require manual review; never silently rewrite URLs.
if (results.some(result => !result.ok)) process.exitCode = 1;
