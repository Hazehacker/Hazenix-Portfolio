# Hazenix Portfolio — Redesign Spec (2026-05-29)

## 背景

当前的 portfolio 站（实现见 [`2026-05-28-portfolio-design.md`](./2026-05-28-portfolio-design.md)）走的是「极简编辑风」—— 字号小、字重轻（220-450）、灰字偏多（#888/#999）、无强调色、无动效。从作者反馈："字体太小、没有亮点、看着很平凡"。

参考用户提供的 [GapaSea](https://gapasea.net.cn/) 和 [QClaw](https://qclaw.qq.com/) 两个站点，本次 redesign 在保留「白底 / 内容结构 / 数据架构」的前提下，重写视觉系统，目标：**信息密度不变，但每一屏都"有气场"**。

## 视觉方向

**关键词**：白底 · 编辑感 · 蓝紫氛围 · 大字标题 · 浮光氛围 · 克制动效

**气质参考**：Stripe 营销页（混合衬线 + 无衬线）+ QClaw（浮动模糊光球）+ Linear（克制 hover）+ The Browser Company（编辑感大标题）。

**与博客的呼应**：博客 `blog.hazenix.top` 用了 Playfair Display 作为大标题，本站延续这一选择，强化个人品牌一致性。

## 设计系统

### 颜色

```css
--bg:           #FAFAFA;   /* 主背景 */
--text:         #0A0A0A;   /* 主文字 */
--text-2:       #2A2A2A;   /* 次要文字（替代旧 #888/#999） */
--text-3:       #4B5563;   /* 辅助文字（仅 meta/tag 用） */
--blue:         #3B82F6;   /* 主强调（Sky Blue） */
--violet:       #8B5CF6;   /* 辅强调（仅渐变用） */
--border:       #E5E7EB;
--success:      #10B981;   /* "Available" 状态点 */
```

**关键原则**：
- 主强调色只有一个（蓝），紫色仅在渐变中出现
- 灰字下限为 `#4B5563`，禁止再用 #888/#999 这类弱化灰
- 渐变 `linear-gradient(120deg, #3B82F6 0%, #8B5CF6 100%)` 只用于「Hero 强调词、Section 标题强调词、About 引言强调词」三处文字渐变 + 主 CTA 按钮背景

### 字体

**栈**：
```css
--font-serif: 'Playfair Display', 'PingFang SC', 'Microsoft YaHei', serif;
--font-sans:  'Geist', 'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif;
```

**加载方式**：通过 `@fontsource/playfair-display`（400/500/600/700 + italic）和 `@fontsource/geist`（400/500/600/700）。中文继续走系统字体（PingFang SC 优先），不下载中文 Web Font。

**字号阶梯**（桌面 ≥1024px，移动断点见末尾响应章节）：

| 用途 | 大小 | 字重 | 字族 | 字间距 | 行高 |
|---|---|---|---|---|---|
| Hero 主标题 | **104px** | 700 | serif | -3.5px | 1.02 |
| Section 标题（Skills / About） | 72px | 600 | serif | -1.8px | 1.05 |
| Section 标题（Projects / Timeline） | 60px | 600 | serif | -1.4px | 1.05 |
| Skills 分类标题 | 48px | 600 | serif | -0.8px | 1.1 |
| Project 序号 | 80px (italic) | 500 | serif | normal | 1 |
| Project 标题 | 40px | 600 | serif | -0.6px | 1.1 |
| About 引言 | 36px | 400 | serif | -0.5px | 1.4 |
| Timeline 标题 | 28px | 600 | serif | -0.3px | 1.2 |
| Logo | 28px | 700 | serif | -0.5px | 1 |
| Hero Lead | 21px | 450 | sans | normal | 1.65 |
| Section 正文 | 16-17px | 450 | sans | normal | 1.65-1.7 |
| Nav 链接 | 16px | 500 | sans | normal | 1 |
| Contact 链接 | 17px | 500 | sans | normal | 1 |
| Skills Pill | 15px | 500 | sans | normal | 1 |
| Project Tech tag | 12px | 500 | sans | normal | 1 |
| Eyebrow（小标签） | 14px | 700 | sans | 3px / uppercase | 1 |
| 数字 / 元信息 | 13-14px | 500-600 | sans | normal | 1 |
| Footer | 15px | 400 | sans | normal | 1 |

**强调词处理**：所有衬线标题中的强调词（如 "reliable, scalable" / "craft" / "built" / "journey"）使用 `font-style: italic; font-weight: 500-600; background-clip: text` 蓝紫渐变。

### 间距与容器

- 容器最大宽度：**1280px**，左右 padding 44px
- Hero section padding：`180px 0 150px`
- 一般 section padding：`140px 0`
- Project 区块自带浅色背景（`rgba(255,255,255,.5)`），上下 padding `150px 0`
- Nav padding：`24px 44px`
- 区块内大间距 80px，中间距 60-70px，小间距 32-44px

### 圆角

- 按钮：8-9px
- Pill：7-8px
- Tech tag：5px
- 卡片：12-18px
- Status pill：999px（胶囊）

### 动效语言

#### 1. 全局浮动光球（核心氛围）

3 个 `position: fixed` 模糊球，整页贯穿（非仅 Hero）：

```css
.orb       { position:fixed; border-radius:50%; filter:blur(60px); pointer-events:none; z-index:0; will-change:transform; }
.orb-blue  { width:600px; height:600px; background:radial-gradient(circle, rgba(77,163,255,.42) 0%, transparent 70%); top:-150px; right:-120px; animation:f1 14s ease-in-out infinite; }
.orb-violet{ width:520px; height:520px; background:radial-gradient(circle, rgba(120,90,255,.32) 0%, transparent 70%); top:35%; left:-180px; animation:f2 16s ease-in-out infinite; }
.orb-blue-2{ width:440px; height:440px; background:radial-gradient(circle, rgba(77,163,255,.28) 0%, transparent 70%); bottom:-120px; right:8%; animation:f3 18s ease-in-out infinite; }

@keyframes f1 { 0%,100%{ transform:translate(0,0) scale(1); } 33%{ transform:translate(-200px,140px) scale(1.15); } 66%{ transform:translate(80px,260px) scale(.95); } }
@keyframes f2 { 0%,100%{ transform:translate(0,0) scale(1); } 33%{ transform:translate(220px,-120px) scale(1.1); } 66%{ transform:translate(-60px,180px) scale(.9); } }
@keyframes f3 { 0%,100%{ transform:translate(0,0) scale(1); } 33%{ transform:translate(-180px,-100px) scale(1.2); } 66%{ transform:translate(100px,-220px) scale(.95); } }
```

注意：所有页面内容需 `position: relative; z-index: 2` 以浮在光球之上。

**降级**：通过 `@media (prefers-reduced-motion: reduce)` 关闭 keyframes，光球只显示静态位置。

#### 2. 滚动入场（scroll reveal）

元素首次进入视口：`opacity: 0 → 1` + `translateY(24px) → 0`，`transition: 0.7s cubic-bezier(.4, 0, .2, 1)`。

实现：用 IntersectionObserver + 添加 `.is-visible` 类。封装为 `<RevealOnScroll />` 客户端组件（Astro 的 `client:load` 或纯 vanilla JS 脚本）。

#### 3. Hover 微交互

| 元素 | 效果 | 数值 |
|---|---|---|
| 主按钮 | 上浮 + 加深阴影 | `translateY(-2px)`; shadow `0 12px 32px rgba(59,130,246,.38)` |
| 鬼影按钮 | 下划线变蓝 | color/border-color → `--blue` |
| Pill | 蓝边 + 浅蓝字 + 微浮 + 蓝色淡阴影 | `translateY(-1px)`; shadow `0 4px 12px rgba(59,130,246,.12)` |
| 项目行 | 整行右移 + 图升 + 标题变蓝 | row `translateX(6px)`; image `translateY(-4px)` + shadow `0 16px 48px rgba(59,130,246,.2)` |
| Contact 链接 | 文字变蓝 | color → `--blue` |
| Nav 链接 | 文字变蓝 | color → `--blue` |
| 联系卡片 | 不动 | （卡片本身不 hover；其内部链接 hover） |

**统一缓动**：`cubic-bezier(.4, 0, .2, 1)`，时长 0.2-0.35s。

## 页面结构

### 首页 `src/pages/index.astro`

从上到下 7 个 section（顺序不变，视觉重写）：

1. **Nav**（粘性顶部，半透明 + backdrop-blur）
2. **Hero**
3. **Skills**
4. **Projects**（带浅色背景）
5. **Timeline**
6. **About + Contact**（2 列）
7. **Footer**

### Nav

- `position: sticky; top: 0`
- 背景 `rgba(250,250,250,.78)` + `backdrop-filter: blur(14px)`
- 底边 `1px solid rgba(0,0,0,.04)`
- 左 Logo：`Hazenix.` 衬线，句号是蓝色（`em.font-style: italic; color: var(--blue)`）
- 右 4 个链接：Work / About / Contact / **Blog ↗**（指向 `blog.hazenix.top`，加 ↗ 表示外链）
- 移动端汉堡保留现有实现

### Hero

```
[● Available for new opportunities · 2026]   <- status pill
─── HAZENIX · BACKEND DEVELOPER             <- eyebrow

I build systems that are reliable, scalable,  <- 104px 衬线
and beautifully simple.

专注后端工程与 AI 应用开发 ——               <- 21px sans 正文
把复杂的系统设计成可读、可维护、可演进的形态。

[查看作品 →]  [联系我]                        <- 主 CTA + 鬼影
```

- "reliable, scalable" 使用蓝紫渐变 + 斜体
- Status pill：白底 + border + 绿点（`#10B981` + 4px 光圈）
- 主按钮：`linear-gradient(135deg, var(--blue), #6366F1)` 渐变背景，白字
- 顶部 padding 180px 给浮光足够空间

### Skills

```
─── WHAT I WORK WITH

Tools of the craft.                          <- 72px 衬线，"craft" 蓝色斜体

Backend          AI & Data         Frontend  <- 48px 衬线，"AI" 斜体蓝色
[Java][Spring]   [RAG][LLM]        [Vue 3]
[Boot]...        ...                [TS]...
```

- 3 列网格，gap 72px
- 列标题 48px 衬线 600
- Pill：白底 + `1px solid var(--border)` + 圆角 8px + padding 10px 18px + 15px sans 500
- Pill hover：边变蓝 + 字变蓝 + `translateY(-1px)` + 淡蓝阴影

### Projects

```
─── SELECTED WORK

Things I've built.                           <- 60px 衬线，"built" 蓝色斜体

┌────────────────────────────────────────────────────────────┐
│ 01    Hazenix Blog                       [Screenshot 16/10]│
│       个人技术博客系统 —— SSR 全栈自研...                  │
│       [Nuxt 3] [Nest.js] [PostgreSQL] [+2]                 │
└────────────────────────────────────────────────────────────┘
... 同样的 02 / 03 / 04
```

- 每行 grid：`100px 1fr 1.4fr`，gap 44px，padding `56px 0`
- 左：序号 `01-04`，Playfair italic 80px 蓝色 opacity .75
- 中：项目标题 40px 衬线 + 16px 描述 + tech tags
- 右：封面图，aspect-ratio 16/10，圆角 12px
- 行间用 `1px solid var(--border)` 分隔
- Hover：整行 `translateX(6px)`、图 `translateY(-4px)` + 蓝色淡阴影、标题颜色 → 蓝
- 整 section 浅色背景 `rgba(255,255,255,.5)`，与其他 section 形成微弱区分

**项目顺序**（通过每个 `.md` 的 `weight` 字段）：

1. Hazenix Blog（weight: 1）
2. Interview Simulators（weight: 2）
3. Haze AI Hub（weight: 3）
4. GapaSea Marketing（weight: 4）

### Timeline

```
─── EXPERIENCE

The journey so far.                          <- 60px 衬线，"journey" 蓝色斜体

2024 — Present     ●    Backend Developer
                        XXX Company           <- 蓝色公司名
                        核心业务系统架构...

2022 — 2024        ○    Junior Backend ...
                        ...
```

- 左 200px 是年份（14px sans 600）右对齐
- 右侧内容：标题 28px 衬线 + 公司 15px sans 蓝色 + 描述 15px sans
- 中间是 1px 垂直线 + 12-14px 圆点
- 当前职位：蓝色实心点 + 5px `rgba(59,130,246,.2)` 光圈
- 过去：白底 + 2px `#D1D5DB` 描边

### About + Contact

```
─── ABOUT

我是一名后端工程师，                          <- 36px 衬线
相信系统的优雅来自对边界的清晰认知。           <- "系统的优雅" 蓝色斜体
喜欢把抽象的算法变成稳定运行的产品...

业余写技术博客 · 喜欢摄影 · 跑步 ...          <- 16px sans 元信息

                              ┌──────────────────┐
                              │ GET IN TOUCH     │ <- contact 卡片
                              │ GitHub  ↗ @...   │
                              │ Email   ↗ @...   │
                              │ Blog    ↗ blog.. │
                              └──────────────────┘
```

- 2 列网格 `1.4fr 1fr`，gap 88px
- 左：About 衬线大引言（36px）+ 元信息 16px sans
- 右：白底卡片 1px border + 圆角 18px + padding 36px
- 卡片标题：12px sans 700 蓝色 uppercase
- 链接：17px sans 500，右侧 `↗ @xxx` 元信息 14px 灰

### Footer

```
© 2026 Hazenix. Crafted with care.            ↑ Back to top
```

- 顶部 1px border
- 左：版权信息 15px sans 灰
- 右：回顶部链接（hover 变蓝）

## 项目详情页 `src/pages/work/[slug].astro`

保留现有结构（顶栏 · 大封面 · 标题区 · 双栏正文+meta · 上下篇导航），仅做视觉对齐：

- 替换字体为 Playfair（标题）+ Geist（正文 + meta）
- 蓝色作强调色：tech meta、链接、当前项目指示
- 浮动光球在详情页也开启（保持一致）
- 大标题 64-72px，副描述 21px
- meta 侧栏 label 用蓝色 eyebrow 风格

## 数据架构（不变）

仍然使用 Astro Content Collections + JSON 文件，编辑流程不变。

- `src/content/projects/*.md` — 每个项目一个 md，frontmatter 含 title/role/summary/cover/tech/links/weight/current
- `src/data/timeline.json`
- `src/data/skills.json`
- `src/data/about.json`

需要做的数据调整：

1. **Projects weight 重排**：blog=1, interview-sim=2, ai-hub=3, gapasea=4
2. **about.json**：description 可以微调，让正文更贴合 Hero "把复杂的系统设计成可读、可维护、可演进的形态" 的调性（可选，与作者再确认）
3. 其他字段保持

## 技术实现要点

### 文件级别变更

```
src/
├── styles/global.css         # 全部重写（CSS variables + 字体 import + .orb 动效 + .eyebrow / .section-title 工具类）
├── layouts/Base.astro        # 在 body 内挂 3 个 <div class="orb"/>；加 .page 包裹主内容
├── components/
│   ├── Nav.astro             # Logo 改 Playfair "Hazenix."；增加 Blog ↗ 链接；样式重写
│   ├── Hero.astro            # 重写：加 status pill，字号字重字距全调整
│   ├── Skills.astro          # 重写：column h3 改大，pill hover 加蓝
│   ├── ProjectList.astro     # 重写：3 列 grid + 大序号 + hover translateX
│   ├── Timeline.astro        # 重写：dot/line 样式 + 标题字号
│   ├── About.astro           # 重写：大衬线引言 + Contact 卡片提取
│   ├── ContactCard.astro     # 新增（从 About 拆出）
│   ├── Footer.astro          # 微调：加 Back to top
│   └── RevealOnScroll.astro  # 新增：IntersectionObserver 客户端脚本，给子元素加 .is-visible
├── pages/
│   ├── index.astro           # 用新组件 + 包浮光层
│   └── work/[slug].astro     # 样式对齐：字体、颜色、浮光
```

### 依赖

- 新增 `@fontsource/playfair-display`（含 italic）
- 新增 `@fontsource/geist`（如不可用，回退到 `@fontsource-variable/geist` 或直接用 Google Fonts CDN `<link>`）
- 移除 `@fontsource/inter`（不再使用）

### Tailwind 配置

`tailwind.config.mjs` 加入：

```js
theme: {
  extend: {
    fontFamily: {
      serif: ['Playfair Display', 'PingFang SC', 'serif'],
      sans:  ['Geist', 'PingFang SC', 'system-ui', 'sans-serif'],
    },
    colors: {
      blue:   { DEFAULT: '#3B82F6' },
      violet: { DEFAULT: '#8B5CF6' },
    },
  },
}
```

或继续用 CSS variables + `@theme` 配置（与现有 global.css 风格一致）。

### 响应式

桌面 ≥ 1024px：表格中的字号
平板 768-1023px：字号 ×0.82
移动 < 768px：字号 ×0.62，3 列布局降级为 1 列，Timeline 失去垂直线变左对齐列表

具体断点处理：
- Hero h1：`clamp(48px, 9vw, 104px)`
- Section 标题：`clamp(36px, 6vw, 72px)`
- About 引言：`clamp(22px, 3.4vw, 36px)`
- 其他元素按比例

### 性能

- 浮光 keyframes 使用 `transform` + `will-change: transform`，触发 compositor 层，60fps
- IntersectionObserver 只在首次显示时 observe，显示后 unobserve
- 字体加载使用 `font-display: swap`
- 图片继续 `loading="lazy"`
- 整页 JS 仅有"汉堡菜单"和 "RevealOnScroll" 两个轻量 vanilla 脚本

### 可访问性

- `prefers-reduced-motion: reduce` 时：禁用浮光 keyframes、禁用滚动 reveal（直接显示）、禁用 hover translate（保留颜色变化）
- 所有交互元素保留 `focus-visible` 蓝色描边
- 衬线大标题正常 contrast 足够（黑字白底）
- 渐变文字在 `forced-colors` 模式下回退为纯蓝色

## 内容/微文案

部分新增的英文 micro-copy（可改可不改）：

- Hero status：`Available for new opportunities · 2026`
- Hero eyebrow：`Hazenix · Backend Developer`
- Skills eyebrow：`What I work with`
- Skills 标题：`Tools of the craft.`
- Projects eyebrow：`Selected work`
- Projects 标题：`Things I've built.`
- Timeline eyebrow：`Experience`
- Timeline 标题：`The journey so far.`
- About eyebrow：`About`
- Contact 卡片 label：`Get in touch`
- Footer：`© 2026 Hazenix. Crafted with care.` + `↑ Back to top`

这些文案落地后可以快速 A/B 调整，不算硬约束。

## 验收清单

实现完成时，以下都应当被满足：

- [ ] 桌面打开首页，3 个浮光球缓慢可见漂浮
- [ ] Hero "reliable, scalable" 是蓝紫渐变 + 斜体
- [ ] Hero 字号在 1440px 屏上接近 104px
- [ ] 没有任何 `#888` / `#999` 灰字（搜索代码确认）
- [ ] 鼠标悬停项目行，整行右移 + 封面图升起 + 标题变蓝
- [ ] Skills 三栏 "Tools of the craft." / "AI" 是斜体蓝色
- [ ] Timeline 当前职位的点是蓝色实心 + 光圈
- [ ] About 引言是 36px Playfair + "系统的优雅" 蓝色斜体
- [ ] Contact 是白底卡片，链接 hover 变蓝
- [ ] Footer 有 ↑ Back to top 链接
- [ ] 项目顺序：Blog → Interview Sim → AI Hub → GapaSea
- [ ] Nav 有 Blog ↗ 外链
- [ ] 移动端布局正确降级（光球减小不溢出、3 列变 1 列、字号缩放）
- [ ] `prefers-reduced-motion` 时动效全部禁用，页面仍可读
- [ ] Lighthouse Performance ≥ 90、Accessibility ≥ 95

## 不在本次范围

- 中文 Web Font 加载（保持系统字体）
- 暗色模式（本次只做亮色，后续可加）
- 国际化（保留中英混排，不做语言切换）
- 项目详情页内容更新（只调整视觉，正文 Markdown 不动）
- Blog 站点（独立项目，本次不动）
- SEO 元数据（保持现有）
