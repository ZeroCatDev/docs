---
title: 手动部署
description: 手动部署ZeroCat社区的详细指南
---

# 手动部署

本文档介绍如何在服务器上手动部署ZeroCat项目。

## 前提条件

- Node.js 14+
- npm 或 yarn
- MySQL/PostgreSQL
- Nginx (推荐用于生产环境)
- 一台Linux服务器 (推荐Ubuntu 20.04 LTS)

## 步骤 1: 准备服务器环境

1. 更新服务器:

```bash
sudo apt update
sudo apt upgrade -y
```

2. 安装Node.js和npm:

```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs
```

3. 安装MySQL:

```bash
sudo apt install -y mysql-server
sudo mysql_secure_installation
```

## 步骤 2: 克隆和配置项目

1. 克隆代码库:

```bash
git clone https://github.com/ZeroCatDev/ZeroCat.git
cd ZeroCat
```

2. 安装依赖:

```bash
npm install
```

3. 配置环境变量 (参考[基础配置](./basic-config.md)):

```bash
cp .env.example .env
nano .env
```

4. 创建数据库和用户 (按照基础配置文档中的指示)

5. 初始化数据库:

```bash
npm run db:migrate
```

## 步骤 3: 使用PM2部署应用

1. 安装PM2:

```bash
npm install -g pm2
```

2. 启动应用:

```bash
pm2 start npm --name "zerocat" -- start
```

3. 配置PM2自启动:

```bash
pm2 startup
pm2 save
```

## 步骤 4: 配置Nginx

1. 安装Nginx:

```bash
sudo apt install -y nginx
```

2. 创建Nginx配置文件:

```bash
sudo nano /etc/nginx/sites-available/zerocat
```

3. 添加以下配置:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

4. 启用站点配置:

```bash
sudo ln -s /etc/nginx/sites-available/zerocat /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 步骤 5: 配置SSL (推荐)

使用Let's Encrypt配置HTTPS:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 维护和更新

### 日志查看

```bash
pm2 logs zerocat
```

### 应用更新

```bash
cd /path/to/ZeroCat
git pull
npm install
npm run build
pm2 restart zerocat
```

## 故障排除

如果遇到问题，请检查:

1. 应用日志: `pm2 logs zerocat`
2. Nginx日志: `sudo tail -f /var/log/nginx/error.log`
3. 系统日志: `sudo journalctl -u nginx`