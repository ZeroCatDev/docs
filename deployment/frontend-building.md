---
title: 前端构建
description: ZeroCat社区前端构建指南
---

# 前端构建

本文档介绍如何构建ZeroCat的前端部分。

## 前提条件

- Node.js 14+
- npm 或 yarn
- 已克隆的ZeroCat代码仓库

## 构建步骤

1. 安装依赖

```bash
git clone https://github.com/ZeroCatDev/zerocat-frontend.git
# 进入前端目录
cd zerocat-frontend

# 安装依赖
pnpm install

```

2. 开发模式

在开发过程中，您可以使用以下命令启动开发服务器：

```bash
pnpm run dev

```

这将启动一个开发服务器，在 http://localhost:3141 上可以访问。

3. 生产构建

当您准备部署到生产环境时，可以使用以下命令构建前端：

```bash
pnpm run build

```

构建完成后，所有静态文件将生成在 `dist` 目录中。

## 自定义配置

```env
VITE_APP_BASE_API=https://localhost:3000
VITE_APP_GEEID=
VITE_APP_SCRATCH_PROXY=https://scratch.192325.xyz
VITE_APP_SCRATCH_PROXY_GUI=https://scratch-editor.192325.xyz
VITE_APP_ALGOLIA_APP_ID=
VITE_APP_ALGOLIA_API_KEY=
VITE_APP_ALGOLIA_INDEX_NAME=
VITE_APP_CLARITY_PROJECT_ID=
VITE_APP_S3_BUCKET=https://example-bucket.s3.amazonaws.com
```
