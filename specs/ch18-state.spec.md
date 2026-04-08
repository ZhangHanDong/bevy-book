spec: task
name: "第 18 章：State 系统"
inherits: project
tags: [part4, subsystem]
depends: [ch17-input]
estimate: 0.5d
---

## Intent

讲解 Bevy 状态机的 ECS 实现：States/SubStates/ComputedStates 三种状态类型、
OnEnter/OnExit 独立 Schedule、DespawnOnExit 利用 Observer 监听状态变化，
以及 run_if(in_state(...)) 条件系统。

## Decisions

- 分析 `crates/bevy_state/src/`

## Boundaries

### Allowed Changes
- src/ch18-state.md

## Completion Criteria

Scenario: 三种状态类型
  Test: review_ch18_types
  Given 章节文件 ch18-state.md
  When 检查状态类型内容
  Then 说明 States, SubStates, ComputedStates 三者的区别和用途

Scenario: 状态转换调度
  Test: review_ch18_transition
  Given 章节文件 ch18-state.md
  When 检查转换调度内容
  Then 说明 OnEnter/OnExit 是独立 Schedule
  And 说明 DespawnOnExit 利用 Observer 的机制
