# Bevy 之书 - 项目指引

## 项目概述

面向 Rust 开发者的 Bevy 引擎深度概念书，基于 Bevy 0.19.0-dev 源码分析。
纯概念驱动，不含实战教程。26 章 + 6 附录，39 张图表。

## 大纲与写作哲学

完整大纲见 [outline.md](./outline.md)。所有写作任务必须严格遵循大纲结构。

写作哲学见 [specs/project.spec.md](./specs/project.spec.md)，核心原则：

- **源码驱动**：每个概念必须有 Bevy 源码引用支撑，不凭记忆编造 API
- **深度优先**：深入数据结构和算法层面，避免泛泛而谈
- **ECS 主线**：ECS 内核是全书核心（第 3-10 章），其余章节展示 ECS 如何渗透到引擎各子系统
- **Rust 设计亮点**：每当 Bevy 使用了精妙的 Rust 设计模式，用引用块标注并解释为什么这样设计
- **图表驱动理解**：39 张图表（内存布局、数据流、架构、时序、trait 层级）配合文字
- **纯概念**：不含实战教程、不含可运行项目、不生成图片文件

## Bevy 源码位置

- Bevy 引擎源码: `/Users/zhangalex/Work/Projects/game/bevy/`
- 写作时必须基于源码分析，不要凭记忆编造 API

## 写作方法论：使用 /tech-writer skill

**所有章节写作和修订必须使用 `/tech-writer` skill。** 这是强制要求，不可跳过。

### 章节结构模板

```markdown
# 第N章：{标题}

> **导读**：本章在全书中的位置，前置依赖，读者收获。

## N.1 {小节标题}

{概念引入：2-3 句话说明这个概念解决什么问题}

{代码/图表}

{设计动机段落：3-8 句 WHY 分析 — 为什么选择这种设计？}

{权衡分析段落：3-5 句 — 这种设计的代价是什么？什么场景下会失效？}

{反面推理：2-3 句 — 如果不这样做/用替代方案会怎样？}

{跨章节关联：1-2 句 — 与其他章节的哪些概念相互影响？}

**要点**：一句话总结核心结论。

## 本章小结
{要点列表 + 下一章过渡}
```

### 语言
- 正文使用中文
- 代码注释使用英文
- 术语首次出现时标注英文原文，如：原型 (Archetype)

### mdbook 结构
- 使用 mdbook 构建，章节文件放在 `src/` 目录下
- 文件名格式: `ch01-design-philosophy.md`
- 目录结构在 `src/SUMMARY.md` 中定义
- 构建命令: `mdbook build` (输出到 `book/`)
- 预览命令: `mdbook serve` (本地预览)

### 代码示例
- 所有代码必须来自 Bevy 源码或基于源码简化
- 标注源码位置: `// 源码: crates/bevy_ecs/src/world/mod.rs:42`
- 代码块使用 ```rust 标记
- 每个代码块前有动机段落（为什么看这段代码），后有分析段落（这段代码揭示了什么）

### 图表
- **优先使用 Mermaid** 绘制流程图、时序图、依赖图、类/trait 层级图
- **仅在 Mermaid 不适合时用 ASCII art**：内存布局图、指针结构图、数组排列图
- 每张图表有编号和标题: `*图 5-1: Table 列式存储内存布局*`
- 图表后紧跟 2-4 句分析段落
- 每章至少 1 张 Mermaid 图表（tech-writer 质量门禁要求）

图表类型选择指南:
| 适合 Mermaid | 适合 ASCII art |
|-------------|---------------|
| 数据流/生命周期流程 | 内存布局 (cache line, 数组结构) |
| 帧循环/阶段时序 | 指针寻址 (BlobArray, SparseSet) |
| System 并行/依赖图 | 表格内嵌对比 |
| trait/struct 层级 | inline 代码注释图 |

### Rust 设计亮点
- 当讲解涉及 Rust 设计模式时，用 `> **Rust 设计亮点**` 引用块标注
- 解释 Bevy 为什么这样设计，而不仅是怎样设计
- 至少包含：设计选择、替代方案、为什么替代方案更差

### 质量标准 (质量门禁)
- 每个概念必须有源码引用支撑
- 每章纯正文不少于 3000 字（不含代码/图表/表格）
- L2 (WHY) 内容占比不低于 40%
- 每章至少 1 张 Mermaid 流程图
- 每章至少 3 处源码引用
- 禁止"代码 → 一句话总结"的浅层模式
- 不要重复大纲内容作为正文
- 跨章节引用使用"详见第N章"格式

## 写作计划

完整写作计划见 [PLAN.md](./PLAN.md)，按 8 个 Sprint 组织：

| Sprint | 内容 | 工期 | 章节 |
|--------|------|------|------|
| 1 | 引擎全景 | 2d | Ch01-02 |
| 2 | ECS 基础层 | 3d | Ch03-05 |
| 3 | ECS 查询与系统 | 3.5d | Ch06-08 |
| 4 | ECS 调度与变更 | 1.5d | Ch09-10 |
| 5 | ECS 通信 | 2d | Ch11-13 |
| 6 | 引擎子系统 | 4d | Ch14-20 |
| 7 | 高级主题 | 3.5d | Ch21-25 |
| 8 | 收束+附录 | 2d | Ch26 + 附录 |

依赖图见 [`specs/dependency-graph.svg`](./specs/dependency-graph.svg)。

## 任务管理

写作任务拆分为 agent-spec 格式，位于 `specs/` 目录下。
每个 spec 对应一章或一组相关章节。

每章写作流程：
1. `agent-spec contract specs/chXX-*.spec.md` — 查看任务合约
2. 阅读 Bevy 源码中对应的 crate/模块
3. 在 `src/chXX-*.md` 中撰写正文
4. `mdbook build` — 验证构建
5. 在 PLAN.md 中标记 `[x]` 完成

## 目录结构

```
bevy-book/
  CLAUDE.md          # 本文件
  book.toml          # mdbook 配置
  outline.md         # 全书大纲
  src/               # mdbook 源文件
    SUMMARY.md       # 目录（mdbook 必须）
    preface.md       # 前言
    ch01-*.md        # 各章节
    ch02-*.md
    ...
    appendix-*.md    # 附录
  PLAN.md            # 写作计划 (8 Sprint)
  specs/             # 写作任务 spec
    project.spec.md  # 项目级 spec (写作哲学)
    ch01-*.spec.md   # 各章任务合约
    ch02-*.spec.md
    ...
    dependency-graph.dot  # 依赖图 (DOT)
    dependency-graph.svg  # 依赖图 (SVG)
  book/              # mdbook 构建输出 (gitignore)
```
