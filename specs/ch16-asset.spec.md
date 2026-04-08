spec: task
name: "第 16 章：Asset 系统"
inherits: project
tags: [part4, subsystem]
depends: [ch15-transform]
estimate: 0.5d
---

## Intent

从 ECS 视角讲解 Asset 系统：Handle<T> 的 PhantomData 强类型设计、
AssetServer 作为 Resource 驱动的异步加载、Asset 事件与 Changed 检测链、
AssetLoader/Processor/Saver 管线，以及热重载原理。

## Decisions

- 分析 `crates/bevy_asset/src/`
- Asset 加载生命周期图
- 重点展示 Handle<T> 的 PhantomData Rust 设计

## Boundaries

### Allowed Changes
- src/ch16-asset.md

## Completion Criteria

Scenario: Handle<T> 设计
  Test: review_ch16_handle
  Given 章节文件 ch16-asset.md
  When 检查 Handle 内容
  Then 解释 PhantomData 实现编译期类型安全
  And 包含 Rust 设计亮点引用块

Scenario: AssetServer 与加载流程
  Test: review_ch16_server
  Given 章节文件 ch16-asset.md
  When 检查 AssetServer 内容
  Then 说明异步加载流程
  And 包含生命周期图表
  And 说明热重载原理
