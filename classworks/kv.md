---
title: Classworks KV 接口文档
---
# Classworks KV 接口文档

## 概述

Classworks KV 提供了一个基于 Key-Value 存储的 REST API，允许用户按命名空间和键名存储、检索、更新和删除数据。

## 认证

API 可以使用站点密钥进行保护。当站点密钥启用时，所有请求需要包含以下 HTTP 头：

```
X-Site-Key: <站点密钥>
```


## 基础 URL

所有 API 请求的基础 URL：

```
http://your-server-address/
```
## 概念

`namespace`用于区分不同用户的空间，原则上其值应为标准的 UUID v4 格式，其不需要预先注册，你需要保证生成的uuid安全性，请不要使用简单随机数自行生成。


`key`是用于指定资源的标识符，也称为键，其值应为字符串，我们建议您以程序名称作为开头，例如：`classworks-config`或`cses-main`等，这些值应当是可预测的，以便于管理


`value`是存储在键下的数据，其值必须为JSON


## 错误处理

API 使用标准的 HTTP 状态码表示请求状态：

- `200 OK` - 请求成功
- `204 No Content` - 删除操作成功
- `400 Bad Request` - 请求格式错误
- `401 Unauthorized` - 认证失败
- `403 Forbidden` - 无权限访问
- `404 Not Found` - 资源不存在
- `408 Request Timeout` - 请求处理超时
- `500 Internal Server Error` - 服务器内部错误

一般的，相应代码不是 200 则均应认为是错误
错误响应格式：

```json
{
  "success": false,
  "message": "未找到命名空间 'namespace' 下键名为 'key' 的记录"
}
```

## API 端点

### 列出命名空间中的键

获取指定命名空间下的所有键名及元数据。

```
GET /:namespace
```

#### 请求参数

**URL 参数：**

- `namespace` (必需): 命名空间标识符

**查询参数：**

- `sortBy` (可选): 排序字段，默认为 `key`
- `sortDir` (可选): 排序方向，`asc` 或 `desc`，默认为 `asc`
- `limit` (可选): 返回结果数量限制，默认为 100
- `skip` (可选): 跳过的结果数量，用于分页，默认为 0

#### 响应

**状态码：** 200 OK

```json
{
  "items": [
    {
      "namespace": "example-uuid",
      "key": "example-key",
      "metadata": {
        "creatorIp": "127.0.0.1",
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z"
      }
    }
  ],
  "total_rows": 10,
  "load_more": "/example-uuid?sortBy=key&sortDir=asc&limit=100&skip=100"
}
```

- `items`: 键名及其元数据的数组
- `total_rows`: 命名空间中的总记录数
- `load_more`: 如果有更多数据，提供获取下一页数据的链接

### 获取键值

通过命名空间和键名获取值。

```
GET /:namespace/:key
```

#### 请求参数

**URL 参数：**

- `namespace` (必需): 命名空间标识符
- `key` (必需): 键名

#### 响应

**状态码：** 200 OK

```json
{
  "field1": "value1",
  "field2": "value2"
}
```

如果键不存在，返回 404 Not Found。

### 获取键元数据

获取某个键的元数据信息，不包括值。

```
GET /:namespace/:key/metadata
```

#### 请求参数

**URL 参数：**

- `namespace` (必需): 命名空间标识符
- `key` (必需): 键名

#### 响应

**状态码：** 200 OK

```json
{
  "namespace": "example-namespace",
  "key": "example-key",
  "metadata": {
    "creatorIp": "127.0.0.1",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

如果键不存在，返回 404 Not Found。

### 创建或更新键值

在指定命名空间下创建或更新键值。

```
POST /:namespace/:key
```

#### 请求参数

**URL 参数：**

- `namespace` (必需): 命名空间标识符
- `key` (必需): 键名

**请求体：**

以 JSON 格式提供键值内容。

```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### 响应

**状态码：** 200 OK

```json
{
  "namespace": "example-namespace",
  "key": "example-key",
  "created": true,
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

- `created`: 表示是否新创建了键值（`true`）或更新了现有键值（`false`）

### 删除键值

删除指定命名空间下的键值对。

```
DELETE /:namespace/:key
```

#### 请求参数

**URL 参数：**

- `namespace` (必需): 命名空间标识符
- `key` (必需): 键名

#### 响应

**状态码：** 204 No Content

如果删除成功，返回空响应体。
如果键不存在，返回 404 Not Found。

## 限制

- 命名空间 `00000000-0000-4000-8000-000000000000` 是系统保留的，用于存储站点配置信息，普通用户无法直接访问。
- 请求处理超时设置为 30 秒，超过此时间的请求将收到 408 Request Timeout 响应。