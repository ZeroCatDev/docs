---
title: 基础配置
description: ZeroCat社区的基础配置说明
---

# 基础配置

本文档介绍了ZeroCat项目的基础配置过程。

## 环境变量配置

将项目根目录中的`.env.example`复制为`.env`，并根据需要修改配置：

```bash
# 复制示例环境变量文件
cp .env.example .env

# 编辑环境变量
nano .env
```

### 必要的环境变量

```
# 服务器配置
PORT=3000
NODE_ENV=production

# 数据库配置
DB_HOST=localhost
DB_USER=zerocat
DB_PASSWORD=your_password
DB_NAME=zerocat_db

# JWT密钥
JWT_SECRET=your_jwt_secret_key
```

## 数据库配置

1. 创建数据库：

```sql
CREATE DATABASE zerocat_db;
CREATE USER 'zerocat'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON zerocat_db.* TO 'zerocat'@'localhost';
FLUSH PRIVILEGES;
```

2. 初始化数据库表结构：

```bash
npm run db:migrate
```

3. (可选) 填充示例数据：

```bash
npm run db:seed
```

## 下一步

完成基础配置后，请参考[Docker部署](./docker-deployment.md)或[手动部署](./manual-deployment.md)指南。