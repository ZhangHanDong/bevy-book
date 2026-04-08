spec: task
name: "第 5 章：Component 与 Storage — 数据与内存"
inherits: project
tags: [part2, ecs-core]
depends: [ch04-entity]
estimate: 1.5d
---

## Intent

全面剖析 Component trait、两种存储策略 (Table vs SparseSet)、底层内存结构
(BlobArray, Column, ThinArrayPtr)。这是全书技术密度最高的章节之一，需要
通过详细的内存布局图让读者理解 Bevy ECS 的数据组织方式。

## Decisions

- 分析 `crates/bevy_ecs/src/component.rs` 中的 Component trait 和 StorageType
- 分析 `crates/bevy_ecs/src/storage/` 下的 table, sparse_set, blob_array
- 提供 4 张图表: Table/SparseSet 对比、Column 结构、SparseSet 查找、性能对比表
- 讲解 Required Components 的依赖 DAG
- 展示 Immutable Component 的设计动机

## Boundaries

### Allowed Changes
- src/ch05-component-storage.md

## Completion Criteria

Scenario: Component trait 剖析
  Test: review_ch05_trait
  Given 章节文件 ch05-component-storage.md
  When 检查 Component trait 内容
  Then 说明 `Send + Sync + 'static` 约束
  And 说明 StorageType 枚举的两个变体
  And 包含源码引用

Scenario: Table 存储详解
  Test: review_ch05_table
  Given 章节文件 ch05-component-storage.md
  When 检查 Table 存储内容
  Then 包含 Column 的四数组并行结构说明
  And 包含内存布局图
  And 解释 cache-friendly 的迭代优势

Scenario: SparseSet 存储详解
  Test: review_ch05_sparse
  Given 章节文件 ch05-component-storage.md
  When 检查 SparseSet 内容
  Then 包含 sparse-dense 双数组结构说明
  And 包含查找流程图
  And 解释 swap-remove 的 O(1) 删除

Scenario: BlobArray 类型擦除
  Test: review_ch05_blob
  Given 章节文件 ch05-component-storage.md
  When 检查 BlobArray 内容
  Then 解释类型擦除的必要性
  And 说明 `NonNull<u8> + Layout + drop_fn` 的设计
  And 包含 Rust 设计亮点引用块

Scenario: 性能对比表
  Test: review_ch05_perf
  Given 章节文件 ch05-component-storage.md
  When 检查性能对比内容
  Then 包含 Table vs SparseSet 在迭代/随机访问/增删方面的对比表
