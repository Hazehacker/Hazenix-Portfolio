# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the existing Hazenix portfolio site to the white + sky-blue + atmospheric direction specified in `2026-05-29-portfolio-redesign-design.md` — replace fonts, colors, typography scale, add floating orb animations, and rewrite every component while preserving structure and content collections.

**Architecture:** Astro 6 static site with Tailwind 4 (using `@theme` CSS directive for design tokens). All design tokens, fonts, orbs animation, and shared utility classes (`.eyebrow`, `.section-title`, `.btn-primary`, `.pill`, etc.) live in `src/styles/global.css`. Each component (`Nav`, `Hero`, `Skills`, `ProjectList`, `Timeline`, `About`, `ContactCard` [new], `Footer`, `RevealOnScroll` [new]) is rewritten in place. Project ordering changes via `weight` frontmatter on existing `.md` files. Verification is build-success + visual screenshots via CDP (no unit tests — this is pure UI/CSS work).

**Tech Stack:** Astro 6.4, Tailwind 4.3, Astro Content Collections, `@fontsource/playfair-display` + `@fontsource/geist` (Web fonts via npm), vanilla JS for IntersectionObserver scroll reveal, no JS framework.

**Reference spec:** `docs/superpowers/specs/2026-05-29-portfolio-redesign-design.md` — read it first.

---

## Phase 0: Reference

Before starting, read these in full:

- `docs/superpowers/specs/2026-05-29-portfolio-redesign-design.md` — the design spec; every visual decision is in here
- `package.json` — confirm Astro 6.4 + Tailwind 4.3
- `src/styles/global.css` — current design tokens to be replaced

Verify dev server works before touching anything:

```bash
npm install
npm run dev
# Open http://localhost:4321 — should serve current site
# Stop with Ctrl+C
```

If `npm install` is missing or dev server errors, stop and fix before starting any task.

---

## Task 1: Swap font dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Remove old font, install new fonts**

Run:
```bash
npm uninstall @fontsource/inter
npm install @fontsource/playfair-display @fontsource/geist
```

- [ ] **Step 2: Verify package.json**

After install, `package.json` `dependencies` should contain:
- `@fontsource/playfair-display` (any version 5.x)
- `@fontsource/geist` (any version)
- no `@fontsource/inter`

Read `package.json` and confirm.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: swap @fontsource/inter for playfair-display + geist"
```

---

## Task 2: Rewrite global.css — design tokens & base

**Files:**
- Modify: `src/styles/global.css` (complete rewrite)

- [ ] **Step 1: Replace global.css with new tokens and base layer**

Write the following exact content to `src/styles/global.css`:

```css
/* src/styles/global.css */
@import "tailwindcss";

/* Playfair Display — for serif headlines (Hero, section titles, project titles, etc.) */
@import "@fontsource/playfair-display/400.css";
@import "@fontsource/playfair-display/500.css";
@import "@fontsource/playfair-display/600.css";
@import "@fontsource/playfair-display/700.css";
@import "@fontsource/playfair-display/400-italic.css";
@import "@fontsource/playfair-display/500-italic.css";
@import "@fontsource/playfair-display/600-italic.css";

/* Geist — for sans-serif body / UI / numbers */
@import "@fontsource/geist/400.css";
@import "@fontsource/geist/500.css";
@import "@fontsource/geist/600.css";
@import "@fontsource/geist/700.css";

@theme {
  --font-serif: 'Playfair Display', 'PingFang SC', 'Microsoft YaHei', serif;
  --font-sans:  'Geist', 'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif;

  --color-bg:        #FAFAFA;
  --color-text:      #0A0A0A;
  --color-text-2:    #2A2A2A;
  --color-text-3:    #4B5563;
  --color-blue:      #3B82F6;
  --color-violet:    #8B5CF6;
  --color-border:    #E5E7EB;
  --color-success:   #10B981;
}

/* Base resets */
body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  position: relative;
}

/* Page content wrapper — stacks above orbs */
.page {
  position: relative;
  z-index: 2;
}

/* === Utility classes === */

/* Eyebrow: 14px uppercase blue label with leading bar */
.eyebrow {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--color-blue);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 14px;
}
.eyebrow::before {
  content: '';
  display: inline-block;
  width: 34px;
  height: 1.5px;
  background: var(--color-blue);
}

/* Section title — large serif heading. Use .compact for smaller (Projects/Timeline). */
.section-title {
  font-family: var(--font-serif);
  font-size: 72px;
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -1.8px;
  color: var(--color-text);
  margin-bottom: 80px;
  max-width: 980px;
}
.section-title em {
  font-style: italic;
  color: var(--color-blue);
  font-weight: 500;
}
.section-title.compact {
  font-size: 60px;
  letter-spacing: -1.4px;
  margin-bottom: 72px;
  max-width: 880px;
}

/* Buttons */
.btn-primary {
  background: linear-gradient(135deg, var(--color-blue), #6366F1);
  color: #fff;
  padding: 16px 32px;
  border-radius: 9px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.28);
  transition: transform 0.25s cubic-bezier(.4, 0, .2, 1),
              box-shadow 0.25s cubic-bezier(.4, 0, .2, 1);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(59, 130, 246, 0.38);
}

.btn-ghost {
  color: var(--color-text);
  padding: 16px 0;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  border-bottom: 1.5px solid var(--color-text);
  transition: color 0.2s, border-color 0.2s;
}
.btn-ghost:hover {
  color: var(--color-blue);
  border-color: var(--color-blue);
}

/* Pill — for Skills tags */
.pill {
  background: #fff;
  border: 1px solid var(--color-border);
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text);
  font-family: var(--font-sans);
  transition: all 0.2s cubic-bezier(.4, 0, .2, 1);
  display: inline-block;
}
.pill:hover {
  border-color: var(--color-blue);
  color: var(--color-blue);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.12);
}

/* Tech tag — smaller, for project rows */
.tech-tag {
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-3);
  background: rgba(59, 130, 246, 0.06);
  border: 1px solid rgba(59, 130, 246, 0.15);
  padding: 5px 11px;
  border-radius: 5px;
  display: inline-block;
}

/* Status pill — for "Available for hire" */
.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-2);
  background: #fff;
  border: 1px solid var(--color-border);
  padding: 8px 16px;
  border-radius: 999px;
  font-family: var(--font-sans);
}
.status-pill .dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--color-success);
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.2);
}

/* Gradient text — for emphasis words in headlines */
.grad {
  background: linear-gradient(120deg, var(--color-blue) 0%, var(--color-violet) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-style: italic;
  font-weight: 600;
}
```

- [ ] **Step 2: Verify build succeeds**

Run: `npm run build`

Expected: Build completes without errors. (Pages will look broken since old classes like `text-text` and `border-border-light` no longer exist — that's expected; we'll fix in later tasks.)

If the build fails on CSS errors (not on missing utility classes in components), fix the CSS before committing.

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat(styles): replace design tokens — blue/violet/Playfair/Geist"
```

---

## Task 3: Add orb keyframes & reveal animation to global.css

**Files:**
- Modify: `src/styles/global.css` (append)

- [ ] **Step 1: Append orb styles and reveal styles**

Append the following to the end of `src/styles/global.css`:

```css
/* === Floating orbs (global atmospheric background) === */
.orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(60px);
  pointer-events: none;
  z-index: 0;
  will-change: transform;
}
.orb-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(77, 163, 255, 0.42) 0%, transparent 70%);
  top: -150px;
  right: -120px;
  animation: orb-float-1 14s ease-in-out infinite;
}
.orb-2 {
  width: 520px;
  height: 520px;
  background: radial-gradient(circle, rgba(120, 90, 255, 0.32) 0%, transparent 70%);
  top: 35%;
  left: -180px;
  animation: orb-float-2 16s ease-in-out infinite;
}
.orb-3 {
  width: 440px;
  height: 440px;
  background: radial-gradient(circle, rgba(77, 163, 255, 0.28) 0%, transparent 70%);
  bottom: -120px;
  right: 8%;
  animation: orb-float-3 18s ease-in-out infinite;
}
@keyframes orb-float-1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%      { transform: translate(-200px, 140px) scale(1.15); }
  66%      { transform: translate(80px, 260px) scale(0.95); }
}
@keyframes orb-float-2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%      { transform: translate(220px, -120px) scale(1.1); }
  66%      { transform: translate(-60px, 180px) scale(0.9); }
}
@keyframes orb-float-3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%      { transform: translate(-180px, -100px) scale(1.2); }
  66%      { transform: translate(100px, -220px) scale(0.95); }
}

/* === Scroll reveal === */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s cubic-bezier(.4, 0, .2, 1),
              transform 0.7s cubic-bezier(.4, 0, .2, 1);
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* === Reduced motion === */
@media (prefers-reduced-motion: reduce) {
  .orb-1, .orb-2, .orb-3 { animation: none; }
  .reveal { opacity: 1; transform: none; transition: none; }
  .btn-primary:hover,
  .pill:hover {
    transform: none;
  }
}

/* === Responsive scaling for large headlines === */
@media (max-width: 1023px) {
  .section-title { font-size: clamp(40px, 6.5vw, 72px); margin-bottom: 64px; }
  .section-title.compact { font-size: clamp(36px, 5.5vw, 60px); margin-bottom: 56px; }
}
@media (max-width: 767px) {
  .eyebrow { font-size: 12px; letter-spacing: 2.5px; gap: 10px; }
  .eyebrow::before { width: 24px; }
  .section-title { font-size: clamp(32px, 8vw, 48px); margin-bottom: 48px; }
  .section-title.compact { font-size: clamp(30px, 7.5vw, 44px); margin-bottom: 40px; }
  .btn-primary { padding: 13px 24px; font-size: 15px; }
  .btn-ghost { padding: 13px 0; font-size: 15px; }
  /* Make orbs smaller on mobile to avoid overflow */
  .orb-1 { width: 360px; height: 360px; }
  .orb-2 { width: 320px; height: 320px; }
  .orb-3 { width: 280px; height: 280px; }
}
```

- [ ] **Step 2: Verify build still succeeds**

Run: `npm run build`

Expected: Builds OK. CSS file is larger.

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat(styles): add floating orbs, scroll reveal, reduced motion, responsive"
```

---

## Task 4: Reorder project weights in content collection

**Files:**
- Modify: `src/content/projects/hazenix-blog.md` (weight)
- Modify: `src/content/projects/interview-simulators.md` (weight)
- Modify: `src/content/projects/haze-ai-hub.md` (weight)
- Modify: `src/content/projects/gapasea-marketing.md` (weight)

Target order (ascending weight): Blog (1) → Interview Sim (2) → AI Hub (3) → GapaSea (4).

- [ ] **Step 1: Update `hazenix-blog.md` weight from 3 to 1**

Open `src/content/projects/hazenix-blog.md` and change:
```
weight: 3
```
to:
```
weight: 1
```

- [ ] **Step 2: Leave `interview-simulators.md` weight at 2 (already correct)**

Confirm `src/content/projects/interview-simulators.md` has `weight: 2`. If yes, skip.

- [ ] **Step 3: Update `haze-ai-hub.md` weight from 1 to 3**

Open `src/content/projects/haze-ai-hub.md` and change:
```
weight: 1
```
to:
```
weight: 3
```

- [ ] **Step 4: Update `gapasea-marketing.md` weight from 0 to 4**

Open `src/content/projects/gapasea-marketing.md` and change:
```
weight: 0
```
to:
```
weight: 4
```

- [ ] **Step 5: Verify build succeeds**

Run: `npm run build`

Expected: Build passes. (Visual ordering will only be visible once components are rewritten.)

- [ ] **Step 6: Commit**

```bash
git add src/content/projects/
git commit -m "content: reorder projects — Blog → InterviewSim → AIHub → GapaSea"
```

---

## Task 5: Update Base.astro — add orbs and page wrapper

**Files:**
- Modify: `src/layouts/Base.astro`

- [ ] **Step 1: Rewrite Base.astro**

Replace the entire contents of `src/layouts/Base.astro` with:

```astro
---
// src/layouts/Base.astro
import "../styles/global.css";

export interface Props {
  title: string;
  description?: string;
  ogImage?: string;
}

const { title, description = "Hazenix — Backend Developer & Builder", ogImage = "/favicon.svg" } = Astro.props;
const siteUrl = "https://hazenix.top";
---

<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />

    <!-- Open Graph -->
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={siteUrl} />
    <meta property="og:image" content={new URL(ogImage, siteUrl).href} />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={new URL(ogImage, siteUrl).href} />

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="alternate icon" type="image/x-icon" href="/favicon.ico" />

    <title>{title}</title>
  </head>
  <body>
    <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded focus:bg-text focus:px-4 focus:py-2 focus:text-sm focus:text-bg">
      Skip to content
    </a>

    <!-- Global floating orbs (atmospheric background) -->
    <div class="orb orb-1" aria-hidden="true"></div>
    <div class="orb orb-2" aria-hidden="true"></div>
    <div class="orb orb-3" aria-hidden="true"></div>

    <div class="page">
      <slot />
    </div>
  </body>
</html>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`

Expected: Build OK.

- [ ] **Step 3: Start dev server, visually verify orbs appear**

Run: `npm run dev` (in another terminal, or with `&` / start-as-background).

Open `http://localhost:4321` in browser. Expected:
- White background with 3 subtle blue/violet blurred orbs visible
- Orbs slowly drift over ~15 seconds
- Page content (current site) is still there, just stacked above orbs

If orbs invisible: check `.page { z-index: 2 }` and `.orb { z-index: 0 }` are correctly applied (inspect element).

Stop dev server with Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/Base.astro
git commit -m "feat(layout): add floating orbs and z-index page wrapper"
```

---

## Task 6: Create RevealOnScroll component

**Files:**
- Create: `src/components/RevealOnScroll.astro`

- [ ] **Step 1: Create the component**

Write the following to `src/components/RevealOnScroll.astro`:

```astro
---
// src/components/RevealOnScroll.astro
// Wraps slot content with a `.reveal` div. JS adds `.is-visible` when scrolled into view.
// Usage: <RevealOnScroll><MyComponent /></RevealOnScroll>
---

<div class="reveal">
  <slot />
</div>

<script>
  // IntersectionObserver — adds .is-visible once when each .reveal enters the viewport.
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -80px 0px", threshold: 0.05 },
  );

  for (const el of document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)")) {
    observer.observe(el);
  }
</script>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`

Expected: Build OK. (Component is unused so far.)

- [ ] **Step 3: Commit**

```bash
git add src/components/RevealOnScroll.astro
git commit -m "feat(components): add RevealOnScroll wrapper (IntersectionObserver)"
```

---

## Task 7: Rewrite Nav component

**Files:**
- Modify: `src/components/Nav.astro`

- [ ] **Step 1: Rewrite Nav.astro**

Replace the entire contents of `src/components/Nav.astro` with:

```astro
---
// src/components/Nav.astro
const currentPath = Astro.url?.pathname || "/";
const isHome = currentPath === "/";

const navLinks = [
  { href: isHome ? "#work" : "/#work", label: "Work", external: false },
  { href: isHome ? "#about" : "/#about", label: "About", external: false },
  { href: isHome ? "#contact" : "/#contact", label: "Contact", external: false },
  { href: "https://blog.hazenix.top", label: "Blog ↗", external: true },
];
---

<nav class="sticky top-0 z-50 border-b border-black/[0.04] backdrop-blur-[14px]" style="background:rgba(250,250,250,0.78)">
  <div class="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-5 lg:px-11">
    <a href="/" class="font-serif text-[22px] font-bold tracking-[-0.5px] text-text no-underline lg:text-[28px]">
      Hazenix<em class="italic text-blue not-italic" style="font-style:italic;color:#3B82F6">.</em>
    </a>

    <!-- Desktop links -->
    <div class="hidden gap-7 sm:flex lg:gap-10">
      {navLinks.map((link) => (
        <a
          href={link.href}
          target={link.external ? "_blank" : undefined}
          rel={link.external ? "noopener noreferrer" : undefined}
          class="font-sans text-[15px] font-medium text-text no-underline transition-colors hover:text-blue lg:text-[16px]"
        >
          {link.label}
        </a>
      ))}
    </div>

    <!-- Mobile hamburger -->
    <button
      type="button"
      id="mobile-menu-btn"
      class="flex flex-col gap-1 sm:hidden"
      aria-label="Toggle menu"
    >
      <span class="block h-[1.5px] w-5 bg-text"></span>
      <span class="block h-[1.5px] w-5 bg-text"></span>
      <span class="block h-[1.5px] w-5 bg-text"></span>
    </button>
  </div>

  <!-- Mobile menu -->
  <div id="mobile-menu" class="hidden flex-col gap-4 px-6 pb-5 sm:hidden">
    {navLinks.map((link) => (
      <a
        href={link.href}
        target={link.external ? "_blank" : undefined}
        rel={link.external ? "noopener noreferrer" : undefined}
        class="font-sans text-[15px] font-medium text-text no-underline transition-colors hover:text-blue"
      >
        {link.label}
      </a>
    ))}
  </div>
</nav>

<script>
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (btn && menu) {
    btn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });
  }
</script>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`

Expected: Build OK.

- [ ] **Step 3: Dev server visual check**

Run: `npm run dev`. Open `http://localhost:4321`. Expected:
- Sticky transparent nav at top with blur
- Logo "Hazenix." in serif, period is blue italic
- 4 links: Work / About / Contact / Blog ↗
- Hover over each → color changes to blue

Stop server.

- [ ] **Step 4: Commit**

```bash
git add src/components/Nav.astro
git commit -m "feat(nav): rewrite — Playfair logo, Blog link, blue hover"
```

---

## Task 8: Rewrite Hero component

**Files:**
- Modify: `src/components/Hero.astro`

- [ ] **Step 1: Rewrite Hero.astro**

Replace the entire contents of `src/components/Hero.astro` with:

```astro
---
// src/components/Hero.astro
import aboutData from "../data/about.json";
---

<section class="px-6 pb-[120px] pt-[140px] lg:px-11 lg:pb-[150px] lg:pt-[180px]">
  <div class="mx-auto max-w-[1280px]">
    <!-- Status pill -->
    <div class="status-pill mb-7 lg:mb-8">
      <span class="dot"></span>
      <span>Available for new opportunities · 2026</span>
    </div>

    <!-- Eyebrow -->
    <p class="eyebrow !mb-7 lg:!mb-8" style="font-size:15px;letter-spacing:3.2px">
      {aboutData.name} · {aboutData.title}
    </p>

    <!-- Hero h1 -->
    <h1
      class="font-serif font-bold text-text"
      style="font-size:clamp(44px, 9vw, 104px); line-height:1.02; letter-spacing:-3.5px; max-width:1180px; margin-bottom:36px;"
    >
      I build systems that are <span class="grad">reliable, scalable</span>, and beautifully simple.
    </h1>

    <!-- Lead -->
    <p
      class="font-sans text-text-2"
      style="font-size:clamp(16px, 1.5vw, 21px); line-height:1.65; max-width:680px; margin-bottom:44px; font-weight:450;"
    >
      {aboutData.description}
    </p>

    <!-- CTA row -->
    <div class="flex flex-wrap items-center gap-4">
      <a class="btn-primary" href="#work">查看作品 →</a>
      <a class="btn-ghost" href="#contact">联系我</a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`

Expected: Build OK.

- [ ] **Step 3: Dev visual check**

Run: `npm run dev`. Open `http://localhost:4321`. Verify:
- Green-dot status pill at top
- Blue eyebrow with leading bar "HAZENIX · ..."
- Massive Playfair serif headline ~104px on desktop
- "reliable, scalable" is italic with blue-violet gradient
- Lead text in Geist 21px, dark gray (#2A2A2A)
- Primary button has blue-violet gradient + shadow; ghost button has underline
- Hover button: it lifts 2px, shadow deepens

Stop server.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat(hero): rewrite — 104px Playfair, gradient emphasis, status pill"
```

---

## Task 9: Rewrite Skills component

**Files:**
- Modify: `src/components/Skills.astro`

- [ ] **Step 1: Rewrite Skills.astro**

Replace the entire contents of `src/components/Skills.astro` with:

```astro
---
// src/components/Skills.astro
import skillsData from "../data/skills.json";

// Render "AI & Data" with italic blue "AI"
function renderTitle(category: string) {
  if (category === "AI & Data") {
    return { prefix: "", emphasis: "AI", suffix: " & Data" };
  }
  return { prefix: category, emphasis: "", suffix: "" };
}
---

<section class="px-6 py-[110px] lg:px-11 lg:py-[140px]">
  <div class="mx-auto max-w-[1280px]">
    <p class="eyebrow">What I work with</p>
    <h2 class="section-title">Tools of the <em>craft</em>.</h2>

    <div class="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-[72px]">
      {Object.entries(skillsData).map(([category, items]) => {
        const t = renderTitle(category);
        return (
          <div>
            <h3
              class="font-serif font-semibold text-text"
              style="font-size:clamp(32px, 4vw, 48px); line-height:1.1; letter-spacing:-0.8px; margin-bottom:32px;"
            >
              {t.prefix}
              {t.emphasis && <em style="font-style:italic;color:#3B82F6;font-weight:500;">{t.emphasis}</em>}
              {t.suffix}
            </h3>
            <div class="flex flex-wrap gap-2.5">
              {(items as string[]).map((skill: string) => (
                <span class="pill">{skill}</span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`. Expected: OK.

- [ ] **Step 3: Dev visual check**

Run `npm run dev`. Verify:
- Eyebrow "WHAT I WORK WITH" + section title "Tools of the **craft**." with italic blue "craft"
- 3 columns: Backend / **AI** & Data / Frontend (where "AI" is italic blue)
- Pills white with border, hover turns blue + lifts

Stop server.

- [ ] **Step 4: Commit**

```bash
git add src/components/Skills.astro
git commit -m "feat(skills): rewrite — Playfair 48px headers, italic blue AI, blue hover pills"
```

---

## Task 10: Rewrite ProjectList component

**Files:**
- Modify: `src/components/ProjectList.astro`

- [ ] **Step 1: Rewrite ProjectList.astro**

Replace the entire contents of `src/components/ProjectList.astro` with:

```astro
---
// src/components/ProjectList.astro
import { getCollection } from "astro:content";

const projects = (await getCollection("projects"))
  .filter((p) => p.data.current)
  .sort((a, b) => a.data.weight - b.data.weight);
---

<section id="work" class="px-6 py-[120px] lg:px-11 lg:py-[150px]" style="background:rgba(255,255,255,0.5)">
  <div class="mx-auto max-w-[1280px]">
    <p class="eyebrow">Selected work</p>
    <h2 class="section-title compact">Things I've <em>built</em>.</h2>

    <div>
      {projects.map((project, i) => (
        <a
          href={`/work/${project.id}`}
          class="project-row group grid grid-cols-1 items-start gap-8 border-b border-border py-10 no-underline transition-transform duration-300 ease-out md:grid-cols-[80px_1fr_1.4fr] md:gap-11 md:py-14"
          style={i === 0 ? "border-top:1px solid #E5E7EB" : ""}
        >
          <!-- Project number -->
          <div
            class="font-serif italic text-blue"
            style="font-size:clamp(48px, 6vw, 80px); font-weight:500; line-height:1; opacity:0.75;"
          >
            {(i + 1).toString().padStart(2, "0")}
          </div>

          <!-- Info -->
          <div>
            <h3
              class="project-title font-serif font-semibold text-text transition-colors duration-300"
              style="font-size:clamp(28px, 3.5vw, 40px); line-height:1.1; letter-spacing:-0.6px; margin-bottom:16px;"
            >
              {project.data.title}
            </h3>
            <p
              class="font-sans text-text-2"
              style="font-size:16px; line-height:1.65; margin-bottom:22px; max-width:420px; font-weight:450;"
            >
              {project.data.summary}
            </p>
            <div class="flex flex-wrap gap-1.5">
              {project.data.tech.slice(0, 4).map((t: string) => (
                <span class="tech-tag">{t}</span>
              ))}
              {project.data.tech.length > 4 && (
                <span class="tech-tag" style="background:transparent;border:none">+{project.data.tech.length - 4}</span>
              )}
            </div>
          </div>

          <!-- Image -->
          <div
            class="project-image relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl text-sm text-[#9CA3AF] transition-transform duration-300"
            style="background:linear-gradient(135deg, #E0E7FF, #EDE9FE);"
          >
            {project.data.cover ? (
              <img src={project.data.cover} alt={project.data.title} loading="lazy" class="h-full w-full object-cover" />
            ) : (
              <span class="font-sans">Screenshot Preview</span>
            )}
          </div>
        </a>
      ))}
    </div>
  </div>
</section>

<style>
  .project-row:hover { transform: translateX(6px); }
  .project-row:hover .project-image {
    transform: translateY(-4px);
    box-shadow: 0 16px 48px rgba(59, 130, 246, 0.2);
  }
  .project-row:hover .project-title { color: #3B82F6; }
</style>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`. Expected: OK.

- [ ] **Step 3: Dev visual check**

Run `npm run dev`. Verify:
- Section has a faint white-ish background (vs main #FAFAFA)
- Eyebrow + section title "Things I've **built**." with italic blue "built"
- 4 projects in order: 01 Hazenix Blog, 02 Interview Simulators, 03 Haze AI Hub, 04 GapaSea
- Each row: big blue italic serif number left, info middle, image right (16:10 aspect)
- Hover row: whole row shifts right 6px, image lifts and has blue shadow, title turns blue
- Tech tags have light blue background

Stop server.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectList.astro
git commit -m "feat(projects): rewrite — large serif numbers, hover translateX, blue glow"
```

---

## Task 11: Rewrite Timeline component

**Files:**
- Modify: `src/components/Timeline.astro`

- [ ] **Step 1: Rewrite Timeline.astro**

Replace the entire contents of `src/components/Timeline.astro` with:

```astro
---
// src/components/Timeline.astro
import timelineData from "../data/timeline.json";
---

<section class="px-6 py-[110px] lg:px-11 lg:py-[140px]">
  <div class="mx-auto max-w-[1280px]">
    <p class="eyebrow">Experience</p>
    <h2 class="section-title compact">The <em>journey</em> so far.</h2>

    <!-- Desktop: vertical line timeline -->
    <div class="relative hidden lg:block" style="padding-left:260px">
      <!-- Vertical line -->
      <div class="absolute top-3 bottom-3 w-px bg-border" style="left:232px"></div>

      {timelineData.map((entry) => (
        <div class="relative pb-14 last:pb-0">
          <!-- Period (right-aligned, left side) -->
          <p
            class="absolute top-1.5 right-auto text-right font-sans font-semibold text-text-2"
            style="left:-260px; width:200px; font-size:14px; letter-spacing:0.3px;"
          >
            {entry.period}
          </p>

          <!-- Dot -->
          <div
            class={entry.current
              ? "absolute h-[13px] w-[13px] rounded-full"
              : "absolute h-[13px] w-[13px] rounded-full"}
            style={
              entry.current
                ? "left:-36px; top:10px; background:#3B82F6; box-shadow:0 0 0 5px rgba(59,130,246,0.2)"
                : "left:-36px; top:10px; background:#fff; border:2px solid #D1D5DB"
            }
          ></div>

          <!-- Content -->
          <div>
            <h4
              class="font-serif font-semibold text-text"
              style="font-size:28px; letter-spacing:-0.3px; margin-bottom:6px;"
            >
              {entry.title}
            </h4>
            <p class="font-sans font-medium text-blue" style="font-size:15px; margin-bottom:12px;">
              {entry.company}
            </p>
            <p class="font-sans text-text-2" style="font-size:15px; line-height:1.7; max-width:560px; font-weight:450;">
              {entry.description}
            </p>
          </div>
        </div>
      ))}
    </div>

    <!-- Mobile: simple list -->
    <div class="lg:hidden">
      {timelineData.map((entry) => (
        <div class="mb-10 last:mb-0">
          <p class="mb-1 font-sans font-semibold text-text-2" style="font-size:13px; letter-spacing:0.3px;">{entry.period}</p>
          <h4 class="font-serif font-semibold text-text" style="font-size:22px; margin-bottom:4px;">{entry.title}</h4>
          <p class="font-sans font-medium text-blue" style="font-size:14px; margin-bottom:8px;">{entry.company}</p>
          <p class="font-sans text-text-2" style="font-size:14px; line-height:1.7; font-weight:450;">{entry.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`. Expected: OK.

- [ ] **Step 3: Dev visual check**

Run `npm run dev`. Verify:
- Eyebrow + section title "The **journey** so far." with italic blue "journey"
- Desktop: vertical thin line with dots; first dot (current) is blue with glow, others outlined
- Years right-aligned to left of line
- Job title 28px Playfair, company name blue, description sans

Stop server.

- [ ] **Step 4: Commit**

```bash
git add src/components/Timeline.astro
git commit -m "feat(timeline): rewrite — blue current dot with glow, Playfair titles"
```

---

## Task 12: Create ContactCard component

**Files:**
- Create: `src/components/ContactCard.astro`

- [ ] **Step 1: Write ContactCard.astro**

Write the following to `src/components/ContactCard.astro`:

```astro
---
// src/components/ContactCard.astro
import aboutData from "../data/about.json";

const links = [
  { label: "GitHub", href: aboutData.contact.github, hint: "↗ " + aboutData.contact.github.replace("https://github.com/", "@") },
  { label: "Email",  href: `mailto:${aboutData.contact.email}`, hint: "↗ " + aboutData.contact.email },
  { label: "Blog",   href: aboutData.contact.blog, hint: "↗ " + aboutData.contact.blog.replace("https://", "") },
];
---

<div id="contact" class="rounded-2xl border border-border bg-white p-7 lg:p-9">
  <p
    class="font-sans font-bold uppercase text-blue"
    style="font-size:13px; letter-spacing:2.5px; margin-bottom:24px;"
  >
    Get in touch
  </p>
  <div class="flex flex-col gap-4">
    {links.map((link) => (
      <a
        href={link.href}
        target={link.href.startsWith("http") ? "_blank" : undefined}
        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
        class="contact-link flex items-center justify-between font-sans font-medium text-text no-underline transition-colors hover:text-blue"
        style="font-size:17px;"
      >
        <span>{link.label}</span>
        <span class="font-sans text-text-3" style="font-size:14px">{link.hint}</span>
      </a>
    ))}
  </div>
</div>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`. Expected: OK. (Component unused so far.)

- [ ] **Step 3: Commit**

```bash
git add src/components/ContactCard.astro
git commit -m "feat(components): add ContactCard"
```

---

## Task 13: Rewrite About component (uses ContactCard)

**Files:**
- Modify: `src/components/About.astro`

- [ ] **Step 1: Rewrite About.astro**

Replace the entire contents of `src/components/About.astro` with:

```astro
---
// src/components/About.astro
import aboutData from "../data/about.json";
import ContactCard from "./ContactCard.astro";

// Hard-coded emphasis-aware copy. If aboutData.description is overridden, this won't apply emphasis.
const aboutLine = "我是一名后端工程师，相信<em>系统的优雅</em>来自对边界的清晰认知。喜欢把<em>抽象的算法</em>变成稳定运行的产品，也喜欢写文章把过程记录下来。";
const aboutMeta = "博客 · 健身 · 乒乓球 · 开源 · 关注 AI Agent / 数据库底层 / 系统设计";
---

<section id="about" class="px-6 py-[110px] lg:px-11 lg:py-[140px]">
  <div class="mx-auto max-w-[1280px]">
    <div class="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr] md:gap-[80px]">
      <!-- About text -->
      <div>
        <p class="eyebrow">About</p>
        <p
          class="font-serif text-text"
          style="font-size:clamp(22px, 3.4vw, 36px); line-height:1.4; letter-spacing:-0.5px; font-weight:400;"
          set:html={aboutLine.replace(/<em>/g, '<em style="font-style:italic;color:#3B82F6;font-weight:500;">')}
        />
        <p class="font-sans text-text-2" style="font-size:16px; line-height:2; margin-top:32px; font-weight:450;">
          {aboutMeta}
        </p>
      </div>

      <!-- Contact card -->
      <div>
        <ContactCard />
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`. Expected: OK.

- [ ] **Step 3: Dev visual check**

Run `npm run dev`. Verify:
- Eyebrow "ABOUT"
- Large 36px Playfair serif intro paragraph
- "系统的优雅" and "抽象的算法" are blue italic
- Meta line below in sans 16px
- Right side: white contact card with 3 links (GitHub / Email / Blog), each with ↗ hint
- Hover link → text turns blue

Stop server.

- [ ] **Step 4: Commit**

```bash
git add src/components/About.astro
git commit -m "feat(about): rewrite — 36px Playfair intro, ContactCard, blue emphasis"
```

---

## Task 14: Rewrite Footer

**Files:**
- Modify: `src/components/Footer.astro`

- [ ] **Step 1: Rewrite Footer.astro**

Replace the entire contents of `src/components/Footer.astro` with:

```astro
---
// src/components/Footer.astro
const year = new Date().getFullYear();
---

<footer class="border-t border-border px-6 py-12 lg:px-11">
  <div class="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-3 font-sans text-text-3 sm:flex-row sm:items-center" style="font-size:15px;">
    <span>&copy; {year} Hazenix. Crafted with care.</span>
    <a href="#top" class="text-text-2 no-underline transition-colors hover:text-blue">&uarr; Back to top</a>
  </div>
</footer>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`. Expected: OK.

- [ ] **Step 3: Dev visual check**

Run `npm run dev`. Scroll to bottom of homepage. Verify:
- Top border
- Left: "© 2026 Hazenix. Crafted with care."
- Right: "↑ Back to top" — hover turns blue, click scrolls to top

Stop server.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat(footer): rewrite — Crafted with care + back-to-top link"
```

---

## Task 15: Update index.astro and remove old dividers

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Rewrite index.astro**

Replace the entire contents of `src/pages/index.astro` with:

```astro
---
// src/pages/index.astro
import Base from "../layouts/Base.astro";
import Nav from "../components/Nav.astro";
import Hero from "../components/Hero.astro";
import Skills from "../components/Skills.astro";
import ProjectList from "../components/ProjectList.astro";
import Timeline from "../components/Timeline.astro";
import About from "../components/About.astro";
import Footer from "../components/Footer.astro";
import RevealOnScroll from "../components/RevealOnScroll.astro";
---

<Base title="Hazenix — Backend Developer & Builder">
  <Nav />
  <main id="main-content">
    <span id="top"></span>
    <Hero />
    <RevealOnScroll><Skills /></RevealOnScroll>
    <RevealOnScroll><ProjectList /></RevealOnScroll>
    <RevealOnScroll><Timeline /></RevealOnScroll>
    <RevealOnScroll><About /></RevealOnScroll>
  </main>
  <Footer />
</Base>
```

(Note: Hero is NOT wrapped in `RevealOnScroll` — it should be visible immediately on load. Other sections fade in as user scrolls.)

- [ ] **Step 2: Verify build**

Run: `npm run build`. Expected: OK.

- [ ] **Step 3: Dev visual check — full page flow**

Run `npm run dev`. Open `http://localhost:4321`. Scroll from top to bottom slowly. Verify:
- Hero appears immediately
- Each subsequent section fades up as you scroll into it (smooth 0.7s)
- Orbs visible behind everything
- No leftover thin horizontal divider lines between sections (the old `<div class="section-divider" />` are gone)
- Project order: Blog → Interview → AI Hub → GapaSea

Stop server.

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat(home): integrate redesigned components with scroll reveal"
```

---

## Task 16: Update project detail page styling

**Files:**
- Modify: `src/pages/work/[slug].astro`

- [ ] **Step 1: Rewrite the detail page**

Replace the entire contents of `src/pages/work/[slug].astro` with:

```astro
---
// src/pages/work/[slug].astro
import { getCollection, render } from "astro:content";
import Base from "../../layouts/Base.astro";
import Footer from "../../components/Footer.astro";

export async function getStaticPaths() {
  const projects = await getCollection("projects");
  return projects.map((p) => ({ params: { slug: p.id } }));
}

const { slug } = Astro.params;
const projects = await getCollection("projects");
const sorted = projects.sort((a, b) => a.data.weight - b.data.weight);
const project = projects.find((p) => p.id === slug);

if (!project) {
  return Astro.redirect("/404");
}

const currentIndex = sorted.findIndex((p) => p.id === slug);
const prevProject = currentIndex > 0 ? sorted[currentIndex - 1] : null;
const nextProject = currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null;
const { Content } = await render(project);
---

<Base title={`${project.data.title} — Hazenix`} description={project.data.summary}>
  <!-- Top bar -->
  <div class="sticky top-0 z-40 flex items-center justify-between border-b border-black/[0.04] px-6 py-5 backdrop-blur-[14px] lg:px-11" style="background:rgba(250,250,250,0.78)">
    <a href="/" class="font-sans text-[14px] font-medium text-text-2 no-underline transition-colors hover:text-blue">&larr; Back</a>
    <a href="/" class="font-serif text-[20px] font-bold tracking-[-0.4px] text-text no-underline lg:text-[24px]">
      Hazenix<em style="font-style:italic;color:#3B82F6">.</em>
    </a>
    {nextProject ? (
      <a href={`/work/${nextProject.id}`} class="font-sans text-[14px] font-medium text-text-2 no-underline transition-colors hover:text-blue">Next Project &rarr;</a>
    ) : (
      <span class="font-sans text-[14px] text-border">Next Project &rarr;</span>
    )}
  </div>

  <main id="main-content">
    <!-- Cover image -->
    {project.data.cover && (
      <div class="mx-6 mt-16 lg:mx-11 lg:mt-20">
        <img
          src={project.data.cover}
          alt={project.data.title}
          loading="lazy"
          class="h-[240px] w-full rounded-xl object-cover lg:h-[380px]"
        />
      </div>
    )}

    <!-- Title block -->
    <div class="px-6 pt-12 lg:px-11 lg:pt-16">
      <div class="mx-auto max-w-[1280px]">
        <p class="eyebrow">Project {(currentIndex + 1).toString().padStart(2, "0")}</p>
        <h1
          class="font-serif font-bold text-text"
          style="font-size:clamp(36px, 6vw, 72px); line-height:1.05; letter-spacing:-2px; margin-bottom:28px;"
        >
          {project.data.title}
        </h1>
        <p
          class="font-sans text-text-2"
          style="font-size:clamp(16px, 1.6vw, 21px); line-height:1.65; max-width:680px; font-weight:450;"
        >
          {project.data.summary}
        </p>
        <div class="mt-8 flex gap-3">
          <a class="btn-primary" href={project.data.links.github} target="_blank" rel="noopener noreferrer">GitHub →</a>
          {project.data.links.demo && (
            <a class="btn-ghost" href={project.data.links.demo} target="_blank" rel="noopener noreferrer">Live Demo →</a>
          )}
        </div>
      </div>
    </div>

    <!-- Body: content + sidebar -->
    <div class="px-6 py-16 lg:px-11 lg:py-20">
      <div class="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 lg:grid-cols-[2fr_1fr] lg:gap-16">
        <!-- Markdown content -->
        <article class="prose-custom">
          <Content />
        </article>

        <!-- Sidebar meta -->
        <aside>
          <div class="rounded-2xl border border-border bg-white p-7 lg:p-8">
            <p class="font-sans font-bold uppercase text-blue" style="font-size:12px; letter-spacing:2.2px; margin-bottom:14px;">Tech Stack</p>
            <div class="flex flex-wrap gap-1.5">
              {project.data.tech.map((t: string) => (
                <span class="tech-tag">{t}</span>
              ))}
            </div>

            <p class="font-sans font-bold uppercase text-blue mt-8" style="font-size:12px; letter-spacing:2.2px; margin-bottom:10px;">Role</p>
            <p class="font-sans text-text-2" style="font-size:14px; font-weight:450;">{project.data.role}</p>

            <p class="font-sans font-bold uppercase text-blue mt-8" style="font-size:12px; letter-spacing:2.2px; margin-bottom:10px;">Links</p>
            <a href={project.data.links.github} target="_blank" rel="noopener noreferrer" class="block break-all font-sans text-text-2 no-underline transition-colors hover:text-blue" style="font-size:14px; font-weight:450;">
              {project.data.links.github.replace("https://", "")}
            </a>
          </div>
        </aside>
      </div>
    </div>

    <!-- Prev/Next nav -->
    <div class="border-t border-border px-6 py-10 lg:px-11">
      <div class="mx-auto flex max-w-[1280px] items-center justify-between font-sans" style="font-size:14px;">
        {prevProject ? (
          <a href={`/work/${prevProject.id}`} class="text-text-2 no-underline transition-colors hover:text-blue">&larr; {prevProject.data.title}</a>
        ) : (
          <span class="text-border">&larr; Previous</span>
        )}
        {nextProject ? (
          <a href={`/work/${nextProject.id}`} class="text-text-2 no-underline transition-colors hover:text-blue">{nextProject.data.title} &rarr;</a>
        ) : (
          <span class="text-border">Next &rarr;</span>
        )}
      </div>
    </div>
  </main>

  <Footer />
</Base>

<style>
  .prose-custom {
    font-family: var(--font-sans);
    font-size: 16px;
    line-height: 1.85;
    color: #2A2A2A;
    font-weight: 450;
  }
  .prose-custom :global(h2) {
    font-family: var(--font-serif);
    font-size: 32px;
    font-weight: 600;
    color: #0A0A0A;
    letter-spacing: -0.5px;
    margin-top: 3rem;
    margin-bottom: 1.25rem;
  }
  .prose-custom :global(h3) {
    font-family: var(--font-serif);
    font-size: 24px;
    font-weight: 600;
    color: #0A0A0A;
    letter-spacing: -0.3px;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
  }
  .prose-custom :global(p)  { margin-bottom: 1.25rem; }
  .prose-custom :global(ul), .prose-custom :global(ol) {
    padding-left: 1.25rem;
    margin-bottom: 1.25rem;
  }
  .prose-custom :global(li) { margin-bottom: 0.4rem; }
  .prose-custom :global(code) {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 14px;
    background: #F3F4F6;
    color: #2A2A2A;
    padding: 2px 6px;
    border-radius: 4px;
  }
  .prose-custom :global(strong) { color: #0A0A0A; font-weight: 600; }
  .prose-custom :global(a) { color: #3B82F6; text-decoration: underline; text-underline-offset: 3px; }
  .prose-custom :global(a:hover) { color: #8B5CF6; }
</style>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`. Expected: OK, all detail pages generated.

- [ ] **Step 3: Dev visual check**

Run `npm run dev`. Navigate to `http://localhost:4321/work/hazenix-blog` (and others). Verify:
- Top bar has serif "Hazenix." logo, hover links turn blue
- Cover image is larger, more rounded
- Big Playfair title (~72px)
- 21px sans lead description
- Buttons: GitHub uses btn-primary (blue-violet gradient), Demo uses btn-ghost
- Markdown body uses Playfair for h2/h3, Geist for body
- Sidebar: white card with blue "TECH STACK" / "ROLE" / "LINKS" labels
- Orbs visible (Base layout applies)
- Bottom prev/next nav with hover blue

Stop server.

- [ ] **Step 4: Commit**

```bash
git add src/pages/work/[slug].astro
git commit -m "feat(detail): align project detail page with new design system"
```

---

## Task 17: Final verification — build, screenshot, spec checklist

**Files:**
- None modified (verification only)

- [ ] **Step 1: Search for any remaining old gray colors (#888, #999)**

Run:
```bash
grep -rn '#888\|#999\|text-faint\|text-muted\|border-light\|border-dark\|color-faint\|color-muted' src/
```

Expected: No matches. If matches found, replace with new tokens:
- `text-muted` / `text-faint` / `#888` / `#999` → `text-text-2` or `text-text-3`
- `border-light` / `border-dark` → `border` (`var(--color-border)`)

Then re-run grep until empty. Commit any fix:
```bash
git add -A
git commit -m "chore: replace remaining old gray tokens with new scheme"
```

- [ ] **Step 2: Production build clean**

Run: `npm run build`

Expected:
- Build succeeds
- No console warnings about missing CSS variables
- `dist/` contains `index.html`, `404.html`, `work/[slug]/index.html` for all 4 projects

- [ ] **Step 3: Preview production build**

Run: `npm run preview`

Open `http://localhost:4321/` (or whatever port preview uses). Walk through the full site:

**Homepage:**
- [ ] 3 floating orbs visible and animating
- [ ] Hero: status pill, 104px serif, "reliable, scalable" gradient italic
- [ ] Skills: 3 columns, italic blue "AI", pills hover blue
- [ ] Projects: order Blog/InterviewSim/AIHub/GapaSea, hover translateX + image lift
- [ ] Timeline: blue current dot with glow
- [ ] About: 36px serif intro with blue italic emphasis, white ContactCard
- [ ] Footer: "Crafted with care." + "↑ Back to top" (works)
- [ ] No `#888` / `#999` gray text anywhere

**Detail pages** (open each of 4 projects):
- [ ] Top bar Hazenix logo serif with blue dot
- [ ] Big Playfair title
- [ ] Tech tags in light-blue boxes
- [ ] Sidebar card with blue labels
- [ ] Markdown content uses Playfair for headings

**Responsive:**
- [ ] Resize browser to 768px width → 3-column Skills becomes 1 column, Timeline keeps vertical line OR becomes simple list (whichever you implemented), hero text scales down
- [ ] Resize to 375px → all readable, no horizontal scroll, orbs don't overflow

**Reduced motion:**
- [ ] DevTools → Rendering → Emulate `prefers-reduced-motion: reduce` → orbs freeze, scroll reveal disabled (content visible immediately), hover lift disabled but color changes preserved

Stop preview.

- [ ] **Step 4: Visual screenshots (optional but recommended)**

If you have CDP access (the user's web-access skill), open `http://localhost:4321` after `npm run preview` and take screenshots of:
- Top of homepage (Hero)
- Projects section
- About section
- One detail page

Save to project root or `.screenshots/` for the user to review.

- [ ] **Step 5: Update spec/plan reference in README if exists**

Read `README.md`. If it references the old design or links to the old spec, update it to mention the new spec at `docs/superpowers/specs/2026-05-29-portfolio-redesign-design.md`. Otherwise skip.

- [ ] **Step 6: Final commit**

If anything was tweaked in steps 1-5 that isn't yet committed:
```bash
git add -A
git status
# review
git commit -m "chore: final polish after visual verification"
```

If nothing to commit, skip.

- [ ] **Step 7: Report to user**

Summarize:
- All 17 tasks complete
- N commits made (count via `git log --oneline | head -20`)
- Site verified at `http://localhost:4321` via preview
- Any deviations from spec (if any) and why

Tell the user the redesign is ready for review, recommend opening dev server with `npm run dev` to interact.

---

## Self-Review (notes for the engineer running the plan)

After all 17 tasks complete, the spec's 16-item Validation Checklist (in `docs/superpowers/specs/2026-05-29-portfolio-redesign-design.md` § "验收清单") MUST all be checked.

Common pitfalls to watch for:

1. **Tailwind 4 color classes** — Tailwind 4 generates `text-blue`, `bg-blue`, `border-border` etc. from the CSS variables in `@theme`. If a class like `text-blue` doesn't apply, double-check the variable name matches (`--color-blue` → `text-blue`).
2. **Font weights for Playfair Display** — only 400/500/600/700 are imported. If a component requests 800, it'll fall back. Don't introduce 800.
3. **Tailwind 4 utility class generation** — bare `text-text-2` works because we declared `--color-text-2`. But `text-text-2/50` (opacity modifier) may or may not work depending on Tailwind 4 behavior. Avoid opacity modifiers on custom colors; use explicit `rgba()` if needed.
4. **Astro inline styles vs Tailwind** — when a class needs to dynamically respond to a prop, prefer inline `style="..."`. Otherwise Tailwind utility class is fine. The plan above mixes both — that's intentional.
5. **Reveal observer scoping** — the script in `RevealOnScroll.astro` runs once per page load and observes all `.reveal` on the page. If hydration adds more `.reveal` later (it won't for static Astro), they'd be missed. Static-only is fine.
6. **`set:html` in About** — uses string replace to inject blue italic spans. Ensure no untrusted input ever flows through `aboutLine` (it's a hard-coded constant, so safe).

If anything in the plan contradicts itself or the spec, treat the spec as source of truth and the plan as guidance.
