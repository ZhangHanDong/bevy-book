spec: task
name: "第 26 章：Bevy 中的 Rust 设计模式总结"
inherits: project
tags: [part5, advanced, rust-patterns]
depends: [ch25-cross-platform]
estimate: 1d
---

## Intent

作为全书收束，总结 Bevy 中 10 种重要的 Rust 设计模式。每种模式用
Bevy 源码中的真实案例说明，让读者理解为什么 Rust 适合写游戏引擎。

## Decisions

- 10 种模式: unsafe 边界、all_tuples! 宏、GAT (SystemParam)、PhantomData (Handle<T>, Time<T>)、trait object vs 静态分发 (Plugin vs System)、所有权驱动架构 (双 World)、编译期借用到运行时 (FilteredAccess)、Deref/DerefMut 拦截 (Mut<T>)、derive macro (Reflect)、Builder 模式 (App, Schedule)
- 每种模式 300-600 字 + 源码片段
- 每种模式标注在前面哪一章首次出现

## Boundaries

### Allowed Changes
- src/ch26-rust-patterns.md

## Completion Criteria

Scenario: 覆盖 10 种模式
  Test: review_ch26_patterns
  Given 章节文件 ch26-rust-patterns.md
  When 检查模式内容
  Then 包含至少 10 种 Rust 设计模式的专节
  And 每种模式有 Bevy 源码引用
  And 每种模式标注首次出现的章节

Scenario: 模式与章节交叉引用
  Test: review_ch26_crossref
  Given 章节文件 ch26-rust-patterns.md
  When 检查交叉引用
  Then 至少引用前面 5 个不同章节的内容

Scenario: 非泛泛而谈
  Test: review_ch26_depth
  Given 章节文件 ch26-rust-patterns.md
  When 检查深度
  Then 每种模式包含具体的源码片段（非伪代码）
  And 每种模式解释为什么 Bevy 选择这种设计而非替代方案
