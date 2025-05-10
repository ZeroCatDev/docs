---
title: 故障排查指南
description: 常见部署问题的故障排查指南
---

# 故障排查指南

本文档提供了ZeroCat部署中常见问题的故障排查步骤。

## 应用无法启动

### 症状
应用程序无法启动，或在启动后立即崩溃。

### 可能的原因和解决方案

1. **环境变量配置错误**

   检查`.env`文件或环境变量是否正确设置：

   ```bash
   # 确认环境变量文件存在且权限正确
   ls -la .env

   # 查看环境变量
   cat .env
   ```

2. **依赖项安装不完整**

   尝试重新安装依赖：

   ```bash
   rm -rf node_modules
   pnpm cache clean --force
   pnpm install
   ```

3. **端口已被占用**

   检查端口是否被其他应用占用：

   ```bash
   # 检查3000端口是否被占用
   netstat -tuln | grep 3000

   # 查找使用该端口的进程
   lsof -i :3000

   # 终止该进程
   kill -9 <进程ID>
   ```

## 数据库连接错误

### 症状
应用程序报告无法连接到数据库，日志中有数据库连接错误。

### 可能的原因和解决方案

1. **数据库未运行**

   检查数据库服务是否正在运行：

   ```bash
   # 对于MySQL
   sudo systemctl status mysql

   # 启动MySQL服务
   sudo systemctl start mysql
   ```

2. **数据库凭据错误**

   验证数据库用户名和密码：

   ```bash
   # 尝试使用配置的凭据手动连接
   mysql -u zerocat -p -h localhost
   ```

3. **数据库权限问题**

   确保数据库用户具有所需的权限：

   ```sql
   GRANT ALL PRIVILEGES ON zerocat_db.* TO 'zerocat'@'localhost';
   FLUSH PRIVILEGES;
   ```

4. **防火墙阻止连接**

   检查防火墙规则：

   ```bash
   # 对于UFW
   sudo ufw status

   # 允许MySQL连接
   sudo ufw allow mysql
   ```


## 性能问题

### 症状
网站响应缓慢，或在高负载下崩溃。

### 可能的原因和解决方案

1. **资源不足**

   检查服务器资源使用情况：

   ```bash
   # 检查CPU和内存使用
   top

   # 检查磁盘空间
   df -h
   ```

2. **日志文件过大**

   检查和轮换日志文件：

   ```bash
   # 查找大文件
   find /var/log -type f -size +100M

   # 配置日志轮换
   sudo nano /etc/logrotate.d/zerocat
   ```

3. **数据库查询优化**

   使用慢查询日志找出慢查询：

   ```bash
   # 开启MySQL慢查询日志
   sudo nano /etc/mysql/my.cnf

   # 添加以下配置
   slow_query_log = 1
   slow_query_log_file = /var/log/mysql/mysql-slow.log
   long_query_time = 2
   ```

## Docker相关问题

### 症状
Docker容器启动失败或运行异常。

### 可能的原因和解决方案

1. **Docker构建失败**

   检查Dockerfile和构建日志：

   ```bash
   docker build -t zerocat .
   ```

2. **容器无法连接到其他服务**

   检查Docker网络：

   ```bash
   # 查看Docker网络
   docker network ls

   # 检查容器IP地址
   docker inspect zerocat-app | grep IPAddress
   ```

3. **容器日志检查**

   查看容器日志：

   ```bash
   docker logs zerocat-app

   # 持续跟踪日志
   docker logs -f zerocat-app
   ```

## 安全相关问题

### 症状
出现安全警告，或怀疑有安全漏洞。

### 可能的原因和解决方案

1. **依赖项存在漏洞**

   使用npm audit检查漏洞：

   ```bash
   npm audit

   # 修复漏洞
   npm audit fix
   ```

2. **异常登录尝试**

   检查认证日志：

   ```bash
   grep "Failed password" /var/log/auth.log
   ```

3. **SSL证书过期**

   检查并更新SSL证书：

   ```bash
   # 查看证书信息
   openssl x509 -in /etc/letsencrypt/live/your-domain.com/cert.pem -text -noout | grep "Not After"

   # 更新证书
   sudo certbot renew
   ```

## 日志检查技巧

有效的日志分析能帮助快速定位问题：

```bash
# 实时查看应用日志
tail -f logs/app.log

# 筛选错误日志
grep -i error logs/app.log

# 使用journalctl查看系统服务日志
journalctl -u zerocat.service -f
```

## 获取帮助

如果仍无法解决，可以通过以下渠道获取支持：

- GitHub Issues: [https://github.com/ZeroCatDev/ZeroCat/issues](https://github.com/ZeroCatDev/ZeroCat/issues)
- QQ群: 964979747