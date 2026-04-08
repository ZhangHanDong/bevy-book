spec: task
name: "第 17 章：Input 系统"
inherits: project
tags: [part4, subsystem]
depends: [ch16-asset]
estimate: 0.5d
---

## Intent

讲解 Bevy 输入系统的 ECS 建模：ButtonInput<KeyCode> 作为 Resource、
Gamepad 作为 Entity + Component、Pointer 抽象统一鼠标和触摸，
以及 common_conditions 输入条件。

## Decisions

- 分析 `crates/bevy_input/src/`

## Boundaries

### Allowed Changes
- src/ch17-input.md

## Completion Criteria

Scenario: 输入建模
  Test: review_ch17_modeling
  Given 章节文件 ch17-input.md
  When 检查输入建模内容
  Then 说明 ButtonInput<KeyCode> 的 Resource 模式
  And 说明 Gamepad 的 Entity + Component 模式
  And 说明 Pointer 抽象的统一设计
