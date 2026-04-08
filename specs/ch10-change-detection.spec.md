spec: task
name: "第 10 章：变更检测 — 零成本追踪"
inherits: project
tags: [part2, ecs-core]
depends: [ch09-schedule]
estimate: 0.5d
---

## Intent

剖析 Bevy 的变更检测机制：Tick 单调时钟、ComponentTicks (added + changed)、
Ref<T>/Mut<T> 包装器、Added/Changed Filter、Tick 溢出保护，以及变更检测
在 Transform、UI、Render、PBR 等子系统中的具体应用。

## Decisions

- 分析 `crates/bevy_ecs/src/change_detection.rs` 和 tick.rs
- Tick 判定时序图
- Mut<T> 的 DerefMut 自动标记流程图
- 列举引擎各子系统中使用 Changed<T> 的关键场景

## Boundaries

### Allowed Changes
- src/ch10-change-detection.md

## Completion Criteria

Scenario: Tick 机制
  Test: review_ch10_tick
  Given 章节文件 ch10-change-detection.md
  When 检查 Tick 内容
  Then 解释 AtomicU32 单调递增机制
  And 包含 Tick 判定时序图
  And 说明 CHECK_TICK_THRESHOLD 溢出保护

Scenario: Mut<T> 自动标记
  Test: review_ch10_mut
  Given 章节文件 ch10-change-detection.md
  When 检查 Mut<T> 内容
  Then 解释 DerefMut 中自动设置 changed_tick 的机制
  And 包含 Rust 设计亮点引用块

Scenario: 跨子系统应用
  Test: review_ch10_usage
  Given 章节文件 ch10-change-detection.md
  When 检查跨子系统内容
  Then 至少列举 3 个子系统中 Changed<T> 的具体用法
