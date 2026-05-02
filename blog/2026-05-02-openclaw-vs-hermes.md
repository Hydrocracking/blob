---
slug: openclaw-vs-hermes
title: OpenClaw vs Hermes：两大 Agent 框架深度对比
authors:
  - name: Hydrocracking
    title: Author
    url: https://github.com/Hydrocracking
    imageURL: https://github.com/Hydrocracking.png
date: 2026-05-02
tags: [AI, Agent, OpenClaw, Hermes, 技术对比]
---

> 本文由 AI（GLM-5.1）根据原文提炼总结，原文来自微信公众号"叶小钗"。

原文链接：[《【万字】OpenClaw vs Hermes：一文深入拆解两大 Agent 框架》](https://mp.weixin.qq.com/s/wPuKUlajb6IaIL3uH7gSAA)

---

## 背景

2026 年 AI 界有两件大事：

1. **OpenClaw 爆火** — 为 Agent 普及做了巨大贡献，奠定了"Agent 驱动 Skills"的基础交付范式
2. **Claude Code 源码泄露** — 为 Agent 创业团队提供了大量优质范本

两大框架各有所长，本文从工程角度深度对比 8 个核心维度。

<!-- truncate -->

## 一、学习闭环（核心差异起点）

| | OpenClaw | Hermes |
| -- | -- | -- |
| 核心问题 | 怎么让 Agent 安全可靠执行任务 | Agent 怎么才能越来越强 |
| 技能创建 | 人工编写，Agent 不能自建 | Agent 自动提取，写成 Markdown 文件 |
| 进化方式 | 靠人维护 + 经验反馈回填 | 全靠 prompt 引导判断，无硬编码触发 |

**结论：** Hermes 更适合"越用越聪明"的个人场景，OpenClaw 更适合需要严格流程的企业场景。

## 二、记忆系统

| | OpenClaw | Hermes |
| -- | -- | -- |
| 设计 | 单一可替换插件 | 三层：内置 + 外部 Provider + 会话搜索 |
| 写入 | 通过工具调用落盘 | 分 MEMORY.md / USER.md，有容量限制 |
| 读取 | 会话启动时快照注入 | session_search 按需检索，辅助模型做摘要压缩 |

**关键差异：** OpenClaw 搜到啥直接给主模型判断；Hermes 加了一层 LLM 摘要过滤，上下文更干净但多一次调用。

## 三、上下文压缩

| | OpenClaw | Hermes |
| -- | -- | -- |
| 策略 | 压头部（最老轮次），保留最近 | 压中间，保护两端（head + tail） |
| 归档 | 有快照归档，信息可回溯 | 迭代摘要，无原始数据存档 |

**选哪个：** 高频调用/成本敏感 → OpenClaw；深度推理/信息不能丢 → Hermes

## 四、技能系统

| | OpenClaw | Hermes |
| -- | -- | -- |
| 创建 | 人工/开发者编写 | Agent 自动提取 |
| 更新 | 人工维护 | Agent 自主判断 |
| 存储 | 结构化定义 | Markdown 文件 |

OpenClaw 的 Skills 库极其丰富，但 Agent 不会自建。Hermes 的 skill 完全是"经验沉淀"的产物，更灵活但需要管控。

## 五、执行环境

| | OpenClaw | Hermes |
| -- | -- | -- |
| 后端数量 | 3 种（本地/Docker/SSH） | 6 种（Daytona/Modal/本地等） |
| 设计理念 | 安全优先，多层审批+沙箱+审计 | 环境可切换，轻量灵活 |

## 六、安全

**OpenClaw：** 默认安全，10+ 安全审计模块，危险命令白名单，多层审批。原则：**高权限需显式声明**

**Hermes：** 智能审批（用便宜辅助模型判断风险，低风险自动过）。问题：辅助模型判断错了怎么办，源码里没看到二次校验。

## 七、国内生态

| | OpenClaw | Hermes |
| -- | -- | -- |
| 飞书/钉钉/企微/个人微信 | ❌（只有飞书和 QQ 扩展） | ✅ 原生支持 |
| 模型集成 | Provider Plugin 路线 | models.dev 集成 4000+ 模型 |
| 离线快照 | ❌ | ✅ 支持 |

## 八、如何选择

```
安全合规是硬要求          → OpenClaw
想让 Agent 自己学习改进    → Hermes
飞书/钉钉/企微都要        → Hermes
做 RL 研究                → Hermes
Python 技术栈              → Hermes
TypeScript 技术栈          → OpenClaw
低成本 24 小时跑          → Hermes 无服务器后端更合适
```

**一句话总结：** Hermes 迎合小白用户，OpenClaw 做生产级平台。两个框架不是非此即彼，甚至可以共存——Hermes 提供了 `hermes claw migrate` 一键迁移命令。

## 3条可复用知识

1. **Agent 自进化 = 经验沉淀成 Skill** — 不是靠数据飞轮，而是把"做事方法"固化下来
2. **上下文压缩策略决定记忆质量** — 压头部适合高频短任务，压中间适合长推理
3. **执行环境可插拔** — 把执行后端做成可配置项，而不是写死在代码里，是正确的架构思路
