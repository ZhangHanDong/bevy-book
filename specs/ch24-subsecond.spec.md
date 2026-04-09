spec: task
name: "第 24 章补充：Subsecond 热补丁 — ECS 与代码替换的天然契合"
inherits: project
tags: [part5, advanced, hotpatch, subsecond]
depends: [ch09-schedule, ch10-change-detection, ch24-diagnostics]
estimate: 0.5d
---

## Intent

为第 24 章（诊断与调试）补充一节 Subsecond 热补丁系统的深入剖析。
Subsecond 是 Dioxus Labs 开发的 Rust 代码热重载方案，Bevy 0.17+ 通过
`hotpatching` feature 集成。这一节要回答三个问题：Subsecond 的核心机制是什么、
Bevy 如何集成它、为什么 ECS 架构天然适合代码热替换。重点在于"为什么 ECS 适合"，
这是 Bevy 独有的架构优势，应该在诊断与调试章节中重点呈现。

## Decisions

- 分析 Subsecond 源码: `/Users/zhangalex/Work/Projects/game/dioxus/packages/subsecond/`
  - `subsecond/src/lib.rs` — subsecond::call API、JumpTable 刷新、ASLR 锚点、闭包派发
  - `subsecond-types/src/lib.rs` — JumpTable/AddressMap 数据结构
- 分析 Bevy 集成: `/Users/zhangalex/Work/Projects/game/bevy/crates/bevy_ecs/`
  - `Cargo.toml` — `hotpatching` feature 与 subsecond 依赖声明
  - `src/lib.rs` — `HotPatched` Message 与 `HotPatchChanges` Resource 定义
  - `src/schedule/executor/multi_threaded.rs` — Executor 中 refresh_hotpatch 调用
  - `src/schedule/executor/single_threaded.rs` — 单线程 executor 集成
  - `src/schedule/node.rs` — SystemNode/ConditionNode 的 refresh_hotpatch 方法
- 作为第 24 章的一个新小节 24.5，不新开章节
- 篇幅控制：400-700 字中文正文 + 1 张 Mermaid 流程图 + 1 段代码引用
- 深度 3 层：What (机制) → How (Bevy 集成点) → Why (ECS 为何契合)
- 强调三个 ECS 契合点：System 是纯函数、数据/逻辑分离、调度器同步点
- 不涉及 Subsecond 内部实现的过多细节（如 ThinLink、平台 memfd），这些属于
  Dioxus Subsecond 本身的话题，本节只讲 Bevy 如何使用它

## Boundaries

### Allowed Changes
- src/ch24-diagnostics.md (添加 24.5 小节)

### Forbidden
- 不要新建章节文件
- 不要修改其他章节
- 不要深入 Subsecond 的内部实现（ThinLink 链接器、WASM Table.grow 等细节）
- 不要编造未验证的性能数字（如 "130ms"）；使用源码文档中的数字或"亚秒级"等定性描述

## Completion Criteria

Scenario: Subsecond 机制讲解
  Test: review_ch24_5_mechanism
  Given 章节文件 ch24-diagnostics.md
  When 检查 24.5 节内容
  Then 包含 `subsecond::call` API 的简要说明
  And 说明跳转表（JumpTable / AddressMap）的作用
  And 明确"不修改进程内存"的设计特点
  And 有源码引用指向 subsecond/src/lib.rs

Scenario: Bevy 集成点讲解
  Test: review_ch24_5_bevy_integration
  Given 章节文件 ch24-diagnostics.md
  When 检查 Bevy 集成内容
  Then 提及 `hotpatching` feature flag
  And 说明 `HotPatched` Message 与 `HotPatchChanges` Resource 的作用
  And 说明 `System::refresh_hotpatch` 方法与 Executor 的协作
  And 包含源码引用指向 crates/bevy_ecs/src/lib.rs 和 schedule/executor/

Scenario: ECS 契合点分析
  Test: review_ch24_5_ecs_fit
  Given 章节文件 ch24-diagnostics.md
  When 检查 ECS 契合分析
  Then 明确指出三个契合点: System 是纯函数、数据/逻辑分离、调度器同步点
  And 解释为什么 OOP 架构难以做到同样的代码热替换
  And 包含 Rust 设计亮点引用块

Scenario: 流程图
  Test: review_ch24_5_diagram
  Given 章节文件 ch24-diagnostics.md
  When 检查 24.5 节图表
  Then 包含至少 1 张 Mermaid 图展示热补丁触发流程
  And 图表有编号和标题

Scenario: 篇幅控制
  Test: review_ch24_5_length
  Given 章节文件 ch24-diagnostics.md
  When 统计 24.5 节正文
  Then 中文正文字数不超过 800 字（不含代码块与图表）
  And 不超过 2 个代码块
