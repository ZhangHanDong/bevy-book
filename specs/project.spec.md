spec: project
name: "Bevy 之书"
tags: [book, bevy, ecs, rust]
---

## Intent

编写一本面向 Rust 开发者的 Bevy 引擎深度概念书。全书基于 Bevy 0.19.0-dev
源码分析，以 ECS 架构为主线，贯穿引擎所有子系统，同时展示 Bevy 中优秀的
Rust 设计模式。

## Constraints

- 正文使用中文，代码注释使用英文
- 所有代码必须来自 Bevy 源码或基于源码简化，标注源码位置
- 每个概念必须有源码引用支撑，不凭记忆编造 API
- 图表使用 ASCII art 或 Mermaid 格式，有编号和标题
- 当涉及 Rust 设计模式时用引用块标注 Rust 设计亮点
- 不含实战教程，纯概念驱动
- 术语首次出现标注英文原文

## Decisions

- Bevy 源码路径: `/Users/zhangalex/Work/Projects/game/bevy/`
- 章节文件格式: `src/chXX-slug.md`
- 每章 3000-6000 字（不含代码）
- 图表总计 39 张，分布在各章
- 全书 26 章 + 6 附录

## Boundaries

### Allowed Changes
- src/**
- specs/**
- outline.md
- CLAUDE.md

### Forbidden
- 不要修改 Bevy 源码
- 不要编写可运行的示例项目
- 不要生成图片文件（图表用文本格式）
