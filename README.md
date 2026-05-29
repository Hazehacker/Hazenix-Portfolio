# Hazenix Portfolio

Personal portfolio website showcasing backend development and AI application projects. Built for both recruiter appeal and developer credibility.

## Tech Stack

- **Framework**: [Astro 6](https://astro.build) — static site generation
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) with custom design tokens
- **Font**: Inter via [Fontsource](https://fontsource.org)
- **Deployment**: GitHub Pages via Actions

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:4321)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

Requires **Node.js >= 22.12.0**.

## Project Structure

```
src/
  components/     # UI components (Nav, Hero, Skills, Timeline, etc.)
  content/        # Content collections — project markdown files
    projects/     # Each .md file = one portfolio project
  data/           # JSON data files (skills, timeline, about)
  layouts/        # Base layout with HTML shell
  pages/          # Route pages
    index.astro   # Homepage
    work/
      [slug].astro  # Dynamic project detail page
    404.astro     # Custom 404 page
  styles/
    global.css    # Tailwind imports, theme tokens, shared classes
public/
  favicon.ico     # Favicon assets
  favicon.svg
```

## Content Management

Portfolio projects live in `src/content/projects/` as Markdown files. Each project has YAML frontmatter:

```yaml
title: "Project Name"
role: "Your Role"
summary: "One-line description"
cover: "/path/to/screenshot.png"   # optional
tech: ["Tech A", "Tech B"]
links:
  github: "https://github.com/..."
  demo: "https://..."             # optional
weight: 1   # sort order (lower = first)
current: true  # false to hide
```

## Deployment

Push to `main` triggers the GitHub Actions workflow in `.github/workflows/deploy.yml`, which builds the static site and deploys to GitHub Pages.

