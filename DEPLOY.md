# 腾讯云 Serverless 部署脚本

## 前置准备

1. 安装腾讯云 CLI：
```bash
npm install -g serverless
```

2. 登录腾讯云：
```bash
sls login
```

## 部署步骤

### 1. 安装依赖
```bash
pnpm install
```

### 2. 构建项目
```bash
pnpm run build
```

### 3. 部署到腾讯云
```bash
sls deploy
```

### 4. 查看部署信息
```bash
sls info
```

### 5. 移除部署（可选）
```bash
sls remove
```

## 配置自定义域名

部署完成后，在腾讯云控制台配置：

1. 访问：https://console.cloud.tencent.com/sls
2. 找到 `zhongtian-energy` 应用
3. 点击"触发器管理"
4. 添加 API 网关触发器
5. 绑定自定义域名：www.zhongtian.com
6. 配置 SSL 证书（可在腾讯云免费申请）

## DNS 配置

在域名管理面板添加：

**A 记录**：
- 主机记录：www
- 记录类型：A
- 记录值：API 网关提供的 IP 地址

或

**CNAME**：
- 主机记录：www
- 记录类型：CNAME
- 记录值：API 网关提供的域名

## 环境变量

如需配置环境变量，在 serverless.yml 中添加：

```yaml
inputs:
  env:
    NODE_ENV: production
    # 其他环境变量...
```

## 注意事项

1. 首次部署需要授权腾讯云访问权限
2. 默认区域为广州（ap-guangzhou），可根据需要修改
3. 内存默认 512MB，可根据需要调整
4. 超时时间默认 30 秒
