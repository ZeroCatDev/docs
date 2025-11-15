---
title: 如何为程序添加 Classworks KV
---

# 如何为程序添加 Classworks KV

> 以作者39分的高二高分高分高分作文水平写的文档，让我们直接开始！

## 快速入门

### 第一步：注册开发者账户

首先，在[零猫社区](https://zerocat.dev)中注册一个账户，设置个人信息，在右上角点击头像，点击设置，打开[设置页面](https://zerocat.dev/app/account)，点击[开发者](https://zerocat.dev/app/account/developer)，创建一个[ZeroCat OAuth](https://zerocat.dev/app/oauth/applications)（放心你并不需要学习什么是OAuth），新建一个应用，填写信息。

然后，你会看到右上角有"客户端ID"，比如我的测试应用ID为`a879667ee1b3d40ea3f52417b60d310e`，将其作为应用ID复制备用。

### 第二步：理解基础概念

**BaseURL**: 下述及文档中述任何请求都应相对于
```
https://kv-service.wuyuan.dev
```

**核心概念**：
- **命名空间 (namespace)**: 设备的唯一标识符，用户可以自定义
- **授权码/密码**: 设备管理员设置的访问密码
- **应用ID (appId)**: 你在零猫社区创建的应用标识符
- **Token**: 获取后用于访问KV存储的访问凭证

## 获取访问令牌

这是最简单的方式，用户只需要**命名空间**和**授权码**即可获取token。

**接口**: `POST /apps/auth/token`

**请求体**:
```json
{
  "namespace": "用户填写的命名空间",
  "password": "用户填写的密码",
  "appId": "你的应用id"
}
```

**成功响应**:
```json
{
  "success": true,
  "token": "[获取到的token]",
  "deviceType": "[此令牌的设备类型]",
  "isReadOnly": false,
  "installedAt": "2025-01-01T00:00:00.000Z"
}
```

其中`deviceType`可以是：
- `classroom` - 班级一体机
- `student` - 学生
- `teacher` - 教师
- `parent` -


## KV操作

获取token后，你就可以进行KV存储操作了！所有KV操作都需要在请求头中携带token：

```
Authorization: Bearer <your-token>
```

或者在query中携带?token=

### 获取设备信息
```bash
GET /kv/_info
```

### 获取所有键名列表
```bash
GET /kv/_keys
```

### 读取单个键值
```bash
GET /kv/my-key
```

### 写入键值
```bash
POST /kv/my-key
Content-Type: application/json

{
  "name": "张三",
  "age": 18,
  "courses": ["数学", "物理"]
}
```

### 删除键值
```bash
DELETE /kv/my-key
```

## 错误处理

### 常见错误码

| 状态码 | 描述 | 解决方案 |
|--------|------|----------|
| 401 | 未授权，token无效或过期 | 重新获取token |
| 403 | 禁止访问，权限不足 | 检查token类型和权限 |
| 404 | 资源不存在 | 检查键名或设备是否存在 |
| 429 | 请求过于频繁 | 减少请求频率，查看响应头中的限制信息 |

### 错误响应格式

```json
{
  "error": "错误类型",
  "message": "详细错误信息",
  "details": "额外的错误详情（可选）"
}
```

### 限流信息

响应头中会包含限流信息：
- `ratelimit-policy`: 限流策略
- `retry-after`: 建议重试时间
- `ratelimit`: 当前限流状态
