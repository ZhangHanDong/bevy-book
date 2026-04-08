# 附录 A：ECS 术语对照表

本附录列出 Bevy ECS 中的核心术语，提供中英文对照和简要说明。

| 英文 | 中文 | 说明 | 首见章节 |
|------|------|------|---------|
| Entity | 实体 | 轻量级身份标识，本质是一个带 generation 的整数 ID | 第 4 章 |
| Component | 组件 | 挂载到 Entity 上的数据，`Send + Sync + 'static` | 第 5 章 |
| System | 系统 | 操作组件数据的函数，自动并行调度 | 第 8 章 |
| World | 世界 | 所有 ECS 数据的容器，拥有所有 Entity、Component 和 Resource | 第 3 章 |
| Resource | 资源 | 全局唯一的共享数据，不属于任何 Entity | 第 3 章 |
| Archetype | 原型 | 共享相同组件组合的 Entity 集合的索引 | 第 6 章 |
| Table | 表 | 列式存储后端，一个 Table 包含多个 Column | 第 5 章 |
| Column | 列 | 存储同一类型组件的连续数组，含变更检测 Tick | 第 5 章 |
| SparseSet | 稀疏集合 | sparse→dense 双数组存储，优化组件增删 | 第 5 章 |
| Query | 查询 | 高效遍历满足条件的 Entity 及其 Component | 第 7 章 |
| Filter | 过滤器 | 限制 Query 匹配范围的条件（With、Without、Changed 等） | 第 7 章 |
| Schedule | 调度 | 系统的编排和执行计划，自动处理依赖和并行 | 第 9 章 |
| SystemSet | 系统集 | 一组 System 的逻辑分组，用于配置顺序约束 | 第 9 章 |
| Commands | 命令 | 延迟执行的 World 操作队列（spawn、insert、despawn 等） | 第 11 章 |
| Event | 事件 | 帧内的广播消息，双缓冲队列 | 第 12 章 |
| Observer | 观察者 | 响应特定触发的回调系统 | 第 12 章 |
| Relationship | 关系 | Entity 间的类型化关联（如 ChildOf） | 第 13 章 |
| Plugin | 插件 | 模块化的功能包，向 App 注册 System、Resource 等 | 第 2 章 |
| App | 应用 | Bevy 应用的入口，Builder 模式组装 Plugin 和 System | 第 2 章 |
| Tick | 变更计数 | 全局递增的变更标记，驱动 Changed/Added 检测 | 第 10 章 |
| StorageType | 存储类型 | Component 的存储策略选择：Table 或 SparseSet | 第 5 章 |
| BlobArray | 类型擦除数组 | 用 Layout + 裸指针管理的类型擦除内存容器 | 第 5 章 |
| FilteredAccess | 过滤访问 | 记录 System 的组件读写模式，驱动并行决策 | 第 7 章 |
| SystemParam | 系统参数 | System 函数参数的抽象 trait（Query、Res、Commands 等） | 第 8 章 |
| Extract | 提取 | 从 Main World 复制数据到 Render World 的阶段 | 第 14 章 |
| Reflect | 反射 | 运行时类型内省，通过 derive 宏生成元数据 | 第 22 章 |
| TypeRegistry | 类型注册表 | 存储所有已注册类型的反射元数据 | 第 22 章 |
| TaskPool | 任务池 | 线程池，分为 Compute、AsyncCompute、IO 三种 | 第 23 章 |
| NonSend | 非发送 | `!Send` 类型的特殊存储通道，限主线程访问 | 第 5 章 |
| Stepping | 单步调试 | 逐系统推进 Schedule 执行的调试工具 | 第 24 章 |
| Gizmos | 调试绘制 | 即时模式的调试可视化 API | 第 24 章 |
