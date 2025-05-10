---
title: 配置参考
description: ZeroCat社区的配置参数参考表
---

# 配置参考

本文档提供了ZeroCat社区平台所有配置参数的详细参考。这些配置参数存储在数据库中，用于控制系统的各种功能。

## 配置列表

下表列出了系统配置参数及其示例值。请根据实际部署环境进行相应配置。

| 配置键 | 示例值 | 说明 |
|-------------|----------------------------------|--------------------|
| **S3存储配置** |  |  |
| s3.bucket | your-bucket-name | S3存储桶名称 |
| s3.region | your-region | S3区域标识 |
| s3.endpoint | https://s3.example.com | S3服务端点URL |
| s3.staticurl | https://static.example.com | 静态资源访问URL |
| s3.AWS_ACCESS_KEY_ID |  | AWS访问密钥ID（字符串） |
| s3.AWS_SECRET_ACCESS_KEY |  | AWS密钥（字符串） |
| **CORS配置** |  |  |
| cors | localhost,example.com | 跨域资源共享允许的域名（逗号分隔的字符串） |
| **邮件配置** |  |  |
| mail.from | noreply@example.com | 发件人地址 |
| mail.pass | your-mail-password | 邮箱密码或授权码 |
| mail.user | system@example.com | 邮箱用户名 |
| mail.service | qq | 邮件服务提供商（例如：qq ）请不要使用gmail |
| **站点配置** |  |  |
| site.tos | https://example.com/terms | 服务条款URL |
| site.name | YourSiteName | 站点名称 |
| site.email | contact@example.com | 管理员联系邮箱 |
| site.domain | example.com | 主站点域名 |
| site.slogan | Your Site Slogan | 站点标语 |
| site.privacy | https://example.com/privacy | 隐私政策URL |
| **URL配置** |  |  |
| urls.frontend | http://localhost:3000 | 前端服务URL |
| urls.backend | http://localhost:8080 | 后端API服务URL |
| **评论系统配置** |  |  |
| waline.url | https://comment.example.com | Waline评论系统URL |
| **验证码配置** |  |  |
| captcha.GEE_API_SERVER | https://captcha-api.example.com | 极验验证码API服务器 |
| captcha.GEE_CAPTCHA_ID | 123abc | 极验验证码ID（32位字符串） |
| captcha.GEE_CAPTCHA_KEY | 123abc | 极验验证码密钥（32位字符串） |
| **反馈系统配置** |  |  |
| feedback.txcid | 123456 | 腾讯兔小巢ID（数字） |
| feedback.txckey | AbCdEf12 | 腾讯兔小巢密钥 |
| feedback.qq.link | https://qm.qq.com/example | QQ反馈链接 |
| feedback.qq.group | 123456789 | QQ群号码 |
| feedback.qq.description | 系统支持说明 | QQ群描述信息 |
| **安全配置** |  |  |
| security.jwttoken | abc123 | JWT令牌密钥（随机字符串，至少32位） |
| security.adminuser | admin@example.com | 管理员用户邮箱 |
| security.SessionSecret | abc123 | 会话密钥（随机字符串，至少32位） |
| security.accessTokenExpiry | 3600 | 访问令牌过期时间（秒） |
| security.refreshTokenExpiry | 2592000 | 刷新令牌过期时间（秒，默认30天） |
| security.refreshTokenExtensionEnabled | true | 是否启用刷新令牌延期（布尔值） |
| security.refreshTokenMaxExtensionDays | 90 | 刷新令牌最大延期天数（数字） |
| **主题配置** |  |  |
| theme.mdui.color.primary | #1976d2 | 主题主色调（十六进制颜色值） |
| **OAuth配置** |  |  |
| oauth.enabled | true | 是否启用OAuth登录（布尔值） |
| oauth.google.enabled | true | 是否启用Google登录（布尔值） |
| oauth.google.client_id | 123abc | Google OAuth客户端ID |
| oauth.google.client_secret | abc123 | Google OAuth客户端密钥 |
| oauth.microsoft.enabled | true | 是否启用Microsoft登录（布尔值） |
| oauth.microsoft.client_id | abc123 | Microsoft OAuth客户端ID |
| oauth.microsoft.client_secret | abc123 | Microsoft OAuth客户端密钥 |
| oauth.github.enabled | true | 是否启用GitHub登录（布尔值） |
| oauth.github.client_id | abc123 | GitHub OAuth客户端ID |
| oauth.github.client_secret | abc123 | GitHub OAuth客户端密钥 |
| **地理位置配置** |  |  |
| maxmind.enabled | true | 是否启用MaxMind地理位置服务（布尔值） |
| maxmind.license_key | abc123 | MaxMind授权密钥 |
| maxmind.account_id | 123456 | MaxMind账户ID（数字） |
| **Redis配置** |  |  |
| redis.host | 127.0.0.1 | Redis服务器地址 |
| redis.port | 6379 | Redis服务器端口（数字） |
| redis.password | abc123 | Redis服务器密码 |