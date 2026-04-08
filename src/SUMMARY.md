# Summary

[前言](./preface.md)

---

# 第一部分：引擎全景

- [第 1 章：Bevy 的设计哲学](./ch01-design-philosophy.md)
- [第 2 章：App、Plugin 与主循环](./ch02-app-plugin.md)

---

# 第二部分：ECS 内核

- [ECS 架构概论 — 从 OOP 到数据驱动](./ecs-fundamentals.md)
- [第 3 章：World — 一切数据的容器](./ch03-world.md)
- [第 4 章：Entity — 轻量级身份标识](./ch04-entity.md)
- [第 5 章：Component 与 Storage — 数据与内存](./ch05-component-storage.md)
- [第 6 章：Archetype — 组合索引与实体迁移](./ch06-archetype.md)
- [第 7 章：Query — 高效的数据查询引擎](./ch07-query.md)
- [第 8 章：System — 函数即系统的魔法](./ch08-system.md)
- [第 9 章：Schedule — 系统编排与自动并行](./ch09-schedule.md)
- [第 10 章：变更检测 — 零成本追踪](./ch10-change-detection.md)

---

# 第三部分：ECS 的通信与关系

- [第 11 章：Commands — 延迟执行](./ch11-commands.md)
- [第 12 章：Event、Message 与 Observer — 三种通信模型](./ch12-event-observer.md)
- [第 13 章：Relationship 与 Hierarchy — 实体间的纽带](./ch13-relationship.md)

---

# 第四部分：ECS 驱动的引擎子系统

- [第 14 章：渲染架构 — 双 World 与 Extract 模式](./ch14-render.md)
- [第 15 章：Transform 系统](./ch15-transform.md)
- [第 16 章：Asset 系统](./ch16-asset.md)
- [第 17 章：Input 系统](./ch17-input.md)
- [第 18 章：State 系统](./ch18-state.md)
- [第 19 章：UI 系统](./ch19-ui.md)
- [第 20 章：PBR 渲染](./ch20-pbr.md)
- [第 21 章：动画、场景与文本](./ch21-animation-scene-text.md)

---

# 第五部分：ECS 高级主题

- [第 22 章：Reflect — ECS 的运行时镜像](./ch22-reflect.md)
- [第 23 章：并发模型](./ch23-concurrency.md)
- [第 24 章：诊断与调试](./ch24-diagnostics.md)
- [第 25 章：跨平台与 no_std](./ch25-cross-platform.md)
- [第 26 章：Bevy 中的 Rust 设计模式总结](./ch26-rust-patterns.md)

---

# 附录

- [附录 A：ECS 术语对照表](./appendix-a-glossary.md)
- [附录 B：SystemParam 速查](./appendix-b-system-param.md)
- [附录 C：内置 Schedule / SystemSet 一览](./appendix-c-schedules.md)
- [附录 D：StorageType 选择指南](./appendix-d-storage-type.md)
- [附录 E：常见 ECS 反模式](./appendix-e-anti-patterns.md)
- [附录 F：Bevy ECS vs 其他 ECS](./appendix-f-comparison.md)
