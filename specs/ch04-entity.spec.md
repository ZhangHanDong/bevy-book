spec: task
name: "第 4 章：Entity — 轻量级身份标识"
inherits: project
tags: [part2, ecs-core]
depends: [ch03-world]
estimate: 0.5d
---

## Intent

剖析 Entity 的 64 位编码设计（index + generation）、Entities 分配器的
freelist 回收策略、EntityLocation 四元组定位机制、EntityRef/EntityMut
安全访问接口，以及 Entity Disabling 的 DefaultQueryFilters 实现。

## Decisions

- 展示 Entity 的 64 位内存布局图
- 解释 generation 如何防止 use-after-free
- 画出 EntityLocation 到实际存储数据的寻址流程图
- 说明 Entity Disabling 对 Query 性能的影响

## Boundaries

### Allowed Changes
- src/ch04-entity.md

## Completion Criteria

Scenario: Entity 编码设计
  Test: review_ch04_encoding
  Given 章节文件 ch04-entity.md
  When 检查 Entity 编码内容
  Then 包含 64 位布局图（index + generation）
  And 解释 generation 的 use-after-free 防护机制

Scenario: EntityLocation 寻址
  Test: review_ch04_location
  Given 章节文件 ch04-entity.md
  When 检查 EntityLocation 内容
  Then 包含四元组字段说明 (archetype_id, archetype_row, table_id, table_row)
  And 包含寻址流程图

Scenario: Entity Disabling
  Test: review_ch04_disabling
  Given 章节文件 ch04-entity.md
  When 检查 Disabling 内容
  Then 解释 DefaultQueryFilters 如何全局排除 Disabled 实体
