# 附录 C：内置 Schedule / SystemSet 一览

本附录列出 Bevy 内置的所有 Schedule 标签和主要 SystemSet。

## 主循环 Schedule

主循环每帧按以下顺序执行 Schedule。默认 feature 集启用 `bevy_state` 时会包含 `StateTransition`；如果裁掉该 feature，这个阶段不存在。

```
  启动 (仅执行一次):
  ┌──────────────────────────────────────────────┐
  │  StateTransition (OnEnter 初始状态)           │
  │  PreStartup → Startup → PostStartup          │
  └──────────────────────────────────────────────┘

  每帧循环:
  ┌──────────────────────────────────────────────┐
  │  First                                       │
  │  ├─ 消息更新、时间更新                         │
  │  PreUpdate                                   │
  │  ├─ 输入处理、窗口事件                         │
  │  StateTransition                             │
  │  ├─ 状态转换 (OnExit / OnEnter)               │
  │  RunFixedMainLoop                            │
  │  ├─ FixedFirst → FixedPreUpdate → FixedUpdate │
  │  │  → FixedPostUpdate → FixedLast            │
  │  Update                                      │
  │  ├─ 用户游戏逻辑 (主要写 System 的地方)        │
  │  SpawnScene                                  │
  │  ├─ 执行场景实例化                            │
  │  PostUpdate                                  │
  │  ├─ Transform 传播、渲染提取                   │
  │  Last                                        │
  │  ├─ 帧末清理                                  │
  └──────────────────────────────────────────────┘
```

*图 C-1: 主循环 Schedule 执行顺序*

## Schedule 标签详解

### 启动阶段 (仅运行一次)

| Schedule | 用途 | 典型内容 |
|----------|------|---------|
| `PreStartup` | 启动前的准备 | 底层系统初始化 |
| `Startup` | 应用启动 | 场景加载、初始实体 spawn |
| `PostStartup` | 启动后处理 | 依赖 Startup 数据的初始化 |

### 每帧阶段

| Schedule | 用途 | 典型内容 |
|----------|------|---------|
| `First` | 帧开头 | 消息更新、时间更新 |
| `PreUpdate` | 更新前 | 输入事件处理、窗口事件 |
| `StateTransition` | 状态切换 | 运行 OnExit/OnTransition/OnEnter |
| `RunFixedMainLoop` | 固定步驱动 | 根据累计时间决定 FixedMain 执行次数 |
| `Update` | 主更新 | **用户游戏逻辑** |
| `SpawnScene` | 场景实例化 | 执行场景生成请求 |
| `PostUpdate` | 更新后 | Transform 传播、可见性计算、渲染数据提取 |
| `Last` | 帧末尾 | 清理、诊断收集 |

### 固定时间步

| Schedule | 用途 | 说明 |
|----------|------|------|
| `FixedFirst` | 固定步开头 | 固定步时间更新 |
| `FixedPreUpdate` | 固定步前处理 | 物理引擎预处理 |
| `FixedUpdate` | 固定步主循环 | **物理模拟、确定性逻辑** |
| `FixedPostUpdate` | 固定步后处理 | 物理后处理 |
| `FixedLast` | 固定步末尾 | 固定步清理 |

### 渲染阶段

| Schedule | 用途 | 说明 |
|----------|------|------|
| `ExtractSchedule` | 数据提取 | Main World → Render World 复制 |
| `Render` | 渲染执行 | GPU 指令提交 |

### 状态转换

| Schedule | 用途 | 说明 |
|----------|------|------|
| `StateTransition` | 状态机转换 | 运行 OnExit/OnTransition/OnEnter |
| `OnEnter(S)` | 进入状态 S | 状态初始化逻辑 |
| `OnExit(S)` | 离开状态 S | 状态清理逻辑 |
| `OnTransition { exited, entered }` | 状态转换 | 从一个状态到另一个状态的过渡逻辑 |

## 内置 SystemSet

### 引擎核心 SystemSet

| SystemSet | Schedule | 说明 |
|-----------|----------|------|
| `TransformSystem::TransformPropagate` | PostUpdate | Transform 层级传播 |
| `VisibilitySystem::*` | PostUpdate | 可见性计算 |
| `AnimationSystem::*` | PostUpdate | 动画评估 |

### 输入 SystemSet

| SystemSet | Schedule | 说明 |
|-----------|----------|------|
| `InputSystem` | PreUpdate | 输入事件处理 |

### 渲染 SystemSet

| SystemSet | Schedule | 说明 |
|-----------|----------|------|
| `RenderSet::ExtractCommands` | Render | 提取命令执行 |
| `RenderSet::Prepare` | Render | GPU 资源准备 |
| `RenderSet::Queue` | Render | 渲染队列构建 |
| `RenderSet::Render` | Render | GPU 指令提交 |
| `RenderSet::Cleanup` | Render | 渲染资源清理 |

## 顺序约束示例

```rust
// 用户系统添加到 Update
app.add_systems(Update, (
    input_handler,
    movement.after(input_handler),
    collision.after(movement),
));

// 固定时间步物理
app.add_systems(FixedUpdate, (
    apply_forces,
    integrate_velocity.after(apply_forces),
    detect_collisions.after(integrate_velocity),
));

// 状态系统
app.add_systems(OnEnter(GameState::Playing), setup_game);
app.add_systems(OnExit(GameState::Playing), cleanup_game);
```
