spec: task
name: "第 25 章：跨平台与 no_std"
inherits: project
tags: [part5, advanced]
depends: [ch24-diagnostics]
estimate: 0.5d
---

## Intent

讲解 Bevy ECS 核心的 no_std 支持、NonSend 在不同平台的差异、
Web 环境下的单线程 ECS，以及 Android/iOS 的 Plugin 差异。

## Decisions

- 分析 `crates/bevy_platform/`, `bevy_android/`, `examples/no_std/`

## Boundaries

### Allowed Changes
- src/ch25-cross-platform.md

## Completion Criteria

Scenario: 跨平台支持
  Test: review_ch25_platform
  Given 章节文件 ch25-cross-platform.md
  When 检查跨平台内容
  Then 说明 ECS 核心的 no_std 支持
  And 说明 Web 环境的单线程 ECS 模式
  And 说明 NonSend 在不同平台的差异
