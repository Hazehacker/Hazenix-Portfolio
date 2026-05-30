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
  github:
    - "https://github.com/Hazehacker/java-backend-interview-simulator"
    - "https://github.com/Hazehacker/ai-dev-interview-simulator"
  demo: ""
weight: 2
current: true
---



使用自然语言与 AI 面试官互动，模拟真实中国大厂（字节、腾讯、阿里、美团、快手）技术面试（覆盖 Java 后端和 AI 应用开发两方向）。支持按求职者身份和面试官风格定制，全程记录状态并输出结构化评估报告。

## 核心特性

**多身份模拟** — 针对不同阶段候选人设计差异化问题：日常实习、暑期实习、校招（应届）、社招 1-3 年。难度和追问深度随身份自动调整。

**六种面试官风格** — 从"严厉拷打"到"温和鼓励"，从"工程实践"到"深挖学术"，覆盖不同偏好。同一场面试，不同体验。

**实时状态跟踪** — 面试全程维护结构化状态（已考察点、候选人弱点、待跟进项），避免重复提问，确保评估连贯。

**高频技术题库** — 基于 JavaGuide 整理，覆盖并发编程、JVM、MySQL、Redis、Spring、分布式系统等大厂常考方向，新增非共享内存并发模型（Actor、Lock-free、MQ）。

**深度追问链** — 简历关键词（CAS、volatile、多级缓存、RAG 等 14 个高频技术点）自动触发 3-5 层追问链，逼近底层原理与权衡，避免"听过名词"式过关。

**完整评估反馈** — 面试结束后输出综合评分、各维度评分及风格化改进建议，新增"追问深度"评估维度，反馈措辞随面试官风格变化。

**简历与 JD 支持** — 提供简历和目标岗位 JD 可获得定制化问题，简历关键词自动预生成追问链，面试后输出 JD 匹配度分析。

**编码题** — 可选环节，面试末尾安排并发编程、设计模式、数据库等手写代码题，难度随身份调整。

**AI 辅助开发考察** — 当候选人展示 AI 编程工具使用经验时，自动深入提问 Agent Loop、上下文管理、Spring Boot AI 辅助、RAG 量化验证等方向。

**纠错模式可选** — 面试开始前可选"严格模式"（真实面试压力，连续两次错误才纠正）或"即时引导模式"（答错立即纠正，边面边学）。

### 触发面试

安装完成后，在对话中直接表达面试意图即可：

```
开始一场模拟面试
我是应届生，想练习 Java 后端面试，温和鼓励型
帮我准备字节后端实习面试
```

系统会依次确认：求职者身份、面试时长（30 / 40 / 45 / 60 分钟）、面试官风格、是否提供简历、是否包含编码题、纠错模式（严格/即时引导）。

### 语音输入（强烈推荐）

文字输入面试问题太慢，**用语音模拟才接近真实面试节奏**：

| 你在哪里聊天               | 语音方式                                 |
| -------------------------- | ---------------------------------------- |
| Windows 电脑（任何输入框） | **Win + H** 系统语音转文字               |
| Mac（任何输入框）          | **Fn + Fn** 双击启动语音输入             |
| 微信 / QQ                  | 长按已发送的语音消息 → "转文字" 后再发   |
| 企业微信 / 飞书            | 直接发送语音消息（远程接入支持自动转写） |

---

## 项目结构

```
java-backend-interview-simulator/
├── SKILL.md                        # 技能主文件（OpenClaw skill 格式）
├── README.md                       # 本文档
├── references/
│   ├── tech-knowledge-base.md      # 技术知识库（高频面试题与答案要点）
│   ├── evaluation-rubric.md        # 评分细则与分人群反馈模板（含 JD 匹配分析）
│   ├── interviewer-styles.md        # 六种面试官风格详解
│   ├── coding-challenges.md        # 手写编码题库（可选环节）
│   ├── ai-dev-knowledge-base.md   # AI 应用开发知识库（Agent Loop/上下文管理，可选扩展）
│   └── ai-dev-tools-knowledge-base.md # AI 辅助后端开发知识库（Spring Boot/数据库/API，可选扩展）
└── LICENSE
```

```
ai-dev-interview-simulator/
├── SKILL.md                            # 技能主文件（OpenClaw skill 格式）
├── README.md                           # 本文档
├── references/
│   ├── tech-knowledge-base.md          # 技术知识库（高频面试题与答案要点）
│   ├── evaluation-rubric.md           # 评分细则与分人群反馈模板（含 JD 匹配分析）
│   ├── interviewer-styles.md           # 六种面试官风格详解
│   ├── coding-challenges.md           # 实操编码题库（可选环节）
│   ├── ai-dev-knowledge-base.md       # AI 应用开发知识库（LLM/Agent/RAG/MCP，可选扩展）
│   └── ai-dev-tools-knowledge-base.md # AI 编程工具知识库（可选项）
└── LICENSE
```

---

## 技术架构

本项目基于 **OpenClaw Skill 框架**构建，采用三层加载架构：

| 层级         | 文件                   | 作用                                                         |
| ------------ | ---------------------- | ------------------------------------------------------------ |
| **元数据**   | `SKILL.md` frontmatter | 触发条件与能力概述，始终加载                                 |
| **主体逻辑** | `SKILL.md` body        | 面试流程、风格适配、状态跟踪规则                             |
| **知识库**   | `references/*.md`      | 按需加载：技术题库、评分标准、风格指南、手撕题库、AI 应用开发知识库、AI 辅助后端开发知识库等 |

(面试流程采用**有限状态机**思路：破冰 → 项目深挖 → 技术考察 → AI 能力（可选）→ 编码题（可选）→ 总结反馈，各阶段时长和深度由身份和剩余时间共同决定。

---

## Java Backend Interview Simulator

模拟真实中国大厂 Java 后端技术面试

> 地址：https://github.com/Hazehacker/java-backend-interview-simulator

## AI Dev Interview Simulator

专注于 Agent、RAG、大模型应用开发等 AI 新兴领域的面试模拟。实操编码题聚焦 Prompt 设计、ReAct 实现、MCP Server 设计等场景。

> 地址：https://github.com/Hazehacker/ai-dev-interview-simulator







