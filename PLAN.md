# 写作计划

> 基于 `agent-spec graph` 生成的依赖关系，按关键路径组织为 8 个 Sprint。

## 依赖图

完整依赖图见 [`specs/dependency-graph.dot`](./specs/dependency-graph.dot)
和 [`specs/dependency-graph.svg`](./specs/dependency-graph.svg)。

关键路径（全部串行，总计 19d）：

```
Ch01 → Ch02 → Ch03 → Ch04 → Ch05 → Ch06 → Ch07 → Ch08 → Ch09 → Ch10
0.5d   1d     1d     0.5d   1.5d   1d     1d     1.5d   1d     0.5d

→ Ch11 → Ch12 → Ch13 → Ch14 → Ch15 → Ch16 → Ch17 → Ch18 → Ch19 → Ch20
  0.5d   1d     0.5d   1d     0.5d   0.5d   0.5d   0.5d   0.5d   0.5d

→ Ch21 → Ch22 → Ch23 → Ch24 → Ch25 → Ch26
  0.5d   1d     1d     0.5d   0.5d   1d
```

## Sprint 规划

每个 Sprint 产出可预览的 mdbook 增量。每 Sprint 结束后运行 `mdbook build` 验证。

---

### Sprint 1：引擎全景（2d）

| 任务 | 工期 | Spec | 状态 |
|------|------|------|------|
| Ch01 Bevy 的设计哲学 | 0.5d | `ch01-design-philosophy.spec.md` | [ ] |
| Ch02 App、Plugin 与主循环 | 1d | `ch02-app-plugin.spec.md` | [ ] |
| 前言 (preface.md) 润色 | 0.5d | — | [ ] |

**产出**: 读者能理解 Bevy 的设计理念和整体架构。

---

### Sprint 2：ECS 基础层（3d）

| 任务 | 工期 | Spec | 状态 |
|------|------|------|------|
| Ch03 World | 1d | `ch03-world.spec.md` | [ ] |
| Ch04 Entity | 0.5d | `ch04-entity.spec.md` | [ ] |
| Ch05 Component 与 Storage | 1.5d | `ch05-component-storage.spec.md` | [ ] |

**产出**: 读者理解 ECS 的数据基础——World、Entity、Component 和内存布局。

---

### Sprint 3：ECS 查询与系统（3.5d）

| 任务 | 工期 | Spec | 状态 |
|------|------|------|------|
| Ch06 Archetype | 1d | `ch06-archetype.spec.md` | [ ] |
| Ch07 Query | 1d | `ch07-query.spec.md` | [ ] |
| Ch08 System | 1.5d | `ch08-system.spec.md` | [ ] |

**产出**: 读者理解数据如何被查询和操作——Archetype 索引、Query 引擎、函数即系统。

---

### Sprint 4：ECS 调度与变更（1.5d）

| 任务 | 工期 | Spec | 状态 |
|------|------|------|------|
| Ch09 Schedule | 1d | `ch09-schedule.spec.md` | [ ] |
| Ch10 变更检测 | 0.5d | `ch10-change-detection.spec.md` | [ ] |

**产出**: ECS 内核篇完结。读者完整理解 Bevy ECS 从存储到调度的全链路。

---

### Sprint 5：ECS 通信（2d）

| 任务 | 工期 | Spec | 状态 |
|------|------|------|------|
| Ch11 Commands | 0.5d | `ch11-commands.spec.md` | [ ] |
| Ch12 Event/Message/Observer | 1d | `ch12-event-observer.spec.md` | [ ] |
| Ch13 Relationship/Hierarchy | 0.5d | `ch13-relationship.spec.md` | [ ] |

**产出**: 读者理解 ECS 中实体间如何通信和建立关系。

---

### Sprint 6：引擎子系统（4d）

| 任务 | 工期 | Spec | 状态 |
|------|------|------|------|
| Ch14 渲染架构 | 1d | `ch14-render.spec.md` | [ ] |
| Ch15 Transform | 0.5d | `ch15-transform.spec.md` | [ ] |
| Ch16 Asset | 0.5d | `ch16-asset.spec.md` | [ ] |
| Ch17 Input | 0.5d | `ch17-input.spec.md` | [ ] |
| Ch18 State | 0.5d | `ch18-state.spec.md` | [ ] |
| Ch19 UI | 0.5d | `ch19-ui.spec.md` | [ ] |
| Ch20 PBR | 0.5d | `ch20-pbr.spec.md` | [ ] |

**产出**: 读者理解 ECS 如何驱动引擎七大子系统。

---

### Sprint 7：动画/场景 + 高级主题（3.5d）

| 任务 | 工期 | Spec | 状态 |
|------|------|------|------|
| Ch21 动画/场景/文本 | 0.5d | `ch21-animation-scene-text.spec.md` | [ ] |
| Ch22 Reflect | 1d | `ch22-reflect.spec.md` | [ ] |
| Ch23 并发模型 | 1d | `ch23-concurrency.spec.md` | [ ] |
| Ch24 诊断与调试 | 0.5d | `ch24-diagnostics.spec.md` | [ ] |
| Ch25 跨平台 | 0.5d | `ch25-cross-platform.spec.md` | [ ] |

**产出**: 高级主题全部覆盖。

---

### Sprint 8：收束 + 附录（2d）

| 任务 | 工期 | Spec | 状态 |
|------|------|------|------|
| Ch26 Rust 设计模式总结 | 1d | `ch26-rust-patterns.spec.md` | [ ] |
| 附录 A-F | 0.5d | — | [ ] |
| 全书校对与 mdbook 构建 | 0.5d | — | [ ] |

**产出**: 全书完成，可发布。

---

## 总计

| 指标 | 数值 |
|------|------|
| 章节 | 26 章 + 6 附录 |
| Sprint | 8 个 |
| 总工期 | ~19.5d |
| 图表 | 39 张 |
| Spec | 27 个 (1 项目级 + 26 任务级) |

## 执行方式

每章写作流程：

1. `agent-spec contract specs/chXX-*.spec.md` — 查看任务合约
2. 阅读 Bevy 源码中对应的 crate/模块
3. 在 `src/chXX-*.md` 中撰写正文
4. `mdbook build` — 验证构建
5. 标记 Sprint 表格中的 `[x]`

## 并行优化

虽然依赖链是串行的，但以下任务可并行写作（内容独立性高）：

- **Ch15-Ch21**（子系统章节）：互相独立，仅依赖 Ch14 的渲染概念
- **附录 A-F**：随时可写，不依赖正文
- **Ch26**：可在 Sprint 3-7 期间逐步积累 Rust 设计模式笔记
