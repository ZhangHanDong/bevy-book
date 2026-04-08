spec: task
name: "第 9 章：Schedule — 系统编排与自动并行"
inherits: project
tags: [part2, ecs-core]
depends: [ch08-system]
estimate: 1d
---

## Intent

讲解 Schedule 的依赖图构建、SystemSet 层级分组、Run Conditions 条件执行、
Executor 的拓扑排序与并行执行、运行时借用检查、ApplyDeferred 自动插入、
FixedUpdate 追赶机制和 Stepping 调试。

## Decisions

- 分析 `crates/bevy_ecs/src/schedule/` 下的 schedule, executor, config, condition, set
- 依赖图→拓扑排序→并行时间线图
- 运行时借用检查矩阵图
- Main Schedule 完整阶段图 (含 FixedUpdate 嵌套)

## Boundaries

### Allowed Changes
- src/ch09-schedule.md

## Completion Criteria

Scenario: 依赖图与并行执行
  Test: review_ch09_parallel
  Given 章节文件 ch09-schedule.md
  When 检查并行执行内容
  Then 包含系统依赖图示例
  And 包含拓扑排序后的并行时间线图
  And 解释读读并行、读写串行规则

Scenario: SystemSet 与 Run Conditions
  Test: review_ch09_set
  Given 章节文件 ch09-schedule.md
  When 检查 SystemSet 和 Run Conditions 内容
  Then 说明 SystemSet 的层级分组用法
  And 列举常见 Run Conditions (in_state, resource_changed, on_event)

Scenario: ApplyDeferred
  Test: review_ch09_deferred
  Given 章节文件 ch09-schedule.md
  When 检查 ApplyDeferred 内容
  Then 解释自动插入机制
  And 说明其对系统可见性的影响

Scenario: FixedUpdate
  Test: review_ch09_fixed
  Given 章节文件 ch09-schedule.md
  When 检查 FixedUpdate 内容
  Then 解释追赶机制
  And 说明嵌入 Main Schedule 的位置
