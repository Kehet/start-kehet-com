# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A personal browser new-tab/start page: a single static HTML document styled as a terminal
prompt, listing bookmark links grouped into columns. No framework, no backend — vanilla
HTML/CSS/JS built with Vite.

## Commands

```
npm install      # install deps (normalize.css, vite)
npm run dev       # vite dev server
npm run build     # production build to dist/
npm run preview   # preview the production build
```

There is no test suite and no lint script configured.

## Architecture

- `index.html` — the entire page content. The `.output` div holds several `<ul>` columns
  (currently `cloud`, `lab`, `local`, `external`), each a group of bookmark `<li><a>` links.
  Every link uses `rel="nofollow"`. **Links within each column are kept alphabetically
  sorted by display text**, with the colored group-label `<li>` first.
- `main.js` — single responsibility: renders and live-updates the `[HH:MM:SS]` clock shown
  in the fake shell prompts (`.time` elements), ticking every 250ms.
- `style.css` — Gruvbox-dark palette exposed as CSS custom properties (`--color0`..`--color15`)
  and reused as terminal-style utility classes (`.dark_red`, `.dark_green`, `.dark_blue`, etc.).
  Each link column's header `<li>` picks one of these classes; when adding a new column, pick
  an unused color class for its header rather than reusing one already in use.

## Deployment

- `Dockerfile` builds on `nginx-unprivileged`, copying `dist/` (the Vite build output) and
  `nginx.conf` (sets CSP/HSTS/security headers) into the image. It sits behind Traefik, which
  terminates TLS — see the user's `beer-infra` repo for the reverse-proxy config.
- `.github/workflows/build.yml` builds and deploys `dist/` to GitHub Pages, triggered on a
  published GitHub release (not on every push to master).
- Releases are cut by `release-please` (`.github/workflows/release-please.yml`,
  `release-please-config.json`, `.release-please-manifest.json`), which derives version bumps
  and `CHANGELOG.md` entries from Conventional Commits (`feat`, `fix`, `chore(deps)`, `perf`).
- `.github/workflows/pr-title-lint.yml` enforces that PR titles follow the Conventional
  Commits format — write commit subjects/PR titles as `type(scope): summary`.
