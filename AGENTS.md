# Bevy 之书 - AGENTS 指南

本文件将 [CLAUDE.md](./CLAUDE.md) 的项目约束转写为通用 agent 工作规则。任何在本仓库中写作、修订、审查章节的 agent，都应默认遵守本文件；若与用户当次明确指令冲突，以用户指令为准。

## 项目定位

- 本项目是一部面向 Rust 开发者的 Bevy 引擎深度概念书，基于 Bevy `0.19.0-dev` 源码分析。
- 这是一本纯概念驱动的书，不是教程仓库，不要把任务误解为做示例工程或教学项目。
- 全书范围为 26 章 + 6 个附录，预计包含 39 张图表。

## 必读文件

开始任何章节写作或修订前，先读取并遵守这些文件：

1. [outline.md](./outline.md)：全书大纲，所有写作任务必须严格遵循其章节结构与边界。
2. [specs/project.spec.md](./specs/project.spec.md)：项目级写作哲学与质量标准。
3. [PLAN.md](./PLAN.md)：整体写作计划与完成状态。
4. [src/SUMMARY.md](./src/SUMMARY.md)：mdBook 目录定义，决定章节文件组织方式。
5. 对应章节的 `specs/chXX-*.spec.md`：单章或相关章节的任务合约。
6. [specs/dependency-graph.svg](./specs/dependency-graph.svg)：章节依赖关系，可用于判断前置阅读和写作顺序。

## 核心写作原则

- 源码驱动：每个关键概念、API、机制、行为判断都必须有 Bevy 源码支撑，不能凭记忆补全。
- 深度优先：重点解释数据结构、执行路径、算法和设计权衡，避免泛泛描述。
- ECS 主线：ECS 内核是全书核心，其他子系统章节要说明它们如何与 ECS 耦合、扩展或受其约束。
- Rust 设计亮点：当 Bevy 使用了值得强调的 Rust 设计模式时，要明确解释设计选择、替代方案以及为何替代方案更差。
- 图表驱动理解：图表用于解释内存布局、数据流、架构、时序和 trait 层级，不是装饰。
- 纯概念写作：不要写实战教程、不要补充“跟着做”步骤、不要生成图片文件。

## Bevy 源码来源

- Bevy 引擎源码路径：`/Users/zhangalex/Work/Projects/game/bevy/`
- 写作前先定位相关 crate / module / type / function，再落笔。
- 不要凭经验编造 API 名称、字段、执行顺序、性能特征或 trait 关系。
- 代码示例必须直接来自 Bevy 源码，或在不改变关键语义的前提下基于源码做最小化简化。

## 强制工作流

所有章节写作和修订都应使用 `/tech-writer` skill。若当前 agent 环境没有该 skill，必须显式说明缺失，并严格手动执行同等的三阶段流程。

## 章节结构模板

每章应遵守如下结构：

```markdown
# 第N章：{标题}

> **导读**：本章在全书中的位置，前置依赖，读者收获。

## N.1 {小节标题}

{概念引入：2-3 句话说明这个概念解决什么问题}

{代码/图表}

{设计动机段落：3-8 句 WHY 分析}

{权衡分析段落：3-5 句}

{反面推理：2-3 句}

{跨章节关联：1-2 句}

**要点**：一句话总结核心结论。

## 本章小结
{要点列表 + 下一章过渡}
```

## 语言与格式

- 正文使用中文。
- 代码注释使用英文。
- 术语首次出现时标注英文原文，例如：原型 (Archetype)。
- 跨章节引用统一使用“详见第 N 章”格式。

## mdBook 约束

- 章节文件放在 `src/` 目录。
- 文件名格式使用 `ch01-design-philosophy.md` 这类形式。
- 目录结构由 `src/SUMMARY.md` 定义，不要脱离 SUMMARY 随意增删章节。
- 构建命令：`mdbook build`
- 本地预览命令：`mdbook serve`

## 代码示例规则

- 所有代码块都必须来自 Bevy 源码或源码级简化版。
- 每段代码都要标注源码位置，例如：

```rust
// 源码: crates/bevy_ecs/src/world/mod.rs:42
```

- 代码块统一使用 ` ```rust `。
- 每个代码块前要说明“为什么此处需要看这段代码”，后要说明“这段代码揭示了什么设计信息”。

## 图表规则

- 优先使用 Mermaid 绘制流程图、时序图、依赖图、trait / struct 层级图。
- 只有在 Mermaid 不适合时才使用 ASCII art，例如内存布局、指针结构、数组排列。
- 每张图表都要有编号和标题，例如：`图 5-1: Table 列式存储内存布局`
- 每张图表后都要有 2-4 句分析段落。
- 每章至少包含 1 张 Mermaid 图表。

图表选择原则：

- Mermaid：数据流、生命周期、帧循环、系统依赖、类型层级。
- ASCII art：内存布局、指针寻址、数组排列、表格内嵌对比。

## Rust 设计亮点

当内容涉及值得强调的 Rust 设计模式时，使用如下引用块：

```markdown
> **Rust 设计亮点**
```

并至少解释：

- 设计选择是什么。
- 可替代方案是什么。
- 为什么替代方案更差，或者不适合 Bevy 当前目标。

## 质量门禁

任何章节在完成前都必须满足：

- 每个核心概念都有源码引用支撑。
- 每章纯正文不少于 3000 字。
- L2（WHY）内容占比不低于 40%。
- 每章至少 1 张 Mermaid 图表。
- 每章至少 3 处源码引用。
- 不得重复大纲内容充当正文。
- 不得使用“代码 -> 一句话总结”的浅层写法。

## 章节任务执行步骤

处理章节任务时，默认按以下顺序推进：

1. 用 `agent-spec contract specs/chXX-*.spec.md` 查看任务合约。
2. 阅读相关 Bevy 源码模块。
3. 在 `src/chXX-*.md` 中撰写或修订正文。
4. 运行 `mdbook build` 验证构建未破坏。
5. 在 [PLAN.md](./PLAN.md) 中把对应任务标记为 `[x]` 完成。

`PLAN.md` 以 8 个 Sprint 组织全书推进。执行具体章节任务时，要确认当前工作与 Sprint 边界一致，不要跳过依赖关系强行并行推进。

## 禁止事项

- 不要凭记忆编造 API 或内部机制。
- 不要把本书写成实战教程。
- 不要生成图片文件作为图表产物。
- 不要脱离 `outline.md` 自行扩展章节范围。
- 不要只描述 WHAT，不解释 WHY 和 trade-off。

## 仓库结构

```text
bevy-book/
  AGENTS.md
  CLAUDE.md
  book.toml
  outline.md
  PLAN.md
  src/
    SUMMARY.md
    preface.md
    ch01-*.md
    ch02-*.md
    ...
    appendix-*.md
  specs/
    project.spec.md
    ch01-*.spec.md
    ch02-*.spec.md
    ...
    dependency-graph.dot
    dependency-graph.svg
  book/              # mdbook 构建输出，不手工编辑
```
