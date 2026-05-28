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
