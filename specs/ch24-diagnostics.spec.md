spec: task
name: "第 24 章：诊断与调试"
inherits: project
tags: [part5, advanced]
depends: [ch23-concurrency]
estimate: 0.5d
---

## Intent

讲解 Bevy 的诊断调试工具：DiagnosticsStore 性能指标收集、Gizmos
调试可视化、Schedule 可视化与 Stepping 单步调试，以及 bevy_remote
远程查询 World。

## Decisions

- 分析 `crates/bevy_diagnostic/`, `bevy_gizmos/`, `bevy_dev_tools/`, `bevy_remote/`

## Boundaries

### Allowed Changes
- src/ch24-diagnostics.md

## Completion Criteria

Scenario: 诊断工具
  Test: review_ch24_tools
  Given 章节文件 ch24-diagnostics.md
  When 检查诊断内容
  Then 说明 DiagnosticsStore 的性能指标体系
  And 说明 Gizmos 的调试可视化用法
  And 说明 Stepping 的系统级单步调试
  And 说明 bevy_remote 的远程查询协议
