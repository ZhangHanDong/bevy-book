spec: task
name: "第 8 章：System — 函数即系统的魔法"
inherits: project
tags: [part2, ecs-core]
depends: [ch07-query]
estimate: 1.5d
---

## Intent

揭示 Bevy 最核心的 Rust 魔法：普通函数如何自动变成 System。深入
System trait、FunctionSystem 编译期转换、SystemParam trait 的 GAT
设计、all_tuples! 宏的批量实现生成、全部 18 种 SystemParam、
ExclusiveSystem 和 System Combinator。

## Decisions

- 分析 `crates/bevy_ecs/src/system/` 下的 system_param, function_system, system
- 展示函数到 System 的完整转换链图
- 展示 all_tuples! 宏的展开过程
- SystemParam trait 的 GAT (`Item<'world, 'state>`) 设计解读
- 制作 18 种 SystemParam 一览表

## Boundaries

### Allowed Changes
- src/ch08-system.md

## Completion Criteria

Scenario: System trait 讲解
  Test: review_ch08_trait
  Given 章节文件 ch08-system.md
  When 检查 System trait 内容
  Then 包含 System trait 的核心方法 (initialize, run_unsafe, apply_deferred)
  And 包含源码引用

Scenario: 函数到 System 转换
  Test: review_ch08_function
  Given 章节文件 ch08-system.md
  When 检查 FunctionSystem 内容
  Then 包含转换链图表
  And 解释 Marker 泛型消除歧义的作用

Scenario: SystemParam GAT 设计
  Test: review_ch08_param
  Given 章节文件 ch08-system.md
  When 检查 SystemParam 内容
  Then 展示 SystemParam trait 定义（含 State 和 Item 关联类型）
  And 解释 GAT 生命周期参数化的设计意图
  And 包含 Rust 设计亮点引用块

Scenario: all_tuples! 宏
  Test: review_ch08_macro
  Given 章节文件 ch08-system.md
  When 检查 all_tuples! 内容
  Then 展示宏展开过程
  And 解释 16 参数限制的来源
  And 提供超限时的 tuple 打包技巧

Scenario: SystemParam 一览表
  Test: review_ch08_table
  Given 章节文件 ch08-system.md
  When 检查一览表
  Then 包含至少 15 种 SystemParam 的表格（名称、读写模式、说明）
