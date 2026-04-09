# 附录 B：SystemParam 速查

本附录列出当前 Bevy 源码树中最常用、也最容易混淆的 `SystemParam` 类型。

## 查询与资源

| SystemParam | 读/写 | 说明 |
|-------------|:-----:|------|
| `Query<'w, 's, D, F>` | 读写 | 查询满足条件的实体及组件。最常用的参数 |
| `Single<'w, 's, D, F>` | 读写 | 恰好匹配一个实体的 Query，不满足时系统被跳过 |
| `Populated<'w, 's, D, F>` | 读写 | 至少匹配一个实体的 Query |
| `Res<'w, T>` | 只读 | 读取全局 Resource `T` |
| `ResMut<'w, T>` | 读写 | 读写全局 Resource `T`，自动标记变更 |
| `Option<Res<'w, T>>` | 只读 | 可选 Resource，不存在时返回 `None` |
| `Option<ResMut<'w, T>>` | 读写 | 可选可变 Resource |
| `NonSend<'w, T>` | 只读 | 读取 `!Send` 资源，限主线程 |
| `NonSendMut<'w, T>` | 读写 | 读写 `!Send` 资源，限主线程 |

## 命令、本地状态与组合

| SystemParam | 读/写 | 说明 |
|-------------|:-----:|------|
| `Commands<'w, 's>` | 写(延迟) | 延迟执行的 World 操作队列 |
| `Local<'s, T>` | 读写 | 系统局部状态，每个系统实例独立持久化 |
| `ParamSet<'w, 's, (P0, P1, ...)>` | 读写 | 多个冲突参数的安全包装，一次只访问一个 |
| `Deferred<'s, T>` | 写(延迟) | 延迟写入的缓冲区，在 `apply_deferred` 时刷新 |
| `(P0, P1, ..., P15)` | 继承 | 元组自动实现 `SystemParam`，最多 16 个元素 |
| `PhantomData<T>` | 无 | 占位符，不访问任何数据 |

## 消息与生命周期

| SystemParam | 读/写 | 说明 |
|-------------|:-----:|------|
| `MessageReader<'w, 's, M>` | 只读 | 读取缓冲消息，追踪各系统自己的读取进度 |
| `PopulatedMessageReader<'w, 's, M>` | 只读 | 仅在存在消息时运行系统 |
| `MessageWriter<'w, M>` | 写 | 写入缓冲消息 |
| `RemovedComponents<'w, 's, T>` | 只读 | 读取本帧被移除的组件 `T` 对应实体列表 |

## World 与动态访问

| SystemParam | 读/写 | 说明 |
|-------------|:-----:|------|
| `&World` | 只读 | 对整个 World 的只读引用（exclusive system 中常见） |
| `WorldId` | 只读 | 当前 World 的唯一标识 |
| `FilteredResources<'w, 's>` | 只读 | 运行时动态声明资源访问集合 |
| `FilteredResourcesMut<'w, 's>` | 读写 | 运行时动态声明可变资源访问集合 |
| `&EntityAllocator` | 只读 | 访问实体 ID 分配器 |

## 诊断与调试

| SystemParam | 读/写 | 说明 |
|-------------|:-----:|------|
| `Diagnostics<'w, 's>` | 写(延迟) | 写入诊断数据，延迟更新到 `DiagnosticsStore` |
| `Gizmos<'w, 's, Config>` | 写 | 即时模式调试绘制 |

## 相关但不是 SystemParam 的类型

| 类型 | 类别 | 说明 |
|------|------|------|
| `In<T>` | `SystemInput` | 系统输入参数，不属于 `SystemParam` |
| `EntityCommands` | `Commands` 返回值 | 通过 `Commands::spawn` / `Commands::entity` 获取 |
| `DeferredWorld<'w>` | 低层 API | 常见于 hooks 或内部实现，不是普通 system 参数 |

## 读写模式说明

| 模式 | 含义 | 对并行的影响 |
|------|------|-------------|
| 只读 | 不修改数据 | 可与其他只读系统并行 |
| 读写 | 可能修改数据 | 与访问相同组件/资源的系统互斥 |
| 写(延迟) | 修改操作缓冲，不立即生效 | 不阻塞并行（实际写入在 apply_deferred） |

> **提示**：当系统参数超过 16 个时，可以将多个参数打包为 `#[derive(SystemParam)]` 的自定义结构体，或使用嵌套元组。
