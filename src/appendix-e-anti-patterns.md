# 附录 E：常见 ECS 反模式

本附录列出使用 Bevy ECS 时常见的反模式及其修正方法。

## 反模式 1：上帝 System

**问题**：一个 System 承担过多职责，参数接近 16 个上限。

```rust
// 反模式: 一个系统做所有事情
fn game_system(
    mut players: Query<(&mut Position, &mut Health, &Velocity, &Inventory)>,
    mut enemies: Query<(&mut Position, &mut Health, &mut AI), Without<Player>>,
    mut score: ResMut<Score>,
    time: Res<Time>,
    input: Res<ButtonInput<KeyCode>>,
    mut commands: Commands,
    mut events: EventWriter<GameEvent>,
    audio: Res<Audio>,
    // ... 还在增加
) {
    // 200 行逻辑
}
```

**修正**：拆分为职责单一的小系统。

```rust
// 正确: 职责分离
fn movement_system(mut query: Query<(&mut Position, &Velocity)>, time: Res<Time>) { ... }
fn combat_system(mut query: Query<(&mut Health, &Attack)>, mut events: EventWriter<DamageEvent>) { ... }
fn input_system(input: Res<ButtonInput<KeyCode>>, mut commands: Commands) { ... }
fn scoring_system(mut score: ResMut<Score>, events: EventReader<ScoreEvent>) { ... }
```

**为什么**：小系统更容易并行（数据访问冲突更少），更容易测试，更容易复用。

---

## 反模式 2：用 Component 存储引用

**问题**：尝试在 Component 中存储对其他 Entity 的引用。

```rust
// 反模式: 存储 &Entity 或裸 Entity 而不使用 Relationship
#[derive(Component)]
struct Parent {
    children: Vec<Entity>,  // 手动维护，容易失效
}
```

**修正**：使用 Bevy 内置的 Relationship 或 ChildOf。

```rust
// 正确: 使用 Relationship
commands.spawn(Player).with_child(Sword);
// 或使用 ChildOf
commands.spawn((Sword, ChildOf(player_entity)));
```

**为什么**：手动维护 Entity 引用容易出现悬空引用（Entity 已 despawn 但引用未清理）。Relationship 自动处理生命周期。

---

## 反模式 3：过度使用 Changed 过滤器

**问题**：依赖 `Changed<T>` 做业务逻辑，忽略首帧和系统顺序问题。

```rust
// 反模式: Changed 在首帧不触发（如果组件是初始值）
fn react_to_health(query: Query<&Health, Changed<Health>>) {
    for health in &query {
        // 首帧可能遗漏，系统顺序不对也可能遗漏
    }
}
```

**修正**：结合 `Added` 处理首次添加，或使用 Event 明确通知。

```rust
// 正确: 用 Event 替代 Changed 做明确通知
fn damage_system(
    mut health: Query<&mut Health>,
    mut events: EventWriter<HealthChanged>,
) {
    // 修改 health 时明确发送事件
    events.write(HealthChanged { entity, old, new });
}
```

**为什么**：`Changed<T>` 的语义是"本 Tick 内 `DerefMut` 被调用过"——它不区分值是否真的变了，也可能因为系统执行顺序而遗漏。对于重要的业务逻辑，明确的 Event 更可靠。

---

## 反模式 4：在 System 中 spawn 并立即查询

**问题**：在一个 System 中 spawn Entity，期望同一帧内另一个 System 能查询到它。

```rust
// 反模式: Commands 是延迟的，spawn 不会立即生效
fn spawn_system(mut commands: Commands) {
    commands.spawn((Player, Position(Vec3::ZERO)));
}

fn setup_system(query: Query<&Position, Added<Player>>) {
    // 如果与 spawn_system 在同一帧的同一 apply_deferred 之前
    // 这里查不到新 spawn 的实体！
}
```

**修正**：确保系统顺序正确，或使用 `apply_deferred` 隔离。

```rust
// 正确: 明确顺序约束
app.add_systems(Update, (
    spawn_system,
    apply_deferred,  // 显式插入 apply_deferred
    setup_system,
).chain());
```

**为什么**：Commands 是延迟执行的——spawn、insert、despawn 操作在 `apply_deferred` 时才真正应用到 World。理解这个延迟模型是正确使用 Bevy ECS 的关键。

---

## 反模式 5：Resource 代替 Component

**问题**：将本应挂载到 Entity 上的数据存为全局 Resource。

```rust
// 反模式: 用 Resource 存储特定实体的数据
#[derive(Resource)]
struct PlayerHealth(f32);

#[derive(Resource)]
struct PlayerPosition(Vec3);

#[derive(Resource)]
struct PlayerInventory(Vec<Item>);
```

**修正**：使用 Component，让数据跟随 Entity。

```rust
// 正确: 数据挂载到 Entity
#[derive(Component)]
struct Health(f32);

#[derive(Component)]
struct Inventory(Vec<Item>);

// spawn 时组合
commands.spawn((Player, Health(100.0), Position::default(), Inventory::default()));
```

**为什么**：Resource 是全局单例。当你需要第二个玩家（或第二个相同类型的实体）时，Resource 方案就崩溃了。Component 天然支持多实体。

---

## 反模式 6：忽略 StorageType 选择

**问题**：对所有组件都使用默认的 Table 存储，即使某些组件频繁增删。

```rust
// 反模式: 频繁增删的组件使用默认 Table
#[derive(Component)]
struct Burning;  // 几秒后 remove

#[derive(Component)]
struct Selected;  // 每帧可能切换

// 每次 insert/remove 都触发 Archetype 迁移
```

**修正**：频繁增删的组件标记 `SparseSet`。

```rust
// 正确: 频繁增删用 SparseSet
#[derive(Component)]
#[component(storage = "SparseSet")]
struct Burning;

#[derive(Component)]
#[component(storage = "SparseSet")]
struct Selected;
```

**为什么**：Table 组件的 insert/remove 触发 Archetype 迁移，所有 Table 组件都要 memcpy。SparseSet 的增删是 O(1)，不影响其他组件。详见附录 D。

---

## 反模式 7：系统间共享可变状态

**问题**：通过 `Arc<Mutex<T>>` 或全局变量在系统间共享可变状态。

```rust
// 反模式: 绕过 ECS 的资源管理
static SHARED_STATE: Mutex<GameState> = Mutex::new(GameState::default());

fn system_a() {
    let mut state = SHARED_STATE.lock().unwrap();
    state.score += 1;
}
```

**修正**：使用 Resource 或 Event 在 ECS 框架内通信。

```rust
// 正确: 用 Resource
#[derive(Resource)]
struct GameScore(u32);

fn system_a(mut score: ResMut<GameScore>) {
    score.0 += 1;  // ECS 管理并发安全
}
```

**为什么**：ECS 调度器能看到 Resource 的读写模式并安全并行。`Mutex` 绕过了调度器，可能导致死锁，且调度器无法对其优化。

---

## 总结

| # | 反模式 | 正确做法 | 关键原因 |
|---|--------|---------|---------|
| 1 | 上帝 System | 拆分为小系统 | 更好的并行和可维护性 |
| 2 | Component 存引用 | 使用 Relationship | 自动生命周期管理 |
| 3 | 过度用 Changed | Event 明确通知 | Changed 语义可能遗漏 |
| 4 | spawn 后立即查询 | chain + apply_deferred | Commands 是延迟的 |
| 5 | Resource 代替 Component | 数据挂载到 Entity | 支持多实体 |
| 6 | 忽略 StorageType | 频繁增删用 SparseSet | 避免 Archetype 迁移 |
| 7 | 共享可变状态 | Resource / Event | 保持调度器可见性 |
