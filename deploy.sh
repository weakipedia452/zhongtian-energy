#!/bin/bash
set -e

echo "=== 开始部署 ==="

# 安装依赖
echo "Installing dependencies..."
npm install

# 构建
echo "Building project..."
npm run build

# 启动服务
echo "Starting server..."
npm run start
