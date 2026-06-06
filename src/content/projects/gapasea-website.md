---
cover: "/gapasea-website.png"
title: "GapaSea Official Site"
role: "Frontend Developer (Internship)"
summary: "智能运动眼镜品牌官网，玻璃拟态卡片、3D Tilt 交互与锥光旋转描边"
tech:
  - "HTML/CSS"
  - "JavaScript"
  - "Node.js"
  - "Nginx"
  - "CSS 3D"
  - "Responsive"
links:
  github: "https://github.com/Hazehacker/second-GapaSea"
  demo: "https://gapasea.net.cn/"
weight: 5
current: true
---

北京浪人科技有限公司（GapaSea）实习期间独立开发的品牌官网，纯静态多页站点，零运行时依赖。

## 视觉设计

- **玻璃拟态卡片**：backdrop-filter blur + 半透明背景，贯穿全站的质感语言
- **锥光旋转描边**：产品卡与弹层的 conic-gradient 动态边框，配合 CSS 动画持续旋转
- **3D Tilt 交互**：CSS perspective + rotateX/Y 实现随鼠标倾斜的立体卡片，子元素 translateZ 分层
- **品牌动效体系**：Hero 逐字 3D 翻转入场、渐变流光文字、滚动跑马灯、鼠标跟随光斑
- **暗色主题**：深邃黑底 (#05060a) + 粉紫青绿四色点缀，网格纹理 + 噪点叠加

## 技术实现

- **构建系统**：自定义 30 行 Node.js 构建脚本，支持 HTML partials 拼接、frontmatter 变量注入、静态资源拷贝
- **页面结构**：首页（Hero + 产品展示 + 场景 Tab 切换 + 品牌理念 + 行业资讯）、资讯列表、资讯详情（¥1 付费拦截 + 微信/支付宝 QR 弹窗）、联系我们、404
- **交互细节**：IntersectionObserver 滚动唤起、Tab 平滑切换、产品卡 parallax、prefers-reduced-motion 无障碍适配
- **部署架构**：产出纯静态 dist/ 目录，Nginx 反向代理，零运行时依赖
