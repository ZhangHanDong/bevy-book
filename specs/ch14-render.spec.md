spec: task
name: "第 14 章：渲染架构 — 双 World 与 Extract 模式"
inherits: project
tags: [part4, subsystem]
depends: [ch13-relationship]
estimate: 1d
---

## Intent

从 ECS 视角剖析 Bevy 渲染架构：RenderApp SubApp 的独立 World/Schedule、
Extract 模式的 83+ 次跨 World 数据同步、RenderSystems 的 27+ 阶段、
渲染中大量的 Component 和 Resource 使用，以及所有权模型如何自然
驱动双 World 分离。

## Decisions

- 分析 `crates/bevy_render/src/lib.rs` 和 extract_*.rs
- 双 World 数据流图
- RenderSystems 阶段全景图
- 重点是 ECS 视角，不深入 GPU 编程细节

## Boundaries

### Allowed Changes
- src/ch14-render.md

### Forbidden
- 不深入 WGSL shader 语法
- 不讲解 GPU pipeline 细节

## Completion Criteria

Scenario: 双 World 架构
  Test: review_ch14_dual_world
  Given 章节文件 ch14-render.md
  When 检查双 World 内容
  Then 解释 Main World 和 Render World 的分离动机
  And 包含数据流图
  And 包含 Rust 设计亮点引用块（所有权驱动架构）

Scenario: Extract 模式
  Test: review_ch14_extract
  Given 章节文件 ch14-render.md
  When 检查 Extract 内容
  Then 说明 ExtractComponent, ExtractResource, ExtractInstance 三种提取方式
  And 提及全引擎 83+ 次提取

Scenario: RenderSystems
  Test: review_ch14_systems
  Given 章节文件 ch14-render.md
  When 检查 RenderSystems 内容
  Then 包含阶段全景图
  And 列举关键阶段 (ExtractCommands, PrepareAssets, Queue, Render)
