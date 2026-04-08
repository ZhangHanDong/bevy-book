spec: task
name: "第 20 章：PBR 渲染"
inherits: project
tags: [part4, subsystem]
depends: [ch19-ui]
estimate: 0.5d
---

## Intent

从 ECS 视角讲解 PBR 渲染：StandardMaterial 的 Change Detection 驱动
Shader 编译、Light Clustering 作为 per-view Component、22 个 Plugin
的注册链、ExtendedMaterial 的 trait 组合扩展。

## Decisions

- 分析 `crates/bevy_pbr/src/`
- 重点是 ECS 模式而非图形学原理

## Boundaries

### Allowed Changes
- src/ch20-pbr.md

### Forbidden
- 不深入图形学数学推导

## Completion Criteria

Scenario: ECS 驱动的 PBR
  Test: review_ch20_ecs
  Given 章节文件 ch20-pbr.md
  When 检查 ECS 内容
  Then 说明 Change Detection 驱动 Shader 重编译的机制
  And 说明 22 个 Plugin 的注册结构
  And 说明 ExtendedMaterial 的 trait 组合设计
