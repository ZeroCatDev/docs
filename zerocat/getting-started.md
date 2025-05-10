---
title: 开始使用
description: ZeroCat社区部署入门指南
---

# 开始使用

ZeroCat是一个轻量级的在线编程、分享平台。本文档将引导您完成部署过程。

## 系统要求

- Node.js 14+
- npm 或 yarn
- 数据库（MySQL/PostgreSQL）
- Docker（可选，推荐）

## 部署方式

ZeroCat支持两种主要的部署方式：

### 1. Docker部署（推荐）

使用Docker是最简单、最一致的部署方式：

```docker-compose
version: '3'
services:
  zerocat:
    restart: always
    image: sunwuyuan/zerocat:latest
    container_name: zerocat
    env:
      - NODE_ENV=production
      - DATABASE_URL=mysql://root:password@127.0.0.1:3306/zerocat
    ports:
      - 127.0.0.1:3000:3000
```

访问 http://localhost:3000 即可使用ZeroCat。


### 2. 手动部署

如果您希望更细粒度地控制部署过程，可以选择手动部署：

```bash
# 克隆仓库
git clone https://github.com/ZeroCatDev/ZeroCat.git
cd ZeroCat

# 安装依赖
pnpm install

# 配置环境变量
cp .env.example .env
# 编辑.env文件

# 初始化数据库
npm run db:push

# 启动项目
npm start
```

对于生产环境，建议使用PM2等进程管理工具：

```bash
# 安装PM2
npm install -g pm2

# 使用PM2启动应用
pm2 start npm --name "zerocat" -- start

# 配置PM2自启动
pm2 startup
pm2 save
```
