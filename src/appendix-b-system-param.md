# 附录 B：SystemParam 速查

本附录列出 Bevy 内置的所有主要 `SystemParam` 类型，包括读写模式和使用场景。

## 基础参数

| SystemParam | 读/写 | 说明 |
|-------------|:-----:|------|
| `Query<'w, 's, D, F>` | 读/写 | 查询满足条件的实体及组件。`D` 为数据，`F` 为过滤器。最常用的参数 |
| `Res<'w, T>` | 只读 | 读取全局 Resource `T` |
| `ResMut<'w, T>` | 读写 | 读写全局 Resource `T`，自动标记变更 |
| `Commands<'w, 's>` | 写(延迟) | 延迟执行的 World 操作队列（spawn、insert、despawn 等） |
| `Local<'s, T>` | 读写 | 系统局部状态，在系统调用间持久存在。每个系统实例独立 |

## 事件与消息

| SystemParam | 读/写 | 说明 |
|-------------|:-----:|------|
| `EventReader<'w, 's, E>` | 只读 | 读取事件 `E`，自动追踪已读位置 |
| `EventWriter<'w, E>` | 写 | 发送事件 `E` |
| `EventCursor<'s, E>` | 只读 | 事件游标，手动控制读取位置 |

## 实体操作

| SystemParam | 读/写 | 说明 |
|-------------|:-----:|------|
| `EntityCommands` | 写(延迟) | 对单个实体的延迟操作（通过 Commands 获取） |
| `ParamSet<'w, 's, (P0, P1, ...)>` | 读写 | 多个冲突参数的安全包装，一次只能访问一个 |
| `Single<'w, D, F>` | 读/写 | 查询恰好一个实体，多于或少于一个时系统被跳过 |

## 变更检测

| SystemParam | 读/写 | 说明 |
|-------------|:-----:|------|
| `Query<..., Changed<T>>` | 只读(过滤) | 过滤本 Tick 内 `T` 组件发生变更的实体 |
| `Query<..., Added<T>>` | 只读(过滤) | 过滤本 Tick 内新增 `T` 组件的实体 |
| `RemovedComponents<'w, 's, T>` | 只读 | 读取已被移除的组件 `T` 对应的实体列表 |

## World 访问

| SystemParam | 读/写 | 说明 |
|-------------|:-----:|------|
| `&World` | 只读 | 对整个 World 的只读引用（exclusive system 中使用 `&mut World`） |
| `DeferredWorld<'w>` | 读写(受限) | 受限的 World 可变访问，不能修改结构 |
| `Deferred<'s, T>` | 写(延迟) | 延迟写入的缓冲区，在 apply_deferred 时刷新 |

## 平台相关

| SystemParam | 读/写 | 说明 |
|-------------|:-----:|------|
| `NonSend<'w, T>` | 只读 | 读取 `!Send` 资源，限主线程 |
| `NonSendMut<'w, T>` | 读写 | 读写 `!Send` 资源，限主线程 |

## 诊断与反射

| SystemParam | 读/写 | 说明 |
|-------------|:-----:|------|
| `Diagnostics<'w, 's>` | 写(延迟) | 写入诊断数据，延迟更新到 DiagnosticsStore |
| `Gizmos<'w, 's, Config>` | 写 | 即时模式调试绘制 |

## 组合与特殊

| SystemParam | 读/写 | 说明 |
|-------------|:-----:|------|
| `(P0, P1, ..., P15)` | 继承 | 元组自动实现 SystemParam，最多 16 个元素 |
| `Option<Res<'w, T>>` | 只读 | 可选 Resource，不存在时返回 None 而非报错 |
| `PhantomData<T>` | 无 | 占位符，不访问任何数据 |
| `In<T>` | 只读 | 管道系统的输入参数 |

## 读写模式说明

| 模式 | 含义 | 对并行的影响 |
|------|------|-------------|
| 只读 | 不修改数据 | 可与其他只读系统并行 |
| 读写 | 可能修改数据 | 与访问相同组件/资源的系统互斥 |
| 写(延迟) | 修改操作缓冲，不立即生效 | 不阻塞并行（实际写入在 apply_deferred） |

> **提示**：当系统参数超过 16 个时，可以将多个参数打包为 `#[derive(SystemParam)]` 的自定义结构体，或使用嵌套元组。
