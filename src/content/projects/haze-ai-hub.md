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
weight: 3
current: true
---

Haze AI Hub 是一个全栈式 AI 聊天应用，支持多模态对话（文本、图片、音频）、知识库管理（RAG 检索增强生成）和智能客服功能。



## 项目亮点

- 基于 **OAuth2.0** 协议实现 GitHub/Google **第三方登录**，并构建 **SSO** 体系，实现跨系统身份共享
- 使用 **Caffeine + Redis** 构建多级缓存，缓存模型列表、分组列表等高频查询，接口响应耗时降低**400ms**
- 使用 RocketMQ 将**文档处理异步化**，解耦上传与解析，支持失败重试和弹性扩缩容，提升文档处理**吞吐量**
- 采用**工厂 + 策略模式**设计统一文件解析器架构，实现 Markdown、Word 等异构文档的解析器**动态注册**，新增文件类型只需添加新解析器，降低了代码耦合度
- RAG 检索使用了 **ReRank 重排**，配合 **问题重写**与**多轮过滤**，显著提升答案准确率

## 核心架构

- **后端**：Spring Boot 3.4.5 + Spring AI Alibaba，Maven 多模块构建
- **前端**：Vue 3 + TypeScript + Vite 6，Naive UI + Element Plus
- **数据库**：PostgreSQL（pgvector 向量扩展）+ Redis（缓存与 Stream 消息队列）
- **AI 模型**：阿里云 DashScope（通义千问、text-embedding-v3）

## 核心功能

### RAG 知识库
文件上传后经由 Redis Stream 异步解析（PDF/Word/XMind），自动分块、向量化并存入 pgvector，支持语义检索问答。解析进度通过 SSE 实时推送。

### 多模态对话
支持文本、图片、音频交互，流式响应含思考过程展示。

### 智能会话管理
首条消息触发自动创建会话，AI 自动生成标题，支持分组、置顶、软删除。
