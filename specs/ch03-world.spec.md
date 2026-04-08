spec: task
name: "第 3 章：World — 一切数据的容器"
inherits: project
tags: [part2, ecs-core]
depends: [ch02-app-plugin]
estimate: 1d
---

## Intent

深入 bevy_ecs 的 World 模块，剖析 World struct 的 10 个核心字段、
UnsafeWorldCell 的 interior mutability 设计、DeferredWorld 受限视图，
以及 WorldId 的多 World 隔离机制。这是 ECS 内核篇的起点。

## Decisions

- 逐一解读 World 的核心字段: entities, components, archetypes, storages, bundles, observers, removed_components, change_tick, command_queue, last_change_tick
- 深入分析 UnsafeWorldCell 的 PhantomData variance 设计
- 对比 `&mut World` 独占 vs UnsafeWorldCell 共享的权衡
- 提供 2 张图表: World 结构关系图 + UnsafeWorldCell 借用模型

## Boundaries

### Allowed Changes
- src/ch03-world.md

## Completion Criteria

Scenario: World 字段解剖
  Test: review_ch03_fields
  Given 章节文件 ch03-world.md
  When 检查 World struct 内容
  Then 列出至少 8 个核心字段并逐一说明用途
  And 包含源码引用指向 `crates/bevy_ecs/src/world/mod.rs`

Scenario: UnsafeWorldCell 深度分析
  Test: review_ch03_unsafe
  Given 章节文件 ch03-world.md
  When 检查 UnsafeWorldCell 内容
  Then 解释为什么需要 interior mutability
  And 提及 PhantomData 的 variance 设计
  And 包含 Rust 设计亮点引用块

Scenario: 包含 2 张图表
  Test: review_ch03_diagrams
  Given 章节文件 ch03-world.md
  When 统计图表数量
  Then 至少包含 2 张图表且有编号标题

Scenario: 缺少 DeferredWorld 则不通过
  Test: review_ch03_deferred
  Given 章节文件 ch03-world.md
  When 检查 DeferredWorld 内容
  Then 包含 DeferredWorld 的用途说明
