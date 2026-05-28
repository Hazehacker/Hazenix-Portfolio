# Hazenix Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a minimal/editorial-style personal portfolio website with Astro + Tailwind CSS, driven by Markdown project files and JSON data files.

**Architecture:** Astro SSG with Content Collections for type-safe Markdown projects, JSON data files for structured content (skills, timeline, about), zero runtime JS. Single-page scrolling homepage with six sections, plus dynamic project detail pages at `/work/[slug]`.

**Tech Stack:** Astro 5, Tailwind CSS 4, @fontsource/inter, TypeScript

---

## File Structure

```
Hazenix-Portfolio/
├── src/
│   ├── content/
│   │   ├── config.ts              # Content collection schema (zod)
│   │   └── projects/
│   │       ├── haze-ai-hub.md
│   │       ├── interview-simulators.md
│   │       └── hazenix-blog.md
│   ├── data/
│   │   ├── skills.json
│   │   ├── timeline.json
│   │   └── about.json
│   ├── pages/
│   │   ├── index.astro            # Homepage (all sections)
│   │   └── work/
│   │       └── [slug].astro       # Project detail (dynamic route)
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Hero.astro
│   │   ├── Skills.astro
│   │   ├── ProjectList.astro
│   │   ├── Timeline.astro
│   │   ├── About.astro
│   │   ├── Contact.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Base.astro             # Global HTML shell
│   └── styles/
│       └── global.css             # Tailwind directives + custom styles
├── public/
│   └── images/                    # Project screenshots (placeholder for now)
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

### Task 1: Scaffold Astro Project with Tailwind

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/styles/global.css`

- [ ] **Step 1: Create Astro project**

Run: `npm create astro@latest . -- --template empty --skip-houston --no-install`
Select: TypeScript strict, install dependencies: yes

- [ ] **Step 2: Add Tailwind CSS**

Run: `npx astro add tailwind --yes`

This installs `@tailwindcss/vite` and configures `astro.config.mjs`. Astro 5 uses Tailwind v4 by default.

- [ ] **Step 3: Install Inter font**

Run: `npm install @fontsource/inter`

- [ ] **Step 4: Install content-collections deps (if needed)**

Astro 5 has content collections built-in. No extra install needed.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold Astro project with Tailwind"
```

---

### Task 2: Configure Project Settings

**Files:**
- Modify: `astro.config.mjs`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Update astro.config.mjs**

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 2: Write global.css with Tailwind directives and custom base styles**

```css
/* src/styles/global.css */
@import "tailwindcss";
@import "@fontsource/inter/300.css";
@import "@fontsource/inter/400.css";
@import "@fontsource/inter/500.css";
@import "@fontsource/inter/600.css";

@theme {
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --color-bg: #fafafa;
  --color-text: #1a1a1a;
  --color-text-muted: #888;
  --color-text-faint: #999;
  --color-border: #e0e0e0;
  --color-border-light: #eee;
  --color-border-dark: #d0d0d0;
}

/* Base resets */
body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Section label: 11px uppercase with short black bar */
.section-label {
  font-size: 0.6875rem;   /* 11px */
  font-weight: 500;
  color: var(--color-text-faint);
  letter-spacing: 0.1875rem; /* 3px */
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.section-label::after {
  content: '';
  display: block;
  width: 2.5rem;         /* 40px */
  height: 0.125rem;      /* 2px */
  background: var(--color-text);
  margin-top: 0.75rem;
}

/* Section divider: 1px horizontal line */
.section-divider {
  height: 1px;
  background: var(--color-border);
  margin: 0;
}
```

- [ ] **Step 3: Verify styles**

Run: `npx astro dev` and confirm no build errors (Ctrl+C after).

- [ ] **Step 4: Commit**

```bash
git add astro.config.mjs src/styles/global.css
git commit -m "chore: configure Astro static output and Tailwind base styles"
```

---

### Task 3: Create Data Files (skills, timeline, about)

**Files:**
- Create: `src/data/skills.json`
- Create: `src/data/timeline.json`
- Create: `src/data/about.json`

- [ ] **Step 1: Create skills.json**

```json
{
  "Backend": [
    "Java", "Spring Boot", "MyBatis Plus",
    "PostgreSQL", "Redis", "MySQL",
    "Maven", "Docker"
  ],
  "AI & Data": [
    "RAG", "LLM Integration", "Vector Search",
    "Prompt Engineering", "Agent Design",
    "Spring AI", "pgvector"
  ],
  "Frontend": [
    "Vue 3", "TypeScript", "Tailwind CSS",
    "Element Plus", "Naive UI", "Pinia", "Git"
  ]
}
```

- [ ] **Step 2: Create timeline.json**

```json
[
  {
    "period": "2024 — Present",
    "title": "Backend Developer",
    "company": "XXX Company",
    "description": "核心业务系统架构设计与开发，主导 AI 应用平台从零搭建。深度参与分布式系统设计、数据库优化和高并发方案落地。",
    "current": true
  },
  {
    "period": "2022 — 2024",
    "title": "Junior Developer",
    "company": "XXX Company",
    "description": "参与多个后端项目的开发与维护，积累 Java 生态与微服务架构的实践经验。",
    "current": false
  },
  {
    "period": "2018 — 2022",
    "title": "B.S. Computer Science",
    "company": "XXX University",
    "description": "计算机科学与技术专业，主修数据结构、操作系统、计算机网络与分布式系统。",
    "current": false
  }
]
```

- [ ] **Step 3: Create about.json**

```json
{
  "name": "Hazenix",
  "title": "Backend Developer & Builder",
  "description": "专注于后端工程与 AI 应用开发，热爱构建可扩展的系统。相信好的架构经得起时间考验。",
  "contact": {
    "github": "https://github.com/Hazehacker",
    "email": "hazehacker@example.com",
    "blog": "https://blog.hazenix.top"
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add src/data/
git commit -m "feat: add data files for skills, timeline, and about"
```

---

### Task 4: Content Collection Schema + Project Markdown Files

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/projects/haze-ai-hub.md`
- Create: `src/content/projects/interview-simulators.md`
- Create: `src/content/projects/hazenix-blog.md`

- [ ] **Step 1: Create content collection config**

```ts
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    role: z.string(),
    summary: z.string(),
    cover: z.string().optional(),
    screenshots: z.array(z.string()).default([]),
    tech: z.array(z.string()).default([]),
    links: z.object({
      github: z.string(),
      demo: z.string().optional(),
    }),
    weight: z.number().default(99),
    current: z.boolean().default(true),
  }),
});

export const collections = {
  projects: projectsCollection,
};
```

- [ ] **Step 2: Create haze-ai-hub.md**

```markdown
---
title: "Haze AI Hub"
role: "Full-stack Developer"
summary: "多模态 AI 聊天平台，集成 RAG 知识库检索与异步文档处理"
tech:
  - "Spring Boot 3.4"
  - "Vue 3"
  - "PostgreSQL"
  - "pgvector"
  - "Redis Stream"
  - "RAG"
  - "SSE"
  - "DashScope"
links:
  github: "https://github.com/Hazehacker/haze-AI-Hub"
  demo: ""
weight: 1
current: true
---

Haze AI Hub 是一个全栈式 AI 聊天应用，支持多模态对话（文本、图片、音频）、知识库管理（RAG 检索增强生成）和智能客服功能。

## 核心架构

- **后端**：Spring Boot 3.4.5 + Spring AI Alibaba，Maven 多模块构建
- **前端**：Vue 3 + TypeScript + Vite 6，Naive UI + Element Plus
- **数据库**：PostgreSQL（pgvector 向量扩展）+ Redis（缓存与 Stream 消息队列）
- **AI 模型**：阿里云 DashScope（通义千问、text-embedding-v3）

## 技术亮点

### RAG 知识库
文件上传后经由 Redis Stream 异步解析（PDF/Word/XMind），自动分块、向量化并存入 pgvector，支持语义检索问答。解析进度通过 SSE 实时推送。

### 多模态对话
支持文本、图片、音频交互，流式响应含思考过程展示。

### 智能会话管理
首条消息触发自动创建会话，AI 自动生成标题，支持分组、置顶、软删除。
```

- [ ] **Step 3: Create interview-simulators.md**

```markdown
---
title: "Interview Simulators"
role: "Skill Designer & Developer"
summary: "Java 后端 & AI 开发面试模拟器，深度追问链 + 多风格面试官"
tech:
  - "Claude Skill"
  - "LLM"
  - "FSM"
  - "Prompt Engineering"
  - "RAG"
links:
  github: "https://github.com/Hazehacker/java-backend-interview-simulator"
  demo: ""
weight: 2
current: true
---

两个基于 Claude Skill 框架构建的 AI 模拟面试系统，覆盖 Java 后端和 AI 应用开发两个方向。

## Java Backend Interview Simulator

模拟中国大厂（字节、腾讯、阿里等）Java 后端技术面试。核心设计亮点：

### 深度追问链
从简历中提取 14 个高频关键词（CAS、volatile、Redis、多级缓存等），每个关键词自动触发 3-5 层连续追问，逼近底层原理与工程权衡。

### 六种面试官风格
从"严厉拷打型"到"温和鼓励型"，再到"深挖学术型"和"工程实践型"，每场面试的氛围和追问节奏完全不同。

### 有限状态机驱动
面试流程：破冰 → 项目深挖 → 技术考察 → 编码题 → 总结反馈。实时状态跟踪已考察点、候选人弱点和待跟进项。

## AI Dev Interview Simulator

专注于 Agent、RAG、MCP、大模型应用等 AI 新兴领域的面试模拟。实操编码题聚焦 Prompt 设计、ReAct 实现、MCP Server 设计等场景。
```

- [ ] **Step 4: Create hazenix-blog.md**

```markdown
---
title: "Hazenix Blog"
role: "Full-stack Developer"
summary: "全栈博客系统，Spring Boot + Vue 3，支持 OAuth 多端登录与多级评论"
tech:
  - "Spring Boot 2.7"
  - "Vue 3"
  - "MySQL"
  - "Redis"
  - "OAuth 2.0"
  - "WebSocket"
  - "OSS"
links:
  github: "https://github.com/Hazehacker/blog.hazenix.top"
  demo: "https://blog.hazenix.top"
weight: 3
current: true
---

现代化的全栈个人博客系统，前后端分离架构。

## 核心功能

- **文章管理**：Markdown 编辑、分类、标签、置顶
- **多级评论**：树形展示、点赞互动
- **用户系统**：手机号/邮箱注册，Google/GitHub/微信 OAuth 登录
- **全站搜索**：文章全文检索与标签筛选
- **AI 摘要**：文章 AI 自动摘要生成
- **树洞功能**：匿名留言互动

## 技术架构

- **后端**：Spring Boot 2.7.3 + MyBatis Plus + Spring Security + JJWT
- **前端**：Vue 3 + Vite + Pinia + Element Plus + Tailwind CSS
- **存储**：MySQL 8.0 + Redis + 阿里云 OSS
```

- [ ] **Step 5: Commit**

```bash
git add src/content/
git commit -m "feat: add content collection schema and project markdown files"
```

---

### Task 5: Create Base Layout

**Files:**
- Create: `src/layouts/Base.astro`

- [ ] **Step 1: Create Base.astro**

```astro
---
// src/layouts/Base.astro
export interface Props {
  title: string;
  description?: string;
}

const { title, description = "Hazenix — Backend Developer & Builder" } = Astro.props;
---

<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 2: Verify**

Run: `npx astro dev` — no errors.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Base.astro
git commit -m "feat: add base layout"
```

---

### Task 6: Create Nav Component

**Files:**
- Create: `src/components/Nav.astro`

- [ ] **Step 1: Create Nav.astro**

```astro
---
// src/components/Nav.astro
const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];
---

<nav class="fixed top-0 left-0 right-0 z-50 bg-bg/90 backdrop-blur-sm">
  <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-5 lg:px-20">
    <a href="/" class="text-[15px] font-medium tracking-[-0.2px] text-text no-underline">
      Hazenix
    </a>
    <div class="flex gap-9">
      {navLinks.map((link) => (
        <a
          href={link.href}
          class="text-[13px] text-text-muted no-underline transition-colors hover:text-text"
        >
          {link.label}
        </a>
      ))}
    </div>
  </div>
  <div class="section-divider" />
</nav>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Nav.astro
git commit -m "feat: add Nav component"
```

---

### Task 7: Create Hero Component

**Files:**
- Create: `src/components/Hero.astro`

- [ ] **Step 1: Create Hero.astro**

```astro
---
// src/components/Hero.astro
import aboutData from "../data/about.json";
---

<section class="px-6 pb-16 pt-40 lg:px-20 lg:pb-20 lg:pt-[120px]">
  <div class="mx-auto max-w-5xl">
    <p class="section-label !mb-7 lg:!mb-7">
      {aboutData.title}
    </p>
    <h1 class="max-w-[680px] text-[36px] leading-[1.15] tracking-[-0.8px] text-text lg:text-[52px] lg:font-[280] lg:tracking-[-1.2px]">
      I design and build systems that are <em class="not-italic lg:font-[340]">reliable</em>, <em class="not-italic lg:font-[340]">scalable</em>, and <em class="not-italic lg:font-[340]">beautifully simple</em>.
    </h1>
    <p class="mt-8 max-w-[480px] text-[15px] leading-[1.7] text-text-muted lg:text-base">
      {aboutData.description}
    </p>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: add Hero component"
```

---

### Task 8: Create Skills Component

**Files:**
- Create: `src/components/Skills.astro`

- [ ] **Step 1: Create Skills.astro**

```astro
---
// src/components/Skills.astro
import skillsData from "../data/skills.json";
---

<section class="px-6 py-16 lg:px-20 lg:py-20">
  <div class="mx-auto max-w-5xl">
    <p class="section-label !mb-14 lg:!mb-14">What I Work With</p>

    <div class="grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-14">
      {Object.entries(skillsData).map(([category, items]) => (
        <div>
          <h3 class="mb-6 text-[28px] font-[220] tracking-[-0.5px] text-text lg:text-[32px]">
            {category}
          </h3>
          <div class="flex flex-wrap gap-2">
            {(items as string[]).map((skill: string) => (
              <span class="rounded-[2px] border border-border bg-white px-[14px] py-[5px] text-xs text-[#555]">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Skills.astro
git commit -m "feat: add Skills component"
```

---

### Task 9: Create ProjectList Component

**Files:**
- Create: `src/components/ProjectList.astro`

- [ ] **Step 1: Create ProjectList.astro**

```astro
---
// src/components/ProjectList.astro
import { getCollection } from "astro:content";

const projects = (await getCollection("projects"))
  .filter((p) => p.data.current)
  .sort((a, b) => a.data.weight - b.data.weight);
---

<section id="work" class="px-6 py-16 lg:px-20 lg:py-20">
  <div class="mx-auto max-w-5xl">
    <p class="section-label !mb-12 lg:!mb-12">Selected Work</p>

    <div>
      {projects.map((project, i) => (
        <a
          href={`/work/${project.slug}`}
          class="group grid grid-cols-1 items-center gap-6 border-b border-border-light py-9 no-underline transition-colors hover:bg-[#f5f5f5] md:grid-cols-[1fr_2fr] md:gap-[60px]"
        >
          <!-- Left: text -->
          <div>
            <p class="mb-2 text-[11px] font-medium tracking-[1px] text-[#bbb]">
              {(i + 1).toString().padStart(2, "0")}
            </p>
            <h3 class="mb-2 text-[22px] font-[450] tracking-[-0.3px] text-text lg:text-2xl">
              {project.data.title}
            </h3>
            <p class="text-[13px] leading-[1.6] text-text-muted">
              {project.data.summary}
            </p>
            <div class="mt-3.5 flex flex-wrap gap-1.5">
              {project.data.tech.slice(0, 4).map((t: string) => (
                <span class="rounded-[3px] border border-border bg-white px-2 py-0.5 text-[10px] text-text-faint">
                  {t}
                </span>
              ))}
              {project.data.tech.length > 4 && (
                <span class="text-[10px] text-text-faint">+{project.data.tech.length - 4}</span>
              )}
            </div>
          </div>
          <!-- Right: screenshot placeholder -->
          <div class="flex h-[120px] items-center justify-center rounded-[6px] bg-[#f0f0f0] text-xs text-[#bbb] lg:h-[140px]">
            {project.data.cover ? (
              <img src={project.data.cover} alt={project.data.title} class="h-full w-full rounded-[6px] object-cover" />
            ) : (
              <span>Screenshot Preview</span>
            )}
          </div>
        </a>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ProjectList.astro
git commit -m "feat: add ProjectList component"
```

---

### Task 10: Create Timeline Component

**Files:**
- Create: `src/components/Timeline.astro`

- [ ] **Step 1: Create Timeline.astro**

```astro
---
// src/components/Timeline.astro
import timelineData from "../data/timeline.json";
---

<section class="px-6 py-16 lg:px-20 lg:py-20">
  <div class="mx-auto max-w-5xl">
    <p class="section-label !mb-14 lg:!mb-14">Experience</p>

    <!-- Desktop: vertical line timeline -->
    <div class="relative hidden lg:block">
      <!-- Vertical line -->
      <div class="absolute bottom-0 left-[256px] top-0 w-px bg-border-dark"></div>

      {timelineData.map((entry) => (
        <div class="relative mb-12 pl-[280px] last:mb-0">
          <!-- Dot: centered on the vertical line (256px - 6px = 250px) -->
          <div
            class={`absolute top-1 h-3 w-3 rounded-full ${
              entry.current
                ? "left-[250px] border-0 bg-text"
                : "left-[250px] border-2 border-border-dark bg-bg"
            }`}
          ></div>

          <!-- Year: right-aligned, sits in the left padding -->
          <p class="absolute left-0 top-0 w-[240px] text-right text-[13px] font-[450] text-[#bbb]">
            {entry.period}
          </p>

          <!-- Content -->
          <div>
            <h3 class="mb-1.5 text-[22px] font-[320] tracking-[-0.3px] text-text">
              {entry.title}
            </h3>
            <p class="mb-2.5 text-[13px] text-text-faint">{entry.company}</p>
            <p class="max-w-[500px] text-[13px] leading-[1.7] text-text-muted">
              {entry.description}
            </p>
          </div>
        </div>
      ))}
    </div>

    <!-- Mobile: simple list, no line -->
    <div class="lg:hidden">
      {timelineData.map((entry) => (
        <div class="mb-10 last:mb-0">
          <p class="mb-1 text-[13px] font-medium text-text-faint">{entry.period}</p>
          <h3 class="mb-1 text-lg font-medium text-text">{entry.title}</h3>
          <p class="mb-2 text-[13px] text-text-faint">{entry.company}</p>
          <p class="text-[13px] leading-[1.7] text-text-muted">{entry.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Timeline.astro
git commit -m "feat: add Timeline component"
```

---

### Task 11: Create About Component

**Files:**
- Create: `src/components/About.astro`

- [ ] **Step 1: Create About.astro**

```astro
---
// src/components/About.astro
import aboutData from "../data/about.json";
---

<section id="about" class="px-6 py-16 lg:px-20 lg:py-20">
  <div class="mx-auto max-w-5xl">
    <div class="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-10">
      <!-- About text -->
      <div>
        <p class="section-label !mb-4 lg:!mb-4">About</p>
        <p class="text-sm leading-[1.8] text-[#777] lg:text-sm">
          {aboutData.description}
        </p>
      </div>
      <!-- Connect -->
      <div id="contact">
        <p class="section-label !mb-4 lg:!mb-4">Connect</p>
        <div class="text-sm leading-[2.2] text-[#777]">
          <a href={aboutData.contact.github} class="text-[#777] no-underline transition-colors hover:text-text">GitHub</a><br />
          <a href={`mailto:${aboutData.contact.email}`} class="text-[#777] no-underline transition-colors hover:text-text">Email</a><br />
          <a href={aboutData.contact.blog} class="text-[#777] no-underline transition-colors hover:text-text">Blog</a>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/About.astro
git commit -m "feat: add About component"
```

---

### Task 12: Create Footer Component

**Files:**
- Create: `src/components/Footer.astro`

- [ ] **Step 1: Create Footer.astro**

```astro
---
// src/components/Footer.astro
---

<footer class="border-t border-border-light px-6 py-5 lg:px-20">
  <div class="mx-auto max-w-5xl">
    <p class="text-[11px] text-[#bbb]">&copy; 2026 Hazenix</p>
  </div>
</footer>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: add Footer component"
```

---

### Task 13: Assemble Homepage

**Files:**
- Create: `src/pages/index.astro`

- [ ] **Step 1: Create index.astro**

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
---

<Base title="Hazenix — Backend Developer & Builder">
  <Nav />
  <main>
    <Hero />
    <Skills />
    <div class="mx-auto max-w-5xl px-6 lg:px-20">
      <div class="section-divider" />
    </div>
    <ProjectList />
    <div class="mx-auto max-w-5xl px-6 lg:px-20">
      <div class="section-divider" />
    </div>
    <Timeline />
    <div class="mx-auto max-w-5xl px-6 lg:px-20">
      <div class="section-divider" />
    </div>
    <About />
  </main>
  <Footer />
</Base>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: assemble homepage with all sections"
```

---

### Task 14: Create Project Detail Page

**Files:**
- Create: `src/pages/work/[slug].astro`

- [ ] **Step 1: Create [slug].astro**

```astro
---
// src/pages/work/[slug].astro
import { getCollection } from "astro:content";
import Base from "../../layouts/Base.astro";
import Footer from "../../components/Footer.astro";

export async function getStaticPaths() {
  const projects = await getCollection("projects");
  return projects.map((p) => ({ params: { slug: p.slug } }));
}

const { slug } = Astro.params;
const projects = await getCollection("projects");
const sorted = projects.sort((a, b) => a.data.weight - b.data.weight);
const project = projects.find((p) => p.slug === slug);

if (!project) {
  return Astro.redirect("/404");
}

const currentIndex = sorted.findIndex((p) => p.slug === slug);
const prevProject = currentIndex > 0 ? sorted[currentIndex - 1] : null;
const nextProject = currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null;
const { Content } = await project.render();
---

<Base title={`${project.data.title} — Hazenix`} description={project.data.summary}>
  <!-- Top bar -->
  <div class="flex items-center justify-between border-b border-border-light px-6 py-5 lg:px-16">
    <a href="/" class="text-[13px] text-text-faint no-underline transition-colors hover:text-text">&larr; Back</a>
    <a href="/" class="text-[13px] font-medium text-text no-underline">Hazenix</a>
    {nextProject ? (
      <a href={`/work/${nextProject.slug}`} class="text-[13px] text-[#bbb] no-underline transition-colors hover:text-text">Next Project &rarr;</a>
    ) : (
      <span class="text-[13px] text-border">Next Project &rarr;</span>
    )}
  </div>

  <main>
    <!-- Cover image -->
    {project.data.cover && (
      <div class="mx-6 mt-12 lg:mx-16 lg:mt-12">
        <img
          src={project.data.cover}
          alt={project.data.title}
          class="h-[200px] w-full rounded object-cover lg:h-[280px]"
        />
      </div>
    )}

    <!-- Title block -->
    <div class="px-6 pt-10 lg:px-16 lg:pt-10">
      <p class="section-label !mb-3 lg:!mb-3">
        Project {(currentIndex + 1).toString().padStart(2, "0")}
      </p>
      <h1 class="text-[32px] font-[280] tracking-[-0.8px] text-text lg:text-[40px]">
        {project.data.title}
      </h1>
      <p class="mt-5 max-w-[600px] text-[15px] leading-[1.8] text-text-muted">
        {project.data.summary}
      </p>
      <div class="mt-6 flex gap-2.5">
        <a
          href={project.data.links.github}
          class="inline-block rounded border border-border-dark px-[14px] py-[5px] text-[11px] text-text no-underline transition-colors hover:bg-text hover:text-bg"
        >
          GitHub &rarr;
        </a>
        {project.data.links.demo && (
          <a
            href={project.data.links.demo}
            class="inline-block rounded border border-border-dark px-[14px] py-[5px] text-[11px] text-text no-underline transition-colors hover:bg-text hover:text-bg"
          >
            Live Demo &rarr;
          </a>
        )}
      </div>
    </div>

    <!-- Body: content + sidebar -->
    <div class="grid grid-cols-1 gap-8 px-6 py-12 lg:grid-cols-[2fr_1fr] lg:gap-12 lg:px-16 lg:py-12">
      <!-- Markdown content -->
      <article class="prose-custom">
        <Content />
      </article>

      <!-- Sidebar meta -->
      <aside>
        <div class="rounded border border-border-light p-6">
          <p class="mb-5 text-[11px] font-medium tracking-[2px] text-text-faint uppercase">Tech Stack</p>
          <div class="flex flex-wrap gap-x-2 gap-y-1 text-[10px] text-[#777]">
            {project.data.tech.map((t: string, i: number) => (
              <>{i > 0 && <span class="text-border">·</span>}<span>{t}</span></>
            ))}
          </div>

          <p class="mb-3 mt-7 text-[11px] font-medium tracking-[2px] text-text-faint uppercase">Role</p>
          <p class="text-xs text-[#777]">{project.data.role}</p>

          <p class="mb-3 mt-5 text-[11px] font-medium tracking-[2px] text-text-faint uppercase">Links</p>
          <a href={project.data.links.github} class="block text-xs text-[#777] no-underline transition-colors hover:text-text break-all">
            {project.data.links.github.replace("https://", "")}
          </a>
        </div>
      </aside>
    </div>

    <!-- Prev/Next nav -->
    <div class="flex items-center justify-between border-t border-border-light px-6 py-8 lg:px-16">
      {prevProject ? (
        <a href={`/work/${prevProject.slug}`} class="text-xs text-[#bbb] no-underline transition-colors hover:text-text">&larr; {prevProject.data.title}</a>
      ) : (
        <span class="text-xs text-border">&larr; Previous</span>
      )}
      {nextProject ? (
        <a href={`/work/${nextProject.slug}`} class="text-xs text-[#bbb] no-underline transition-colors hover:text-text">{nextProject.data.title} &rarr;</a>
      ) : (
        <span class="text-xs text-border">Next &rarr;</span>
      )}
    </div>
  </main>

  <Footer />
</Base>

<style>
  /* Custom prose styles for Markdown content */
  .prose-custom {
    font-size: 0.8125rem;  /* 13px */
    line-height: 1.9;
    color: #777;
  }
  .prose-custom :global(h2) {
    font-size: 0.8125rem;
    font-weight: 550;
    color: #1a1a1a;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  .prose-custom :global(h3) {
    font-size: 0.8125rem;
    font-weight: 550;
    color: #1a1a1a;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }
  .prose-custom :global(p) {
    margin-bottom: 1rem;
  }
  .prose-custom :global(ul), .prose-custom :global(ol) {
    padding-left: 1rem;
    margin-bottom: 1rem;
  }
  .prose-custom :global(li) {
    margin-bottom: 0.25rem;
  }
  .prose-custom :global(code) {
    font-size: 0.75rem;
    background: #f0f0f0;
    padding: 1px 4px;
    border-radius: 2px;
  }
  .prose-custom :global(strong) {
    color: #1a1a1a;
    font-weight: 550;
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/work/
git commit -m "feat: add project detail page"
```

---

### Task 15: Responsive Polish and Build Verification

**Files:**
- Modify: `src/components/Nav.astro` (mobile menu)
- Check: all components for responsive breakpoints

- [ ] **Step 1: Review and verify responsive classes across all components**

Check key breakpoints:
- Hero: `text-[36px]` on mobile, `lg:text-[52px]`
- Skills: 1 column mobile → 3 columns `md:grid-cols-3`
- ProjectList: stacked mobile → `md:grid-cols-[1fr_2fr]`
- Timeline: hidden on desktop (`.hidden lg:block` / `lg:hidden` for mobile)
- About: 1 col → `md:grid-cols-2`

- [ ] **Step 2: Run dev server and verify**

Run: `npx astro dev`
Expected: No build errors, site loads at localhost:4321.

Navigate to:
1. `http://localhost:4321/` — homepage renders all 6 sections
2. `http://localhost:4321/work/haze-ai-hub` — detail page renders Markdown content

- [ ] **Step 3: Run production build**

Run: `npx astro build`
Expected: Build succeeds, output in `dist/` directory.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: complete responsive polish and verify build"
```

---

### Task 16: (Optional) Deploy to GitHub Pages

- [ ] **Step 1: Install GitHub Pages integration**

Run: `npx astro add @astrojs/github --yes` (if available) or configure manually.

- [ ] **Step 2: Add GitHub Actions workflow for auto-deploy**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "chore: add GitHub Pages deploy workflow"
```
