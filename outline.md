# 《Bevy 之书》大纲

> 面向 Rust 开发者的 Bevy 引擎深度概念书
> 基于 Bevy 0.19.0-dev 源码分析

## 第一部分：引擎全景（2 章）

### 第 1 章：Bevy 的设计哲学
- 1.1 模块化：58 个 crate，按需组合
- 1.2 数据驱动：ECS 作为统一范式
- 1.3 零 boilerplate：函数即系统
- 1.4 Rust 适配性：所有权模型如何塑造引擎架构

### 第 2 章：App、Plugin 与主循环
- 2.1 App 构建器模式与生命周期
- 2.2 Plugin trait：实现广泛分布于 43 个 crate
- 2.3 PluginGroup 与 DefaultPlugins
- 2.4 SubApp：渲染子应用与并行 World
- 2.5 Main Schedule 全景：First → PreUpdate → StateTransition → RunFixedMainLoop → Update → SpawnScene → PostUpdate → Last
- 2.6 Feature Flags：140+ 开关的裁剪策略

---

## 第二部分：ECS 内核（8 章，全书核心）

### 第 3 章：World — 一切数据的容器
- 3.1 World 的 10 个核心字段解剖
- 3.2 UnsafeWorldCell：从编译期借用到运行时验证
- 3.3 DeferredWorld：受限的观察者视图
- 3.4 WorldId 与多 World 隔离

> 图表: World 内部结构关系图
> 图表: UnsafeWorldCell 借用模型

### 第 4 章：Entity — 轻量级身份标识
- 4.1 64 位编码：index + generation
- 4.2 Entities 分配器：freelist + generation 递增
- 4.3 EntityLocation 四元组定位
- 4.4 EntityRef / EntityMut：安全的动态访问
- 4.5 Entity Disabling 与 DefaultQueryFilters

> 图表: Entity 内存布局图
> 图表: EntityLocation 寻址流程

### 第 5 章：Component 与 Storage — 数据与内存
- 5.1 Component trait：`Send + Sync + 'static`
- 5.2 StorageType：Table vs SparseSet 的取舍
- 5.3 Immutable Component 与 Required Components
- 5.4 Table 列式存储：Column = BlobArray + Ticks
- 5.5 BlobArray：类型擦除的内存基石
- 5.6 SparseSet：sparse 到 dense 双数组结构
- 5.7 ThinArrayPtr：极致的指针优化
- 5.8 NonSend 存储：线程本地数据

> 图表: Table vs SparseSet 内存布局对比
> 图表: Column 四数组并行结构
> 图表: SparseSet 查找动画
> 图表: 性能特性对比表

### 第 6 章：Archetype — 组合索引与实体迁移
- 6.1 Archetype = 组件集合的唯一指纹
- 6.2 Archetype 与 Table 的 N:1 映射
- 6.3 Edges 缓存：原型迁移图
- 6.4 实体迁移的完整流程：swap-remove + 连锁更新
- 6.5 Bundle 的原子操作：BundleInserter / Remover / Spawner
- 6.6 SpawnBatch 的批量摊销优化

> 图表: Archetype Graph 迁移路径
> 图表: Archetype 与 Table 映射关系
> 图表: 实体迁移 6 步动画

### 第 7 章：Query — 高效的数据查询引擎
- 7.1 WorldQuery trait 体系：QueryData + QueryFilter
- 7.2 QueryState：匹配缓存与增量更新
- 7.3 Dense vs Archetype 迭代策略
- 7.4 FilteredAccess：并行安全的冲突检测
- 7.5 ParamSet：互斥参数组
- 7.6 QueryBuilder：运行时动态查询
- 7.7 并行迭代：par_iter 的批次切分

> 图表: Query 匹配与迭代流程
> 图表: FilteredAccess 冲突矩阵
> 图表: Dense vs Archetype 路径选择

### 第 8 章：System — 函数即系统的魔法
- 8.1 System trait 与 SystemMeta
- 8.2 FunctionSystem：函数到系统的编译期转换
- 8.3 SystemParam trait：GAT 驱动的参数注入
- 8.4 `all_tuples!` 宏：0~16 参数的批量 impl
- 8.5 主要 SystemParam 类型一览
- 8.6 ExclusiveSystem：`&mut World` 独占访问
- 8.7 System Combinator：管道、适配、组合

> 图表: 函数到 System 转换链
> 图表: SystemParam 生命周期关系
> 图表: all_tuples! 宏展开示意

### 第 9 章：Schedule — 系统编排与自动并行
- 9.1 依赖图构建：before / after / chain
- 9.2 SystemSet：层级分组
- 9.3 Run Conditions：条件执行
- 9.4 Executor：拓扑排序到并行执行
- 9.5 运行时借用检查：读读并行、读写串行
- 9.6 ApplyDeferred 的自动插入
- 9.7 FixedUpdate 的追赶机制
- 9.8 Stepping：系统级单步调试

> 图表: 依赖图到拓扑排序到并行时间线
> 图表: 运行时借用检查矩阵
> 图表: Main Schedule 完整阶段图

### 第 10 章：变更检测 — 零成本追踪
- 10.1 Tick 机制：AtomicU32 单调递增
- 10.2 ComponentTicks：added + changed
- 10.3 Ref<T> / Mut<T>：DerefMut 自动标记
- 10.4 Added / Changed Filter
- 10.5 Tick 溢出保护与钳位
- 10.6 变更检测在引擎各子系统中的应用

> 图表: Tick 判定时序图
> 图表: Mut<T> 自动标记流程

---

## 第三部分：ECS 的通信与关系（3 章）

### 第 11 章：Commands — 延迟执行
- 11.1 为什么需要延迟：迭代器失效问题
- 11.2 RawCommandQueue：环形缓冲区
- 11.3 内置与自定义 Command
- 11.4 ApplyDeferred 同步点
- 11.5 Delayed Commands：按时间触发

> 图表: Commands 生命周期：收集到同步到执行

### 第 12 章：Event、Message 与 Observer — 三种通信模型
- 12.1 Event trait 与 5 种生命周期事件
- 12.2 Message：拉取式、固定调度点、批量处理
- 12.3 Observer：推送式、即时触发、分布式存储
- 12.4 EntityEvent 与组件级监听
- 12.5 选型指南：三者的适用场景

> 图表: Push vs Pull 模型对比
> 图表: Observer 事件分发流程
> 图表: 生命周期事件触发时机

### 第 13 章：Relationship 与 Hierarchy — 实体间的纽带
- 13.1 Relationship trait 与双向自动维护
- 13.2 RelationshipTarget 与 Component Hooks
- 13.3 ChildOf / Children：内置父子关系
- 13.4 自定义 Relationship
- 13.5 linked_spawn：级联销毁
- 13.6 Traversal：祖先与后代遍历

> 图表: Relationship 双向链接维护流程
> 图表: 级联销毁递归过程

---

## 第四部分：ECS 驱动的引擎子系统（8 章）

### 第 14 章：渲染架构 — 双 World 与 Extract 模式
- 14.1 RenderApp SubApp：独立 World 与 Schedule
- 14.2 Extract 模式：83+ 次跨 World 数据同步
- 14.3 RenderSystems：20 个核心阶段的 SystemSet
- 14.4 渲染中的 80+ Component 与 100+ Resource
- 14.5 所有权模型如何自然驱动双 World 分离

> 图表: 双 World 数据流
> 图表: RenderSystems 阶段全景

### 第 15 章：Transform 系统
- 15.1 Transform vs GlobalTransform
- 15.2 传播系统：Hierarchy 乘以 Changed 检测
- 15.3 StaticTransformOptimizations

> 图表: Transform 传播树

### 第 16 章：Asset 系统
- 16.1 Handle<T>：PhantomData 实现强类型
- 16.2 AssetServer：Resource 驱动的异步加载
- 16.3 Asset 事件与 Changed 检测链
- 16.4 AssetLoader / Processor / Saver 管线
- 16.5 热重载原理

> 图表: Asset 加载生命周期

### 第 17 章：Input 系统
- 17.1 ButtonInput<KeyCode>：Resource 驱动模型
- 17.2 Gamepad 作为 Entity + Component
- 17.3 Pointer 抽象：鼠标、触摸统一
- 17.4 输入条件 (common_conditions)

### 第 18 章：State 系统
- 18.1 States / SubStates / ComputedStates
- 18.2 OnEnter / OnExit：独立 Schedule
- 18.3 DespawnOnExit：StateTransition 消息驱动清理
- 18.4 run_if(in_state(...))

### 第 19 章：UI 系统
- 19.1 Node 实体：全 ECS 的 UI 模型
- 19.2 Flexbox/Grid 布局在 PostUpdate 运行
- 19.3 Interaction 与 Picking 集成
- 19.4 Observer 在 UI Widget 中的应用
- 19.5 Focus 与 Accessibility

### 第 20 章：PBR 渲染
- 20.1 StandardMaterial 的 Change Detection 驱动 Shader 编译
- 20.2 Light Clustering 作为 per-view Component
- 20.3 24+ 个 Plugin 的注册链
- 20.4 ExtendedMaterial：trait 组合扩展材质

### 第 21 章：动画、场景与文本
- 21.1 AnimationGraph：Resource + Component 混合模式
- 21.2 BSN 宏：proc macro 构建声明式场景
- 21.3 Template 与实体克隆重映射
- 21.4 Text Pipeline：Parley 集成与 Font Atlas

---

## 第五部分：ECS 高级主题（5 章）

### 第 22 章：Reflect — ECS 的运行时镜像
- 22.1 TypeRegistry 与 Component 注册集成
- 22.2 运行时字段访问：reflect_path
- 22.3 场景序列化：World 到 Reflect 到 serde
- 22.4 Reflect Functions
- 22.5 Remote 调试协议

### 第 23 章：并发模型
- 23.1 TaskPool 架构：Compute / AsyncCompute / IO
- 23.2 调度器的并行决策算法
- 23.3 par_iter 的数据并行
- 23.4 单线程 vs 多线程模式
- 23.5 Send/Sync 约束在 ECS 中的角色

> 图表: 调度器并行决策流程

### 第 24 章：诊断与调试
- 24.1 DiagnosticsStore 与性能指标
- 24.2 Gizmos：调试可视化
- 24.3 Schedule 可视化与 Stepping
- 24.4 bevy_remote：远程查询 World

### 第 25 章：跨平台与 no_std
- 25.1 ECS 核心的 no_std 支持
- 25.2 NonSend 在不同平台的差异
- 25.3 Web 环境下的单线程 ECS
- 25.4 Android / iOS 的 Plugin 差异

### 第 26 章：Bevy 中的 Rust 设计模式总结
- 26.1 unsafe 的边界艺术：UnsafeWorldCell, BlobArray
- 26.2 all_tuples! 与宏元编程
- 26.3 GAT 与生命周期参数化 (SystemParam)
- 26.4 PhantomData 与幽灵类型 (Handle<T>, Time<T>)
- 26.5 trait object vs 静态分发的工程判断 (Plugin vs System)
- 26.6 所有权模型驱动架构 (双 World)
- 26.7 编译期借用到运行时调度 (FilteredAccess)
- 26.8 Deref/DerefMut 实现透明拦截 (Mut<T>)
- 26.9 derive macro 突破无反射限制 (Reflect)
- 26.10 Builder 模式与链式 API (App, Schedule)

---

## 附录

- A. ECS 术语对照表 (英中)
- B. SystemParam 速查
- C. 全部内置 Schedule / SystemSet 一览
- D. StorageType 选择指南
- E. 常见 ECS 反模式
- F. Bevy ECS vs 其他 ECS 实现 (specs, legion, hecs, flecs)

---

## 图表统计

| 类型 | 数量 |
|------|------|
| 内存布局图 | 8 |
| 数据流图 | 6 |
| 架构关系图 | 5 |
| 时序图 | 4 |
| trait 层级图 | 6 |
| 冲突/并行分析图 | 3 |
| 性能对比表 | 4 |
| 宏展开对照 | 3 |
| **总计** | **39** |
