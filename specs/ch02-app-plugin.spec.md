spec: task
name: "第 2 章：App、Plugin 与主循环"
inherits: project
tags: [part1, overview]
depends: [ch01-design-philosophy]
estimate: 1d
---

## Intent

深入 bevy_app crate，讲解 App 构建器、Plugin trait、PluginGroup、SubApp、
Main Schedule 阶段和 Feature Flags 裁剪机制。让读者理解 Bevy 应用的启动
流程和扩展点。

## Decisions

- 分析 `crates/bevy_app/src/app.rs` 中的 App struct
- 分析 `crates/bevy_app/src/plugin.rs` 中的 Plugin trait
- 统计全引擎 211 个 Plugin 实现的分布
- 展示 Main Schedule 的完整阶段图 (First->Last)
- 列举关键 Feature Flags 分组

## Boundaries

### Allowed Changes
- src/ch02-app-plugin.md

## Completion Criteria

Scenario: App 构建器讲解
  Test: review_ch02_app
  Given 章节文件 ch02-app-plugin.md
  When 检查 App 相关内容
  Then 包含 App struct 的核心字段说明
  And 包含 builder 模式的代码示例

Scenario: Plugin 系统讲解
  Test: review_ch02_plugin
  Given 章节文件 ch02-app-plugin.md
  When 检查 Plugin 相关内容
  Then 包含 Plugin trait 定义的源码引用
  And 提及全引擎 Plugin 实现数量统计

Scenario: Schedule 阶段图
  Test: review_ch02_schedule
  Given 章节文件 ch02-app-plugin.md
  When 检查 Schedule 内容
  Then 包含 Main Schedule 阶段图（ASCII art 或 Mermaid）
  And 图表有编号和标题

Scenario: 缺少 SubApp 讲解则不通过
  Test: review_ch02_subapp
  Given 章节文件 ch02-app-plugin.md
  When 检查 SubApp 内容
  Then 包含 SubApp 的用途说明和渲染子应用的关联
