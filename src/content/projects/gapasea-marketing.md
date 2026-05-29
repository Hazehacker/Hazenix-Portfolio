---
title: "GapaSea Marketing Platform"
role: "Backend Developer (Internship)"
summary: "智能运动眼镜初创公司营销中台 — KOC 免费样品营销全链路系统，含 AI 审核流水线与多服务架构"
tech:
  - "Spring Boot 3.2"
  - "Vue 3"
  - "MySQL"
  - "Redis"
  - "RabbitMQ"
  - "Elasticsearch"
  - "Docker"
  - "RAG"
  - "OCR"
links:
  github: "https://github.com/Hazehacker/second-GapaSea"
  demo: ""
weight: 4
current: true
---

北京浪人科技有限公司（GapaSea）实习期间主导开发的智能运动眼镜营销中台，覆盖从小红书 KOC 样品申请、AI 自动审核、履约配送到内容数据追踪的完整营销闭环。

## 核心系统

### 营销中台 API（gapasea-marketing-api）

Spring Boot 3.2 后端，承载免费样品营销全链路业务：

- **样品申请与审核**：支持微信小程序 + H5 双通道用户认证，完整的申请状态流转（待审核 → 通过/拒绝 → 待确认 → 履约 → 已完成）
- **AI 审核流水线**：基于 RabbitMQ 的多阶段异步审核 — 截图 OCR 识别 → 小红书主页内容扫描 → AI 模型评分，死信队列兜底失败消息
- **Coach 分销管理体系**：分销员招募、审核、层级管理
- **拼团系统**：组队邀请 + 自动审核 + 状态更新
- **履约管理**：发货单创建与物流跟踪
- **XHS Insight 子系统**：独立的小红书关键词分析、笔记搜索、评论抓取、作者画像分类，SQLite 独立存储
- **审计日志**：从业务耦合代码重构为通用 AOP 审计框架
- **数据可视化后台**：KOL 达人库、工单库、内容库、视频快照、广告数据多维看板

### BFF 层（gapaseayz）

部署于有赞云平台，作为微信小程序与后端之间的聚合层：
- 6 维业务状态 → 7 种 UI 展示状态的状态映射引擎
- Redis 分布式锁防重复提交，有赞订单失败自动取消
- AK/SK 签名鉴权

### 日志服务器（gapasea-log-server）

独立部署的数据基础设施服务：
- 接收全系统日志与用户行为事件，经 RabbitMQ 异步管道批量写入 Elasticsearch
- 漏斗分析服务 — 基于 ES 聚合查询的多步转化率计算
- 按日分片索引，TTL 死信兜底

### 管理后台（gapasea-marketing-frontend）

Vue 3 + Vite 6 + Element Plus SPA：
- 20+ 路由页面，JWT 认证 + 路由鉴权
- ECharts 数据可视化仪表盘
- H5 降级版面向无微信小程序的用户

## 技术架构

```
微信小程序 → gapaseayz (有赞云 BFF)
                  ↓ HTTP
           gapasea-marketing-api (业务中台)
                  ↓ RabbitMQ
           gapasea-log-server (ES 日志)
                  
管理后台 SPA → gapasea-marketing-api
官网 (静态) → Nginx 独立部署
```

## 企业官网

独立开发的静态企业站点，纯 HTML/CSS/JS + 轻量 Node.js 构建脚本。AI 时代炫酷视觉风格：全屏极光 mesh 渐变背景、鼠标跟随光斑、3D Tilt 产品卡片、conic-gradient 锥光描边。
