spec: task
name: "第 13 章：Relationship 与 Hierarchy — 实体间的纽带"
inherits: project
tags: [part3, communication]
depends: [ch12-event-observer]
estimate: 0.5d
---

## Intent

讲解 Relationship trait 的双向自动维护机制、RelationshipTarget 与
Component Hooks、内置 ChildOf/Children 父子关系、自定义 Relationship、
linked_spawn 级联销毁，以及 Traversal 遍历。

## Decisions

- 分析 `crates/bevy_ecs/src/relationship/` 和 `hierarchy/`
- Relationship 双向链接维护流程图
- 级联销毁递归过程图

## Boundaries

### Allowed Changes
- src/ch13-relationship.md

## Completion Criteria

Scenario: 双向维护机制
  Test: review_ch13_bidirectional
  Given 章节文件 ch13-relationship.md
  When 检查双向维护内容
  Then 解释插入 Relationship 时 Hook 自动更新 RelationshipTarget
  And 解释替换和删除时的更新逻辑
  And 包含流程图

Scenario: ChildOf / Children
  Test: review_ch13_hierarchy
  Given 章节文件 ch13-relationship.md
  When 检查 Hierarchy 内容
  Then 说明 ChildOf 和 Children 的关系
  And 说明 linked_spawn 的级联销毁行为

Scenario: 自定义 Relationship
  Test: review_ch13_custom
  Given 章节文件 ch13-relationship.md
  When 检查自定义内容
  Then 展示如何定义自定义 Relationship
  And 提及 allow_self_referential 属性
