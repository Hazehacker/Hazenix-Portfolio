# Hazenix Portfolio — Design Spec

## Overview

Personal portfolio website for Hazenix, a backend developer. Serves dual purposes: impress HR/interviewers during job hunting, and showcase technical depth to peers and the developer community.

**Key constraints:**
- Pure frontend, simple deployment (GitHub Pages or Vercel)
- Easy content updates (add projects, edit timeline, tweak skills — no code changes needed)
- Visually distinctive — this is a front door, not a side project
- No technical articles (has a separate blog for that)

## Visual Design

**Style:** Minimal/Editorial. Light background, generous whitespace, refined typography. The aesthetic says "I care about craft" without screaming.

**Color Palette:**
- Background: `#fafafa` (warm off-white)
- Text primary: `#1a1a1a`
- Text secondary: `#888` / `#999`
- Borders/dividers: `#eee` / `#e0e0e0` / `#d0d0d0`
- Accent: none — the design relies on typography and spacing for hierarchy, not color

**Typography:**
- Headings: Extra-light weight (220–320), negative letter-spacing, large sizes (32–56px)
- Body: Regular weight (400–450), 13–16px, comfortable line-height (1.7–1.8)
- Labels: 11px uppercase, 2–3px letter-spacing, used for section headers
- Font: Inter or system sans-serif stack

**Layout Principles:**
- 80px horizontal padding on desktop
- Thin horizontal rules (`1px solid #e0e0e0`) as primary visual separators, not cards or shadows
- Projects as horizontal rows (number + text left, screenshot right), not a grid of cards
- Short black bars (`40px × 2px`) under section labels for anchorage
- No rounded corners larger than 4px, no box shadows, no gradients

## Page Structure

### Homepage (Single Page, Scroll)

Six sections, top to bottom:

1. **Nav** — Logo left, 3 links right (Work / About / Contact). Fixed position, transparent background.
2. **Hero** — Label ("Backend Developer & Builder"), large statement with italic emphasis words, short description paragraph. No CTA buttons, no avatar. Just type.
3. **Skills** — Section label "What I Work With", then 3 columns: Backend / AI & Data / Frontend. Each column has a 32px thin category heading + tag pills (white background, 1px border).
4. **Projects** — Section label "Selected Work", then a vertical stack of project rows. Each row: `01` number + title + description + tech tags on the left, screenshot placeholder on the right. 1px bottom border between rows. Each row links to `/work/[slug]`.
5. **Timeline** — Section label "Experience", vertical line with dots (solid for current, outlined for past). Years right-aligned to the left of the line, content to the right: title (22px thin) + company + description.
6. **About + Contact** — 2-column: About text left, contact links right. Minimal.
7. **Footer** — `© 2026 Hazenix`, 11px, light gray.

### Project Detail Page (`/work/[slug]`)

- Thin top bar: ← Back | Logo | Next Project →
- Full-width cover image
- Project number + large title + description + GitHub/Demo buttons
- Two-column body: Markdown content left, meta sidebar right (tech stack, role, timeline, links)
- Bottom: previous/next project navigation

## Data Architecture

All user-editable content lives in two directories. Updating the site means editing files here — no component code changes needed.

### Projects: `src/content/projects/*.md`

Astro Content Collections. Each project is one Markdown file.

```yaml
---
title: "Haze AI Hub"
role: "Full-stack Developer"
summary: "多模态 AI 聊天平台，RAG 知识库 + 流式对话"
cover: "../../public/images/ai-hub-cover.png"
screenshots:
  - "../../public/images/ai-hub-1.png"
  - "../../public/images/ai-hub-2.png"
tech:
  - "Spring Boot 3.4"
  - "Vue 3"
  - "PostgreSQL"
  - "pgvector"
  - "Redis Stream"
  - "RAG"
  - "SSE"
links:
  github: "https://github.com/Hazehacker/haze-AI-Hub"
  demo: ""
weight: 1
current: true
---

## Overview

正文 Markdown — 项目背景、架构思路、技术决策等...
```

### Structured Data: `src/data/*.json`

**`timeline.json`:**
```json
[
  {
    "period": "2024 — Present",
    "title": "Backend Developer",
    "company": "XXX Company",
    "description": "核心业务系统架构设计与开发...",
    "current": true
  }
]
```

**`skills.json`:**
```json
{
  "Backend": ["Java", "Spring Boot", "MyBatis Plus", "PostgreSQL", "Redis", "MySQL", "Maven", "Docker"],
  "AI & Data": ["RAG", "LLM Integration", "Vector Search", "Prompt Engineering", "Agent Design", "Spring AI", "pgvector"],
  "Frontend": ["Vue 3", "TypeScript", "Tailwind CSS", "Element Plus", "Naive UI", "Pinia", "Git"]
}
```

**`about.json`:**
```json
{
  "name": "Hazenix",
  "title": "Backend Developer & Builder",
  "description": "专注于后端工程与 AI 应用开发...",
  "contact": {
    "github": "https://github.com/Hazehacker",
    "email": "...",
    "blog": "https://blog.hazenix.top"
  }
}
```

## Technical Architecture

**Stack:** Astro + Tailwind CSS. Zero JS framework. Zero runtime JS unless explicitly needed for progressive enhancement.

**Directory structure:**
```
Hazenix-Portfolio/
├── src/
│   ├── content/projects/     # Markdown project files
│   ├── data/                 # JSON: timeline, skills, about
│   ├── pages/
│   │   ├── index.astro       # Homepage
│   │   └── work/[slug].astro # Project detail
│   ├── components/           # Nav, Hero, Skills, ProjectList, Timeline, About, Contact, Footer
│   ├── layouts/Base.astro    # Global layout shell
│   └── styles/global.css     # Tailwind + custom minimal styles
├── public/images/            # Project screenshots and assets
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

**Key Astro features used:**
- Content Collections for type-safe Markdown queries
- Static generation (`output: 'static'`)
- `getStaticPaths()` for dynamic project detail routes

**Responsive approach:**
- Desktop-first, break down to single column at ~768px
- Hero text scales down proportionally
- Project rows stack vertically (text on top, screenshot below)
- Timeline loses the vertical line, becomes simple left-aligned list

## Deployment

1. `npm run build` → `dist/` directory with static HTML/CSS
2. Push to GitHub
3. GitHub Pages (free) or Vercel (free, faster CDN) auto-deploys from `main` branch
4. Custom domain can be added later

## Content Update Flow

**Add a new project:**
1. Create `src/content/projects/new-project.md` with frontmatter
2. Drop screenshots into `public/images/`
3. `git commit && git push` → site auto-redeploys

**Edit existing project:**
1. Edit the `.md` file — update description, tech stack, screenshots
2. Push

**Update timeline / skills / about:**
1. Edit the corresponding JSON in `src/data/`
2. Push

**No code changes required for any content update.**
