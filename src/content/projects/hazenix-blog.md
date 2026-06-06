---
cover: "/hazenix-blog.png"
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
weight: 1
current: true
---

现代化的全栈个人博客系统，前后端分离架构。

## 项目亮点

- **混合推荐引擎**：融合基于内容（Jaccard 相似度 + 分类加成）、协同过滤（余弦相似度）与热度衰减（指数时间衰减）三种策略，通过 Redis ZSet 缓存推荐结果，结合 `@Async` 异步刷新与 `@Scheduled` 凌晨定时预热，覆盖用户冷启动与热启动场景，实现文章个性化推荐
- **多 OAuth2.0 统一认证**：基于 Spring Security + JWT 构建无状态认证体系，集成 Google、GitHub、微信第三方登录，通过 Redis 黑名单机制实现 Token 主动失效与安全登出
- **Redis 缓存策略**：基于 Spring Cache + Redis 构建文章与推荐缓存体系，对热点文章、推荐结果、相似度矩阵分别实施差异化 TTL（30min / 1h / 24h），结合 `@CacheEvict` 在内容变更时精准淘汰，配合 Druid 连接池批量写入优化，有效降低数据库查询压力
- **动态邮件通知微系统**：基于 `ThreadPoolTaskScheduler` 实现可配置发送时间的动态定时调度，结合 Thymeleaf 模板渲染 HTML 通知邮件，`@Async` 异步推送新文章订阅通知与每日评论摘要，内嵌 ActionToken 实现一键退订与友链审批闭环
- **AOP 切面自动填充**：自定义 `@AutoFill` 注解 + AspectJ 切面，通过反射自动填充实体类 `createTime` / `updateTime`，消除业务层样板代码；基于 `ConcurrentHashMap` 滑动窗口实现 IP 级别评论频率限制（6次/60s），无外部中间件依赖

## 核心功能

- **文章管理**：Markdown 编辑、分类、标签、置顶
- **多级评论**：树形展示、点赞互动
- **用户系统**：手机号/邮箱注册，Google/GitHub/微信 OAuth 登录
- **全站搜索**：文章全文检索与标签筛选
- **AI 摘要**：文章 AI 自动摘要生成
- **树洞功能**：匿名留言互动

## 技术架构

- **后端**：Spring Boot 2.7.3 + MyBatis Plus + Spring Security + JWT
- **前端**：Vue 3 + Vite + Pinia + Element Plus + Tailwind CSS
- **存储**：MySQL 8.0 + Redis + 阿里云 OSS
