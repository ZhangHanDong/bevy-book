spec: task
name: "第 21 章：动画、场景与文本"
inherits: project
tags: [part4, subsystem]
depends: [ch20-pbr]
estimate: 0.5d
---

## Intent

讲解三个子系统的 ECS 模式：AnimationGraph 的 Resource + Component 混合模式、
BSN 宏的 proc macro 构建声明式场景、Template 实体克隆重映射、Text Pipeline
的 Parley 集成与 Font Atlas。

## Decisions

- 分析 `crates/bevy_animation/`, `bevy_scene/`, `bevy_text/`
- 每个子系统独立一节，各 1000-1500 字

## Boundaries

### Allowed Changes
- src/ch21-animation-scene-text.md

## Completion Criteria

Scenario: AnimationGraph
  Test: review_ch21_animation
  Given 章节文件 ch21-animation-scene-text.md
  When 检查动画内容
  Then 说明 AnimationGraph 的 Resource + Component 混合模式
  And 说明 AnimationPlayer 的工作方式

Scenario: BSN 宏
  Test: review_ch21_bsn
  Given 章节文件 ch21-animation-scene-text.md
  When 检查场景内容
  Then 说明 bsn! 宏的声明式场景描述
  And 包含 Rust 设计亮点引用块（proc macro 构建 DSL）

Scenario: Text Pipeline
  Test: review_ch21_text
  Given 章节文件 ch21-animation-scene-text.md
  When 检查文本内容
  Then 说明 Parley 排版引擎集成
  And 说明 Font Atlas 的字形图集管理
