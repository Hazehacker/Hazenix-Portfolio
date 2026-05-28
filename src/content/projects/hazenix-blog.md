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
