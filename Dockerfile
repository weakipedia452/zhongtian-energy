FROM node:20-alpine

WORKDIR /app

# 安装 pnpm
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

# 复制 package.json
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 构建
RUN pnpm run build

# 暴露端口
EXPOSE 5000

# 启动
CMD ["pnpm", "run", "start"]
