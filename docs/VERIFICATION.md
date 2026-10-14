# Delivery verification

Verified on **14 October 2026** against the production build, using Node 24.19.0, Astro 7.3.8, Playwright, and the installed Chromium-based Microsoft Edge browser.

## Results

| Check | Result |
| --- | --- |
| `pnpm build` | Passed; 0 errors, 0 warnings, 0 hints |
| Browser suite | 10 tests passed |
| Viewports | 320, 375, 390, 768, 1024, 1440px |
| Horizontal overflow | None at the six requested widths |
| axe accessibility checks | No violations against the tested WCAG A/AA rules at all six widths |
| Navigation | Internal anchors, active-section indication, mobile keyboard operation, Escape dismissal, and desktop resize passed |
| Motion | Pause/resume and `prefers-reduced-motion` passed |
| Progressive enhancement | Mobile navigation and content usable with JavaScript disabled |
| Disclosures | FAQ and reviewing sections open and expose content correctly |
| External URLs | All 8 remaining configured web links returned HTTP 200, including redirects |
| Organizer photos | All 8 colour images load successfully at all six viewport widths; specialty fields removed |
| Root deployment | HTML, styles, font, icon, social image, robots, sitemap, and anchors verified |
| Repository subpath | Same checks passed under `/fpxr-workshop/`, with correctly prefixed canonical, social-image, favicon, and asset URLs |
| Placeholder leak | No verification domain or repository name in the final root build |

The subpath used a disposable verification origin for metadata checks; it is not a deployment and was removed by rebuilding the final output without environment overrides. GitHub Actions fills in the real origin and repository path.

## Lighthouse

Measured on the production preview before the final 11 copy annotations and the user-supplied Charles Perin photo replacement. Lighthouse was not rerun for those minor changes; the production build and browser suite were rerun. The mobile run uses Lighthouse's simulated mobile settings; the desktop run uses its desktop preset.

| Category | Mobile | Desktop |
| --- | ---: | ---: |
| Performance | 100 | 100 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |

Reports are available locally in `artifacts/lighthouse-mobile.html` and `artifacts/lighthouse-desktop.html`. Scores are not a guarantee about the eventual public host, network, or future content. Automated accessibility testing does not prove full conformance; keyboard and visual checks were also performed. Safari, Firefox, screen-reader software, and physical devices were not separately tested in this environment.

## Performance characteristics

- About 40 KB HTML (including the inline enhancement script and SVG hero), 31 KB CSS, and a single 25 KB WOFF2 font, before compression.
- No client framework, WebGL engine, animation library, image API, external font request, or tracker.
- Hero animations stop off-screen and in background tabs, simplify on mobile, and honor reduced motion.
- The public page does not download the social-preview PNG or the internal workshop proposal as a display asset.
- Eight local organizer photographs (about 126 KB total) use explicit dimensions, responsive sizing, and lazy loading. Future paper images also use dimensions and lazy loading.

## Visual review

Desktop and mobile hero, proposal-based research topics, updated six-entry timeline, program, colour organizer cards, and full-page screenshots were reviewed. Screenshots at all six requested widths are in `artifacts/screenshots/`. Both rounds of browser annotations (13 and 11) were applied, alongside the confirmed deadlines, preferred name, and replacement portrait. The latest browser suite passes at all six widths against the live local preview. A menu visibility-transition issue found by the keyboard test was fixed before the final passing run.

## Publishing status

The source and static build are ready for GitHub Pages. Nothing was pushed to a repository or publicly deployed: the requested delivery is an uploadable project, and no destination repository was supplied. The included workflow handles build and deployment after upload and enabling Pages with GitHub Actions.
