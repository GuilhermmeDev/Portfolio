# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A single-file static portfolio website (`index.html`) for Guilherme Morais, a backend software developer. No build tools, no package manager, no framework — everything is in one file.

## Running Locally

Open `index.html` directly in a browser. There is no build step, dev server, or dependency installation.

```bash
xdg-open index.html   # Linux
```

## Architecture

Everything lives in `index.html` in three inline blocks:

- **`<style>`** — all CSS using custom properties for theming
- **`<body>`** — six sections: `#inicio` (hero), `#manifesto`, `#sobre`, `#projetos`, `#stack`, `#contato`, plus `<nav>` and `<footer>`
- **`<script>`** — all JS at the bottom of `<body>`

### Theming

Dark/light mode is controlled by `data-theme` attribute on `<html>`. CSS vars are defined in `:root` (dark, default) and overridden in `[data-theme="light"]`. The toggle persists to `localStorage` via `toggleTheme()`.

### Scroll Animations

`IntersectionObserver` watches `.tl-item`, `.tech-item`, and `.fade-up` elements. When they enter the viewport, the class `.visible` is added, which transitions them from `opacity: 0 / translateY` to their final state.

### Collapsible Tech Stack

Items with class `.tech-extra` are hidden by default (`display: none`). `toggleExpand()` adds `.expanded` (sets `display: flex`) and `.visible` to animate them in.

### Card Mouse Effect

Project cards use `onmousemove="tMouse(event, this)"` to track cursor position and set `--x`/`--y` CSS vars, which drive a radial gradient overlay via `::before`.

## External Dependencies (CDN only)

- **Fonts**: Google Fonts — `Syne` (display) and `DM Mono` (monospace)
- **Icons**: devicon `v2.16.0` for tech stack icons (`<i class="devicon-*">`)
- **Profile photo**: hosted on postimg.cc

## Key Details

- Language: Portuguese (pt-BR) — keep all user-facing text in pt-BR
- Email hardcoded in `copyEmail()`: `guilherme.dev.morais@gmail.com`
- Years of experience computed dynamically: `new Date().getFullYear() - 2022`
- Mobile nav breakpoint: `900px` (hamburger replaces nav links); stats grid collapses at `600px`
