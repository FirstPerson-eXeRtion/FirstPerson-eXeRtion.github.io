import { defineConfig } from 'astro/config';

// The workflow supplies these for both user/organization and project Pages sites.
// Leave SITE_URL unset locally; no fictional canonical URL will be emitted.
const site = process.env.SITE_URL;
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  ...(site ? { site } : {}),
  base,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  server: { port: 4321 },
  devToolbar: { enabled: false },
});
