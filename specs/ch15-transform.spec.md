spec: task
name: "第 15 章：Transform 系统"
inherits: project
tags: [part4, subsystem]
depends: [ch14-render]
estimate: 0.5d
---

## Intent

讲解 Transform vs GlobalTransform 的区别、传播系统如何利用 Hierarchy
和 Changed 检测实现高效更新，以及 StaticTransformOptimizations。

## Decisions

- 分析 `crates/bevy_transform/src/`
- Transform 传播树图表

## Boundaries

### Allowed Changes
- src/ch15-transform.md

## Completion Criteria

Scenario: Transform 传播
  Test: review_ch15_propagation
  Given 章节文件 ch15-transform.md
  When 检查传播内容
  Then 解释 Transform (local) vs GlobalTransform (world) 的区别
  And 说明传播系统仅在 Changed<Transform> 时触发
  And 包含传播树图表
