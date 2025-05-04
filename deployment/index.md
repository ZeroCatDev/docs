---
title: 部署指南
description: ZeroCat社区部署文档概览
---

# ZeroCat部署指南

欢迎使用ZeroCat社区部署文档。本文档将指导您完成ZeroCat社区平台的部署、配置和维护过程。

## 文档目录

### 开始

- [开始使用](./getting-started.md) - 快速入门指南
- [基础配置](./basic-config.md) - 环境变量和数据库配置

### 部署方式

- [Docker部署](./docker-deployment.md) - 使用Docker和Docker Compose部署
- [手动部署](./manual-deployment.md) - 在服务器上手动部署的详细步骤

### 进阶配置

- [安全配置](./security.md) - 安全最佳实践和配置建议
- [扩展部署](./scaling.md) - 扩展应用以支持更多用户

### 维护与支持

- [故障排查](./troubleshooting.md) - 常见问题的排查与解决方案

## 系统要求

ZeroCat社区平台的最低系统要求：

- **操作系统**: Linux (推荐Ubuntu 20.04+)
- **内存**: 最小1GB，推荐2GB+
- **CPU**: 1核以上
- **存储**: 10GB+
- **软件**: Node.js 14+, npm, MySQL/PostgreSQL

## 选择部署方式

我们提供多种部署方式，您可以根据自己的需求和经验选择合适的方式：

1. **Docker部署** - 最简单的方式，适合不想处理依赖关系的用户
2. **手动部署** - 更灵活，适合希望完全控制部署过程的用户
3. **扩展部署** - 适合需要支持大量用户的生产环境

## 获取帮助

如果在部署过程中遇到问题，请参考[故障排查](./troubleshooting.md)文档。如果仍无法解决，可以通过以下渠道获取支持：

- GitHub Issues: [https://github.com/ZeroCatDev/ZeroCat/issues](https://github.com/ZeroCatDev/ZeroCat/issues)
- QQ群: 964979747