---
title: 安全配置
description: ZeroCat社区的安全配置和最佳实践
---

# 安全配置

本文档提供了ZeroCat部署时的安全配置和最佳实践建议。

## 基础安全措施

### 1. 保持系统和依赖更新

定期更新系统和项目依赖：

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 更新npm依赖
npm audit fix
```

### 2. 配置强密码策略

- 为数据库用户设置强密码
- 使用随机生成的长字符串作为JWT密钥
- 定期轮换密钥和密码

### 3. 限制文件权限

确保项目文件权限适当设置：

```bash
# 设置适当的文件权限
chmod -R 750 /path/to/ZeroCat
chmod 640 /path/to/ZeroCat/.env
```

## 网络安全

### 1. 配置防火墙

使用UFW配置防火墙：

```bash
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw enable
```

### 2. 启用HTTPS

- 使用Let's Encrypt获取免费SSL证书（参见[手动部署](./manual-deployment.md)文档）
- 配置HSTS头部
- 强制所有HTTP请求重定向到HTTPS

### 3. 配置安全头部

在Nginx配置中添加安全头部：

```nginx
add_header X-Content-Type-Options nosniff;
add_header X-Frame-Options SAMEORIGIN;
add_header X-XSS-Protection "1; mode=block";
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';";
```

## 应用程序安全

### 1. 输入验证

确保所有用户输入在服务器端得到适当验证和清理。

### 2. 跨站请求伪造(CSRF)保护

在所有表单和API请求中添加CSRF令牌。

### 3. 限速和防暴力破解

配置请求限速以防止暴力破解和DOS攻击：

```javascript
// 示例限速中间件配置
const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100, // 每个IP最多100个请求
  message: "请求过多，请稍后再试"
});

app.use("/api/", apiLimiter);
```

## 数据库安全

### 1. 备份策略

实施定期备份：

```bash
# 创建备份脚本
cat > /path/to/backup.sh << 'EOF'
#!/bin/bash
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
mysqldump -u backup_user -p'backup_password' zerocat_db > /path/to/backups/zerocat_${TIMESTAMP}.sql
find /path/to/backups/ -type f -name "zerocat_*.sql" -mtime +7 -delete
EOF

chmod +x /path/to/backup.sh

# 添加到crontab
echo "0 2 * * * /path/to/backup.sh" | crontab -
```

### 2. 最小权限原则

为应用程序创建具有所需最小权限的数据库用户。

## 监控和日志

### 1. 设置日志监控

使用ELK栈或类似工具监控日志：

```bash
# 安装filebeat
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
sudo apt install apt-transport-https
echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-7.x.list
sudo apt update && sudo apt install filebeat
```

### 2. 定期安全审计

定期检查日志文件，查找可疑活动：

```bash
# 检查登录失败
grep "Failed password" /var/log/auth.log
```

## 常见问题与解决方案

### 1. 处理XSS漏洞

- 使用内容安全策略（CSP）
- 对所有输出进行HTML转义
- 使用安全的模板引擎

### 2. 防止SQL注入

- 使用参数化查询或预处理语句
- 使用ORM框架
- 避免动态构建SQL查询