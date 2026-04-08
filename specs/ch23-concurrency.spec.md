spec: task
name: "第 23 章：并发模型"
inherits: project
tags: [part5, advanced]
depends: [ch22-reflect]
estimate: 1d
---

## Intent

讲解 Bevy 的并发模型：TaskPool 三池架构 (Compute/AsyncCompute/IO)、
调度器的并行决策算法、par_iter 的数据并行、单线程 vs 多线程模式，
以及 Send/Sync 约束在 ECS 中的角色。

## Decisions

- 分析 `crates/bevy_tasks/src/`
- 分析 Schedule executor 的并行决策逻辑
- 调度器并行决策流程图

## Boundaries

### Allowed Changes
- src/ch23-concurrency.md

## Completion Criteria

Scenario: TaskPool 架构
  Test: review_ch23_taskpool
  Given 章节文件 ch23-concurrency.md
  When 检查 TaskPool 内容
  Then 说明 Compute, AsyncCompute, IO 三种池的用途差异

Scenario: 并行决策
  Test: review_ch23_parallel
  Given 章节文件 ch23-concurrency.md
  When 检查并行决策内容
  Then 包含调度器决策流程图
  And 说明 FilteredAccess 如何驱动并行/串行选择

Scenario: Send/Sync 约束
  Test: review_ch23_send_sync
  Given 章节文件 ch23-concurrency.md
  When 检查 Send/Sync 内容
  Then 说明 Component 要求 Send + Sync 的原因
  And 说明 NonSend 的例外处理
