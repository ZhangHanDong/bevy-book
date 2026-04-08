spec: task
name: "第 1 章：Bevy 的设计哲学"
inherits: project
tags: [part1, overview]
estimate: 0.5d
---

## Intent

介绍 Bevy 引擎的四大设计哲学：模块化 (60 crate)、数据驱动 (ECS)、
零 boilerplate（函数即系统）、Rust 适配性（所有权模型塑造架构）。
作为全书开篇，建立读者对 Bevy 设计理念的整体认知。

## Decisions

- 分析 Bevy 主 Cargo.toml 中的 workspace 成员数量和依赖关系
- 用一个最简 System 函数展示零 boilerplate 特性
- 与 Unity/Godot/Unreal 做简要对比（仅设计理念层面，非功能对比）
- 引出 Rust 所有权如何影响双 World 等架构决策

## Boundaries

### Allowed Changes
- src/ch01-design-philosophy.md

## Completion Criteria

Scenario: 覆盖四大设计哲学
  Test: review_ch01_sections
  Given 章节文件 ch01-design-philosophy.md
  When 检查章节内容
  Then 包含 "模块化" 相关段落且引用 crate 数量
  And 包含 "数据驱动" 相关段落且提及 ECS
  And 包含 "零 boilerplate" 段落且包含 System 函数代码
  And 包含 "Rust 适配性" 段落且提及所有权模型

Scenario: 源码引用
  Test: review_ch01_source_refs
  Given 章节文件 ch01-design-philosophy.md
  When 检查代码块
  Then 至少包含 1 个 Bevy 源码引用注释
