spec: task
name: "第 11 章：Commands — 延迟执行"
inherits: project
tags: [part3, communication]
depends: [ch10-change-detection]
estimate: 0.5d
---

## Intent

讲解 Commands 延迟执行模型：迭代器失效问题的动机、RawCommandQueue
环形缓冲区实现、内置与自定义 Command、ApplyDeferred 同步点，以及
Delayed Commands 按时间触发。

## Decisions

- 分析 `crates/bevy_ecs/src/world/command_queue.rs`
- 分析 `crates/bevy_ecs/src/system/commands.rs`
- Commands 生命周期流程图：收集→同步→执行

## Boundaries

### Allowed Changes
- src/ch11-commands.md

## Completion Criteria

Scenario: 延迟动机
  Test: review_ch11_motivation
  Given 章节文件 ch11-commands.md
  When 检查延迟动机内容
  Then 解释迭代器失效问题
  And 说明为什么不能在 System 运行时直接修改 World

Scenario: Command 机制
  Test: review_ch11_mechanism
  Given 章节文件 ch11-commands.md
  When 检查 Command 机制内容
  Then 包含 RawCommandQueue 的结构说明
  And 列举内置 Command (spawn, despawn, insert, remove)
  And 说明自定义 Command trait

Scenario: 流程图
  Test: review_ch11_diagram
  Given 章节文件 ch11-commands.md
  When 检查图表
  Then 包含 Commands 生命周期图表且有编号标题
