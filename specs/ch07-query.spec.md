spec: task
name: "第 7 章：Query — 高效的数据查询引擎"
inherits: project
tags: [part2, ecs-core]
depends: [ch06-archetype]
estimate: 1d
---

## Intent

深入 Query 系统的 WorldQuery trait 体系（QueryData + QueryFilter）、
QueryState 匹配缓存、Dense vs Archetype 迭代策略选择、FilteredAccess
并行安全冲突检测、ParamSet 互斥参数组、QueryBuilder 运行时动态查询，
以及 par_iter 的并行迭代。

## Decisions

- 分析 `crates/bevy_ecs/src/query/` 下的 fetch, filter, state, access, iter, par_iter
- QueryData/QueryFilter trait 层级图
- QueryState 缓存结构图 (matched_archetypes, matched_tables, is_dense)
- FilteredAccess 冲突矩阵示例
- Dense vs Archetype 迭代路径对比

## Boundaries

### Allowed Changes
- src/ch07-query.md

## Completion Criteria

Scenario: WorldQuery trait 体系
  Test: review_ch07_trait
  Given 章节文件 ch07-query.md
  When 检查 WorldQuery 内容
  Then 包含 QueryData 和 QueryFilter 的 trait 层级说明
  And 列举主要实现类型 (&T, &mut T, With, Without, Changed, Added)

Scenario: QueryState 缓存
  Test: review_ch07_state
  Given 章节文件 ch07-query.md
  When 检查 QueryState 内容
  Then 说明 matched_archetypes, matched_tables, is_dense 字段
  And 解释 archetype_generation 增量更新机制

Scenario: FilteredAccess 冲突检测
  Test: review_ch07_access
  Given 章节文件 ch07-query.md
  When 检查 FilteredAccess 内容
  Then 包含冲突矩阵示例（多 System 并行安全分析）
  And 包含 Rust 设计亮点引用块（借用规则映射到运行时）

Scenario: 迭代策略
  Test: review_ch07_iter
  Given 章节文件 ch07-query.md
  When 检查迭代策略内容
  Then 对比 Dense 和 Archetype 两种迭代路径
  And 说明 is_dense 的编译期决定机制
