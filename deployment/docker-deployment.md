---
title: Docker部署
description: 使用Docker部署ZeroCat社区
---

# Docker部署

本文档介绍如何使用Docker和Docker Compose部署ZeroCat项目。

## 前提条件

- 安装Docker：[Docker安装指南](https://docs.docker.com/get-docker/)
- 安装Docker Compose：[Docker Compose安装指南](https://docs.docker.com/compose/install/)

## 使用Docker Compose部署

1. 确保您已配置好`.env`文件（参考[基础配置](./basic-config.md)）。

2. 项目根目录下已包含`docker-compose.yml`文件，内容如下：

```yaml
version: '3'

services:
  app:
    build: .
    ports:
      - "${PORT:-3000}:3000"
    environment:
      - NODE_ENV=${NODE_ENV:-production}
    depends_on:
      - db
    restart: always
    volumes:
      - ./:/app
      - /app/node_modules

  db:
    image: mysql:8.0
    ports:
      - "3306:3306"
    environment:
      - MYSQL_ROOT_PASSWORD=${DB_ROOT_PASSWORD}
      - MYSQL_DATABASE=${DB_NAME}
      - MYSQL_USER=${DB_USER}
      - MYSQL_PASSWORD=${DB_PASSWORD}
    volumes:
      - db_data:/var/lib/mysql
    restart: always

volumes:
  db_data:
```

3. 启动服务：

```bash
docker-compose up -d
```

4. 查看日志：

```bash
docker-compose logs -f
```

## 生产环境部署建议

对于生产环境，建议进行以下配置：

1. 配置HTTPS：

在nginx配置中添加SSL证书，或使用Traefik等工具自动管理证书。

2. 调整容器资源限制：

```yaml
services:
  app:
    # 其他配置...
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
```

3. 设置数据备份策略：

设置定期备份MySQL数据的cron任务。

## 故障排除

如果遇到问题，可以尝试以下步骤：

1. 检查容器状态：

```bash
docker-compose ps
```

2. 查看容器日志：

```bash
docker-compose logs app
docker-compose logs db
```

3. 重启服务：

```bash
docker-compose restart
```