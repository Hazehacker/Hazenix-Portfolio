---
title: "拾光进销存"
role: "Backend Developer"
summary: "企业级进销存管理系统，Spring Cloud Alibaba 微服务架构，提供采购、库存、销售、财务管理"
tech:
  - "Spring Cloud Alibaba"
  - "Spring Boot"
  - "MySQL"
  - "Redis"
links:
  github: "https://github.com/Hazehacker/psi"
  demo: ""
weight: 4
current: true
---

面向中小企业的企业级进销存管理系统，提供采购管理、库存管理、销售管理、财务管理等功能，为企业提供高效、稳定的进销存解决方案。

## 项目亮点

- **Excel 导出**：封装通用流式导出组件，通过游标分页查询、复用样式池、流式写出、GZIP 同步压缩，解决了大数据量导出的**内存溢出问题**，同时减少网络带宽占用
- **缓存**：对高频统计数据做缓存处理，显著提升大数据量报表的响应速度；针对**缓存击穿**采用逻辑过期策略，针对**缓存雪崩**使用动态 TTL 分散过期时间
- **报表系统**：开发采购报表、销售报表、库存报表、财务报表，提供多维度数据统计功能；针对复杂联查，采用 **"主表聚合 + 明细分组"** 两层查询设计，降低数据库负载

## 技术架构

- **微服务架构**：Spring Cloud Alibaba、Nacos、Sentinel、Seata
- **后端**：Spring Boot + MyBatis Plus
- **数据库**：MySQL 8.0、FastDFS
- **缓存**：Redis（缓存统计报表、逻辑过期防击穿、动态 TTL 防雪崩）
