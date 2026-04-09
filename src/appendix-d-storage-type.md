# 附录 D：StorageType 选择指南

本附录提供一个决策树，帮助选择 Component 的存储类型：`Table`（默认）或 `SparseSet`。

## 决策树

```
  你的 Component 会在运行时频繁 insert / remove 吗？
  │
  ├─ 否 (大多数组件)
  │   │
  │   └─ 使用 Table (默认)
  │      性能: 遍历 O(n) 缓存友好
  │      代价: insert/remove 触发 Archetype 迁移 O(组件数)
  │
  └─ 是 (频繁增删)
      │
      ├─ 这个 Component 会被 Query 频繁遍历吗？
      │   │
      │   ├─ 否 → SparseSet ✓
      │   │   insert/remove O(1)，遍历较少无所谓
      │   │
      │   └─ 是 → 权衡
      │       遍历性能 (Table) vs 增删性能 (SparseSet)
      │       测量后决定
      │
      └─ 同时有大量实体频繁增删？ → SparseSet ✓
```

*图 D-1: StorageType 决策树*

## 性能对比

| 操作 | Table | SparseSet | 说明 |
|------|:-----:|:---------:|------|
| 顺序遍历 | **O(n) 缓存友好** | O(n) 指针跳转 | Table 更适合批量顺序遍历 |
| 随机访问 | O(1) | O(1) | 相当 |
| 添加组件 | **O(组件数) 迁移** | **O(1)** | SparseSet 快得多 |
| 删除组件 | **O(组件数) 迁移** | **O(1) swap-remove** | SparseSet 快得多 |
| 内存占用 | 紧凑连续 | sparse 数组有空洞 | Table 更省内存 |

## 典型选择

### 适合 Table（默认）的组件

```rust
#[derive(Component)]
struct Position(Vec3);        // 每帧遍历，很少增删

#[derive(Component)]
struct Velocity(Vec3);        // 每帧遍历，很少增删

#[derive(Component)]
struct Health(f32);           // 频繁读取，很少增删

#[derive(Component)]
struct Name(String);          // 基本不增删
```

### 适合 SparseSet 的组件

```rust
#[derive(Component)]
#[component(storage = "SparseSet")]
struct Stunned;               // 状态标记，频繁切换

#[derive(Component)]
#[component(storage = "SparseSet")]
struct AnimationPlaying {     // 动画播放中，频繁添加/移除
    clip: Handle<AnimationClip>,
}

#[derive(Component)]
#[component(storage = "SparseSet")]
struct DebugHighlight;        // 调试标记，随时添加/移除

#[derive(Component)]
#[component(storage = "SparseSet")]
struct DamageOverTime {       // 临时效果，持续几秒后移除
    dps: f32,
    remaining: f32,
}
```

## Archetype 迁移的代价

Table 存储组件的 insert/remove 会触发 Archetype 迁移——实体的所有 Table 组件数据被 memcpy 到新的 Table：

```
  Entity 有 [A, B, C] (Table 组件)

  insert D:
  ┌───────────────────┐     ┌─────────────────────┐
  │ Table [A, B, C]   │     │ Table [A, B, C, D]   │
  │   Row N: 复制出 ──┼────▶│   Row M: 复制入      │
  └───────────────────┘     └─────────────────────┘
  A, B, C 三个组件各 memcpy 一次
```

如果实体有 10 个 Table 组件，每次 insert/remove 就要做 10 次 memcpy。SparseSet 组件不参与 Archetype——它们的增删是独立的 O(1) 操作。

## 经验法则

1. **默认用 Table**——大多数组件都是"创建后长期存在，每帧遍历"
2. **标记组件优先 SparseSet**——空结构体（ZST）标记如 `Stunned`、`Selected`，频繁切换
3. **临时效果用 SparseSet**——buff/debuff、粒子状态、动画触发器
4. **测量驱动**——如果不确定，先用 Table，发现瓶颈后再切换
