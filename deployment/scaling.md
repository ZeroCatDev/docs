---
title: 扩展部署
description: 扩展ZeroCat社区以支持更多用户的方法
---

# 扩展部署

本文档介绍如何扩展ZeroCat部署以支持更多用户和更高负载。

## 垂直扩展 vs 水平扩展

- **垂直扩展**：增加单台服务器的资源（CPU/内存）
- **水平扩展**：增加更多服务器实例

对于ZeroCat，我们推荐结合两种策略。

## 负载均衡

### 使用Nginx作为负载均衡器

1. 安装Nginx：

```bash
sudo apt install -y nginx
```

2. 配置负载均衡：

```nginx
upstream zerocat_backend {
    server 192.168.1.101:3000;
    server 192.168.1.102:3000;
    server 192.168.1.103:3000;
}

server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://zerocat_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        # 添加会话亲和性（如果需要）
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### 使用云服务提供商的负载均衡器

大多数云服务提供商（AWS、Azure、GCP）都提供托管负载均衡服务，如：

- AWS Elastic Load Balancer
- Google Cloud Load Balancing
- Azure Load Balancer

## 数据库扩展

### 主从复制

设置MySQL主从复制以提高读取性能：

1. 在主数据库配置：

```ini
# 编辑my.cnf
server-id = 1
log_bin = mysql-bin
binlog_format = ROW
```

2. 在从数据库配置：

```ini
# 编辑my.cnf
server-id = 2
relay-log = mysql-relay-bin
```

3. 在主数据库创建复制用户：

```sql
CREATE USER 'repl_user'@'%' IDENTIFIED BY 'password';
GRANT REPLICATION SLAVE ON *.* TO 'repl_user'@'%';
FLUSH PRIVILEGES;
```

### 分片和分区

对于大规模部署，考虑：

- 数据库分片（水平分区）
- 垂直分区（按功能分离数据库）

## 缓存策略

### 实现Redis缓存

1. 安装Redis：

```bash
sudo apt install -y redis-server
```

2. 配置Redis持久化：

```bash
# 编辑/etc/redis/redis.conf
appendonly yes
```

3. 在应用程序中集成Redis：

```javascript
const redis = require('redis');
const client = redis.createClient();

// 缓存示例
async function getUserById(id) {
  // 尝试从缓存获取
  const cachedUser = await client.get(`user:${id}`);
  if (cachedUser) {
    return JSON.parse(cachedUser);
  }

  // 从数据库获取
  const user = await db.users.findById(id);

  // 存入缓存（设置过期时间为1小时）
  await client.set(`user:${id}`, JSON.stringify(user), 'EX', 3600);

  return user;
}
```

### 内容分发网络(CDN)

使用CDN分发静态资源：

- Cloudflare
- AWS CloudFront
- Fastly

## 容器编排

### 使用Kubernetes

1. 安装kubectl和Minikube（本地开发）：

```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

2. 创建基本的Kubernetes部署配置（deployment.yaml）：

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: zerocat-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: zerocat
  template:
    metadata:
      labels:
        app: zerocat
    spec:
      containers:
      - name: zerocat
        image: your-registry/zerocat:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
---
apiVersion: v1
kind: Service
metadata:
  name: zerocat-service
spec:
  selector:
    app: zerocat
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```

## 性能监控

### 使用Prometheus和Grafana

1. 安装Prometheus：

```bash
wget https://github.com/prometheus/prometheus/releases/download/v2.30.3/prometheus-2.30.3.linux-amd64.tar.gz
tar xvfz prometheus-2.30.3.linux-amd64.tar.gz
cd prometheus-2.30.3.linux-amd64/
./prometheus
```

2. 安装Grafana：

```bash
sudo apt-get install -y apt-transport-https software-properties-common
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
sudo add-apt-repository "deb https://packages.grafana.com/oss/deb stable main"
sudo apt-get update
sudo apt-get install grafana
sudo systemctl start grafana-server
```

## 自动扩展策略

在云环境中配置自动扩展：

- AWS Auto Scaling Groups
- Google Cloud Autoscaling
- Azure虚拟机规模集

根据以下指标进行自动扩展：
- CPU使用率 > 70%
- 内存使用率 > 80%
- 请求延迟 > 500ms