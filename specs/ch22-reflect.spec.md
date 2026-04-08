spec: task
name: "第 22 章：Reflect — ECS 的运行时镜像"
inherits: project
tags: [part5, advanced]
depends: [ch21-animation-scene-text]
estimate: 1d
---

## Intent

讲解 Bevy Reflect 系统：TypeRegistry 与 Component 注册集成、运行时
字段访问 (reflect_path)、场景序列化 (World->Reflect->serde)、
Reflect Functions，以及 Remote 调试协议。

## Decisions

- 分析 `crates/bevy_reflect/src/`
- 展示 derive macro 如何突破 Rust 无反射的限制

## Boundaries

### Allowed Changes
- src/ch22-reflect.md

## Completion Criteria

Scenario: TypeRegistry 集成
  Test: review_ch22_registry
  Given 章节文件 ch22-reflect.md
  When 检查 TypeRegistry 内容
  Then 说明 TypeRegistry 与 Component 注册的集成方式
  And 说明 reflect_path 的运行时字段访问

Scenario: 场景序列化
  Test: review_ch22_serde
  Given 章节文件 ch22-reflect.md
  When 检查序列化内容
  Then 说明 World->Reflect->serde 的序列化链路

Scenario: Rust 设计亮点
  Test: review_ch22_rust
  Given 章节文件 ch22-reflect.md
  When 检查 Rust 设计内容
  Then 包含 derive macro 实现运行时反射的设计亮点引用块
