spec: task
name: "第 6 章：Archetype — 组合索引与实体迁移"
inherits: project
tags: [part2, ecs-core]
depends: [ch05-component-storage]
estimate: 1d
---

## Intent

剖析 Archetype 的概念（组件集合的唯一指纹）、与 Table 的 N:1 映射关系、
Edges 缓存的原型迁移图、实体迁移的完整流程（swap-remove + 连锁更新），
以及 Bundle 的原子操作和 SpawnBatch 批量优化。

## Decisions

- 分析 `crates/bevy_ecs/src/archetype.rs` 中的 Archetype, Edges, ArchetypeAfterBundleInsert
- 画 Archetype Graph 迁移路径图
- 画 Archetype 与 Table 的 N:1 映射图（多 Archetype 共享 Table 的条件）
- 用 6 步动画展示实体迁移过程
- 分析 Bundle 模块: BundleInserter, BundleRemover, BundleSpawner

## Boundaries

### Allowed Changes
- src/ch06-archetype.md

## Completion Criteria

Scenario: Archetype 概念
  Test: review_ch06_concept
  Given 章节文件 ch06-archetype.md
  When 检查 Archetype 概念内容
  Then 说明 Archetype 是组件集合的唯一指纹
  And 说明空 Archetype (ArchetypeId::EMPTY) 的角色

Scenario: Archetype 与 Table 映射
  Test: review_ch06_mapping
  Given 章节文件 ch06-archetype.md
  When 检查映射关系内容
  Then 包含 N:1 映射关系图
  And 解释仅 Table 组件决定 Table ID，SparseSet 组件不影响

Scenario: 实体迁移流程
  Test: review_ch06_migration
  Given 章节文件 ch06-archetype.md
  When 检查实体迁移内容
  Then 包含完整迁移步骤说明
  And 解释 swap-remove 的连锁 EntityLocation 更新
  And 包含迁移过程图表

Scenario: Edges 缓存
  Test: review_ch06_edges
  Given 章节文件 ch06-archetype.md
  When 检查 Edges 内容
  Then 解释 BundleId 到 ArchetypeAfterBundleInsert 的缓存机制
  And 说明首次计算后永久缓存的设计
