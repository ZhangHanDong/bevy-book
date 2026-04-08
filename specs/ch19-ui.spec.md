spec: task
name: "第 19 章：UI 系统"
inherits: project
tags: [part4, subsystem]
depends: [ch18-state]
estimate: 0.5d
---

## Intent

讲解 Bevy UI 的全 ECS 模型：Node 实体、Flexbox/Grid 布局在 PostUpdate 运行、
Interaction 与 Picking 集成、Observer 在 UI Widget 中的应用、Focus 与
Accessibility。

## Decisions

- 分析 `crates/bevy_ui/src/` 和 `crates/bevy_ui_widgets/src/`
- 重点展示 UI 如何完全构建在 ECS 之上

## Boundaries

### Allowed Changes
- src/ch19-ui.md

## Completion Criteria

Scenario: 全 ECS UI 模型
  Test: review_ch19_ecs
  Given 章节文件 ch19-ui.md
  When 检查 UI ECS 内容
  Then 说明每个 UI 元素是 Entity + Node Component
  And 说明 Flexbox 布局在 PostUpdate 阶段运行
  And 说明 Observer 在 Widget 交互中的 7 处应用
