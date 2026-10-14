# First-Person eXeRtion (FPXR) · IEEE VR 2027

A complete static workshop website built with **Astro, TypeScript, and modern CSS**. Original SVG artwork and lightweight CSS animation connect XR, data, and physical movement. No backend, database, external API, analytics, or third-party font request is required.

## Run locally

Use **Node.js 24 LTS** (minimum 22.12) and pnpm 11.25.0.

```sh
npm install --global pnpm@11.25.0
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:4321`. Stop the server with Ctrl+C.

```sh
pnpm check       # Astro and TypeScript diagnostics
pnpm build       # Checks, then generates the deployable dist/ folder
pnpm preview     # Serves the production build locally
```

Dependencies are needed only when developing/building. Visitors receive static HTML, CSS, a local font, and a small JavaScript enhancement bundle. The content, links, and disclosure controls also work with JavaScript disabled.

## Edit content

All conference/event information lives in typed files under `src/data/`. Edit these and rebuild; no component edits are needed for routine updates.

| File | Contents |
| --- | --- |
| `workshop.ts` | Title, year, introductory copy, conference links, location, event slot, format, and contact |
| `topics.ts` | Three research themes, topic cards, and context tags |
| `submissions.ts` | Submission types, length, template, review policy, publication policy, and submission URL |
| `dates.ts` | Deadlines, display labels, ISO dates, and the 23:59 AoE timezone note |
| `papers.ts` | Accepted-paper entries and an unused, clearly marked sample entry |
| `program.ts` | Schedule, times, session descriptions, speakers, and tentative status |
| `organizers.ts` | Names, affiliations, email, optional personal websites, and optional portraits |
| `faq.ts` | Practical participation and accessibility information |

To activate submissions, set `submissions.url` to the real submission portal. The unavailable button automatically becomes a working “Submit your work” link. With `null`, visitors see an explicit coming-soon state; no fake submission form is provided.

### Add papers and images

Copy the sample in `src/data/papers.ts` into the exported `papers` array and replace every bracketed field. Only real accepted entries should go in that array.

```ts
{
  id: 'your-paper-id',
  title: 'Your accepted paper title',
  authors: ['Author One', 'Author Two'],
  type: 'Position paper',
  pdf: 'papers/your-paper.pdf',
  image: 'images/your-teaser.webp',
  imageAlt: 'A useful description of the research figure.',
  project: 'https://your-real-project-url.org',
}
```

Put PDFs in `public/papers/` and images in `public/images/`. Asset paths in data are relative to `public/` and are automatically prefixed for GitHub project Pages. External HTTPS URLs also work. Omit optional properties instead of inserting empty or placeholder URLs. Cards without images still have a complete layout.

Eight full-colour organizer photographs are included in `public/images/organizers/`. Five come from Google Scholar; Yi Li and Linjia He use verified academic profile images, and Charles Perin uses the photograph supplied by the organizer. See `docs/PORTRAIT-SOURCES.md` for source links. To replace a photograph, update its `portrait` path in `organizers.ts`; images are lazy-loaded and cropped with CSS. Without a portrait, a card shows initials. Yi Li and Linjia He have email links because their personal URLs were not supplied.

### Design and behavior

- Colors, spacing, typography, and breakpoints: `src/styles/global.css`.
- Original grid, runner, trails, and floating data panels: `src/components/HeroScene.astro`.
- Menu, active-section indication, motion toggle, and parallax: `src/scripts/site.ts`.
- SEO and social metadata: `src/layouts/Layout.astro`.
- Social preview artwork: `public/social-card.svg` and its rendered `social-card.png`.

The hero automatically reduces effects on mobile, pauses when off-screen or in a background tab, and respects `prefers-reduced-motion`. Users can also pause motion manually. Desktop-only pointer parallax is bounded and frame-scheduled. The mobile menu supports keyboard operation, Escape, outside-click dismissal, and focus handling; closed links are inert.

## Deploy to GitHub Pages

The included workflow builds the source and publishes `dist/`. It supports both **project repositories** (`username.github.io/repository/`) and **user/organization repositories** (`username.github.io`), without hardcoded repository names.

1. Put this project's files at your repository root, including **`.github/workflows/deploy.yml`**, `package.json`, and `pnpm-lock.yaml`. Do not upload `node_modules`, `tmp`, or test artifacts. If using a browser upload, verify that the hidden `.github` directory was included.
2. Use the `main` branch, or change the branch in the workflow.
3. In the repository, choose **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Push the source. The **Deploy workshop to GitHub Pages** workflow installs locked dependencies, checks/builds the site, and deploys it.
5. Open the URL shown by the workflow or the Pages settings.

GitHub's `configure-pages` step supplies the correct origin and repository path. Astro then prefixes its bundled assets, and `publicPath()` prefixes favicon, social-card, portrait, and paper URLs. Canonical metadata, `sitemap.xml`, and `robots.txt` are generated with the same deployment URL. Local builds omit fictional canonical URLs.

### Manual builds and custom domains

For a build outside GitHub Actions, set `SITE_URL` to the origin and `BASE_PATH` to the repository path. PowerShell example:

```powershell
$env:SITE_URL = 'https://YOUR-USERNAME.github.io'
$env:BASE_PATH = '/YOUR-REPOSITORY'
pnpm build
```

For a custom domain or a user/organization Pages repository, use `/` for `BASE_PATH`. Configure custom domains through GitHub Pages settings. A ready-to-upload static build is in `dist/`, but **uploading only source to branch-based Pages will not compile Astro**: use the provided Actions workflow or deploy the built output.

Do not open `dist/index.html` with a `file://` URL; serve it with `pnpm preview` or any static HTTP server. Root-relative asset paths depend on a web server.

## Verification

Browser tests exercise the requested widths: **320, 375, 390, 768, 1024, and 1440px**. They check overflow, missing resources, internal anchors, WCAG A/AA rules with axe, mobile keyboard navigation, reduced motion, disclosures, and operation without JavaScript.

Install the test browser once:

```sh
pnpm exec playwright install chromium
```

Keep a production preview running in one terminal, then run in another:

```sh
pnpm test:ui
pnpm audit:lighthouse
```

The Lighthouse reports are saved in `artifacts/`. For dependency vulnerability scanning, use `pnpm audit --audit-level high` separately.

Set `TEST_URL` to change the preview URL/port. Optionally set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to an existing Chrome or Edge executable. On restricted hosts, `ASTRO_TELEMETRY_DISABLED=1` prevents Astro from writing telemetry preferences outside the project.

Optional helpers:

```sh
node scripts/check-links.mjs  # Checks real external links; requires internet access
node scripts/capture.mjs      # Refreshes the social PNG and desktop/mobile screenshots
```

The social capture helper expects a root-path local preview. Browser automation uses an installed browser; no runtime browser dependency ships to visitors. Lighthouse scores are measurements of a local production preview, not a guarantee about a future hosting environment. See `docs/VERIFICATION.md` for the delivery results.

## Content provenance and details still to confirm

Content follows the FPXR proposal, including the updated copy available on 14 October 2026, and the organizer's annotations. Confirmed deadlines are **20 October 2026** (call), **20 December 2026** (submission), **3 January 2027** (internal reviews), **7 January 2027** (notification), and **12 January 2027** (camera-ready), all at **23:59 AoE**. Research theme titles use the proposal's wording. The reference website informed the section structure; predecessor links were removed as requested.

The exact workshop day/time, room, submission URL, and online joining instructions remain explicitly pending. The updated proposal states that accepted papers will be archived in the IEEE Digital Library. No accepted papers, speakers, or personal websites were invented. See `docs/CONTENT-NOTES.md` for source details and editorial decisions.

## Project structure

```text
.github/workflows/deploy.yml   GitHub Pages build and deployment
public/                       Static assets, icons, social artwork, future papers
src/components/               Reusable hero, navigation, cards, icons, headings
src/data/                     Editable, typed workshop content
src/layouts/                  HTML document and metadata
src/lib/                      Base-path-aware asset helper
src/pages/                    Static home page, sitemap, robots
src/scripts/                  Small progressive-enhancement script
src/styles/                   Responsive CSS and motion preferences
tests/                        Playwright and axe browser checks
scripts/                      Lighthouse, link checking, screenshot helpers
docs/                         Content decisions and verification results
```

The font is self-hosted Manrope, distributed under the SIL Open Font License (see `public/licenses/Manrope-OFL.txt`). The hero illustration and site components were created for FPXR. No IEEE logo is reproduced and no personal portraits are fabricated.
