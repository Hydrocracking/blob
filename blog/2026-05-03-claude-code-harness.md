---
slug: claude-code-harness
title: 7张图搞懂Claude Code的Harness架构设计
authors:
  - name: Hydrocracking
    title: Author
    url: https://github.com/Hydrocracking
    imageURL: https://github.com/Hydrocracking.png
date: 2026-05-03
tags: [AI, Agent, Claude Code, Harness, 架构设计]
---

> 本文由 AI（GLM-5.1）根据原文提炼总结，原文来自微信公众号"诗与沅方"。

原文链接：[《7张图搞懂Claude Code的Harness架构设计》](https://mp.weixin.qq.com/s/MsWfAil7l8388WmYrdvXyw)

---

## 背景

Claude Code 源码泄露，全球狂欢学习。这套 AI Agent 架构设计比 OpenClaw 成熟许多。

Claude Code 不仅仅是 Coding 产品，更是一个**通用的终端 Agent**：能循环思考、调度工具、治理权限、恢复上下文、稳定长会话。

57MB 源码，既呈现了企业级通用 Agent 架构，又蕴藏了 Coding Agent 外溢的方向布局。

<!-- truncate -->

## 一、Harness 架构（三层）

| 层级 | 职责 |
| -- | -- |
| **第一层：入口与分流** | 接住命令行/交互界面/SDK调用/远端链接等不同入口，main.tsx 做参数解析、路由分发 |
| **第二层：Harness 会话编排** | 把三种形态（交互会话/无界面会话/远端接入）整理成统一 turn 契约，同时接入工具能力/扩展/状态/持久化 |
| **第三层：Runtime 与支撑层** | 本地路径 → 本地 Runtime 执行 Agent Loop；远端路径 → remote/bridge/server 承载 |

**设计本质：** 把多入口、多模式、多运行位置，收敛成统一的 agent turn 执行模型。

## 二、Agent Loop（TAOR 循环）

Claude Code 的核心运行循环：

```
T → A → O → R
Think → Act → Observe → Repeat
```

**关键：** 每次 turn 的稳定步骤：
1. 预处理上下文
2. 流式采样 thinking
3. 执行工具
4. 拼接 toolResult
5. 判断是否回流到下一轮

**哲学：** 将智能下沉给模型，释放自主权。不是简单的问答回合，而是一套可持续推进任务的执行循环。

## 三、状态管理（三层协同）

| 层 | 作用 |
| -- | -- |
| **AppState 会话态** | 当前会话实时状态：REPL/TUI 任务、MCP、插件、权限、通知、远端连接 |
| **bootstrap/state 全局态** | 项目位置、模型开关、成本预算、通道与遥测 |
| **sessionStorage 持久化层** | 对话轨迹、续接数据、历史快照，供 resume 和恢复使用 |

三者由 **ToolUseContext** 串连：既把状态暴露给 query/tools/tasks，也把 turn 内上下文带进 Agent Loop。

## 四、记忆管理（最值得学习的部分）

Claude Code 的记忆系统比 OpenClaw 更成熟，三套机制：

| 层级 | 内容 |
| -- | -- |
| **策略层** | 企业/组织下发的开关与限制，约束系统能做什么 |
| **指令层** | CLAUDE.md、用户级/项目级规则文件 |
| **记忆层** | 当前会话沉淀 + 项目/团队范围记忆 + Agent 专属记忆 + 动态记忆 |

**核心差异 vs OpenClaw：**

| | OpenClaw | Claude Code |
| -- | -- | -- |
| 检索方式 | RAG 语义检索（embedding similarity） | **LLM 驱动的文件级记忆选择** |
| 选什么 | top-k chunks | 挑文件（不是查向量库） |
| 选择依据 | embedding 相似度 | 文件名 + 描述 + query 语义匹配 |

Claude Code 的记忆系统能让人感知"越来越懂上下文"，而不是"强行回忆"。

## 五、工具系统（三层能力供给链）

```
能力定义 → 能力装配 → 能力执行
```

- 上游：扩展能力来源（内建/MCP/Skills）
- 中游：统一筛选和装配
- 下游：按回合决策调用，tool_result 回流到下一轮

无论内建工具、MCP 外部能力还是 plugins 扩展能力，运行时会表现为统一能力，使用方式一致。

## 六、隐藏功能演进方向

Claude Code 的演进方向：**主动协作 + 长时记忆 + 远端运行 + 会话资产管理**的 Agent 工作平台。

重视的能力：恢复能力、权限模型、上下文压缩、长会话稳定性、远端协作、会话资产化。

## 3条可复用知识

1. **TAOR 循环替代 ReAct** — Think-Act-Observe-Repeat 比 Think-Act-Observe 更适合复杂长任务，关键是"回流判断"这一步
2. **LLM 驱动的文件级记忆选择 > RAG chunks** — 用模型选文件而不是用 embedding 相似度查 chunks，上下文更干净
3. **三层状态 + ToolUseContext 串连** — 会话态/全局态/持久化分离，用上下文对象统一管理，比单一状态机更清晰
