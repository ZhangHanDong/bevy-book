# 附录 F：Bevy ECS vs 其他 ECS

本附录比较 Bevy ECS 与 Rust 生态中其他主流 ECS 库，以及跨语言的 flecs。

## 对比总览

| 特性 | Bevy ECS | specs | legion | hecs | flecs (C) |
|------|:--------:|:-----:|:------:|:----:|:---------:|
| 语言 | Rust | Rust | Rust | Rust | C/C++ |
| 存储模型 | Table + SparseSet | BitSet + DenseVecStorage | Archetype | Archetype | Archetype + SparseSet |
| 状态 | 活跃维护 | 维护模式 | 维护模式 | 维护中 | 活跃维护 |
| 调度器 | 内置自动并行 | 内置 (shred) | 内置 | 无 | 内置 |
| 变更检测 | Tick 级别 | 手动 FlaggedStorage | 无 | 无 | 有 |
| 反射 | 完整 (bevy_reflect) | 无 | 无 | 无 | 有 (内置) |
| 关系 (Relationship) | 有 (Relationship) | 无 | 无 | 无 | 有 (核心特性) |
| no_std | 支持 | 否 | 否 | 支持 | 否 |
| 内置命令系统 | Commands | 无 (需 LazyUpdate) | CommandBuffer | CommandBuffer | 有 |

## 详细比较

### Bevy ECS

**架构特色**：
- Table 列式存储 + SparseSet 稀疏存储，双策略
- 自动并行调度（MultiThreadedExecutor），基于 FilteredAccess 冲突检测
- 零成本变更检测（Tick 级别 Added/Changed/RemovedComponents）
- 完整的反射和序列化系统
- GAT 驱动的 SystemParam 抽象

**优势**：功能最全面，与 Bevy 引擎深度集成，活跃社区

**劣势**：编译时间较长（all_tuples 宏展开）

### specs

**架构特色**：
- Storage 层面更灵活：DenseVecStorage、VecStorage、HashMapStorage 等
- 使用 shred 进行系统调度
- BitSet 用于实体追踪

**优势**：成熟稳定，Storage 策略最灵活

**劣势**：维护模式，API 较旧，无内置变更检测

### legion

**架构特色**：
- 纯 Archetype 存储（无 SparseSet 选项）
- World 使用分代 Archetype（可以有多个 World 合并）
- SystemBuilder 模式声明资源访问

**优势**：API 简洁，Archetype 实现高效

**劣势**：维护模式，无变更检测，无反射

### hecs

**架构特色**：
- 极简 Archetype ECS，约 2000 行代码
- 不含调度器——只做 World + Query
- 支持 no_std

**优势**：极简、易理解、编译快、可嵌入

**劣势**：无调度器、无变更检测、无命令系统

### flecs (C/C++)

**架构特色**：
- C 语言实现，最全面的 ECS 功能集
- Relationship 是核心特性（pair-based）
- 内置 REST API 和 Web 调试器
- Query DSL 支持复杂关系查询

**优势**：功能最全面（尤其是 Relationship），性能极高，跨语言

**劣势**：C 语言实现，Rust binding 非原生

## 存储模型对比

```
  Bevy ECS (Table + SparseSet):
  ┌─────────────────────────────────────────┐
  │  Table 存储 (默认): 列式连续内存         │
  │    [A₀ A₁ A₂] [B₀ B₁ B₂] [C₀ C₁ C₂]  │
  │                                         │
  │  SparseSet 存储 (可选): 稀疏→稠密映射    │
  │    sparse[e] → dense_index              │
  └─────────────────────────────────────────┘

  specs (多种 Storage):
  ┌─────────────────────────────────────────┐
  │  DenseVecStorage: 类似 SparseSet        │
  │  VecStorage: 用 Option<T> 直接索引       │
  │  HashMapStorage: HashMap<Entity, T>      │
  └─────────────────────────────────────────┘

  hecs / legion (纯 Archetype):
  ┌─────────────────────────────────────────┐
  │  所有组件都在 Archetype Table 中          │
  │  无 SparseSet 选项                       │
  └─────────────────────────────────────────┘
```

## 查询 API 对比

```rust
// Bevy ECS
fn system(query: Query<(&Position, &Velocity), With<Player>>) {
    for (pos, vel) in &query { /* ... */ }
}

// hecs
let mut world = hecs::World::new();
for (_, (pos, vel)) in world.query::<(&Position, &Velocity)>().iter() {
    // ...
}

// specs
impl<'a> System<'a> for MovementSystem {
    type SystemData = (WriteStorage<'a, Position>, ReadStorage<'a, Velocity>);
    fn run(&mut self, (mut pos, vel): Self::SystemData) {
        for (pos, vel) in (&mut pos, &vel).join() { /* ... */ }
    }
}
```

## 选择建议

| 场景 | 推荐 | 理由 |
|------|------|------|
| Bevy 引擎游戏开发 | **Bevy ECS** | 原生集成，功能完整 |
| 需要最简 ECS 嵌入 | hecs | 极简，no_std，无额外依赖 |
| 需要复杂 Relationship | flecs | Relationship 是核心特性 |
| 已有 specs 项目 | specs | 迁移成本高，维持现状 |
| 学习 ECS 概念 | hecs | 代码量少，容易阅读源码 |
| 高性能 + C 互操作 | flecs | C 实现，FFI 友好 |
