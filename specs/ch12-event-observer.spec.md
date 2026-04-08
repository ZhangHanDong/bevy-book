spec: task
name: "第 12 章：Event、Message 与 Observer — 三种通信模型"
inherits: project
tags: [part3, communication]
depends: [ch11-commands]
estimate: 1d
---

## Intent

对比 Bevy 的三种通信模型：Event（生命周期触发）、Message（拉取式批量处理）、
Observer（推送式即时触发）。深入分析各自的实现机制、5 种生命周期事件、
Observer 的分布式存储，以及选型指南。

## Decisions

- 分析 `crates/bevy_ecs/src/event/`, `message/`, `observer/`
- Push vs Pull 模型对比图
- Observer 事件分发流程图
- 5 种生命周期事件触发时机图 (Add, Insert, Discard, Remove, Despawn)

## Boundaries

### Allowed Changes
- src/ch12-event-observer.md

## Completion Criteria

Scenario: 三种模型对比
  Test: review_ch12_compare
  Given 章节文件 ch12-event-observer.md
  When 检查三种模型内容
  Then 包含 Event, Message, Observer 三者的对比表或对比图
  And 说明各自的触发时机和消费方式

Scenario: 生命周期事件
  Test: review_ch12_lifecycle
  Given 章节文件 ch12-event-observer.md
  When 检查生命周期事件内容
  Then 列举 5 种事件 (Add, Insert, Discard, Remove, Despawn)
  And 说明每种事件的触发条件

Scenario: Observer 实现
  Test: review_ch12_observer
  Given 章节文件 ch12-event-observer.md
  When 检查 Observer 内容
  Then 说明 ObserverDescriptor 的三维监听 (事件/组件/实体)
  And 提及分布式存储和 ArchetypeCache

Scenario: 选型指南
  Test: review_ch12_guide
  Given 章节文件 ch12-event-observer.md
  When 检查选型内容
  Then 给出 Event vs Message vs Observer 的使用场景建议
