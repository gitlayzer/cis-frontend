# CIS(Container Image Sync) 容器镜像同步平台
CIS(Container Image Sync) 是一个开源的容器镜像同步平台，用于同步容器镜像到多个仓库，核心功能用于镜像仓库的迁移与同步，平台为前后端分离项目，技术栈如下

前端：React + Ant Design + TailwindCSS + Typescript + Vite + Axios + React-Router-Dom

后端：Go + Gin + Gorm + MySQL + JWT + Cobra + Cron

## 功能列表
- &#x2705; 支持任意标准 docker v2 格式的镜像仓库
- &#x2705; 支持将一个镜像从同步到多个不同的镜像仓库
- &#x2705; 支持定时同步镜像，支持手动同步镜像
- &#x2705; 支持多用户隔离工作流，支持不同用户管理不同工作流

## Feature
- [x] 支持工作流代理功能
- [x] 支持从多个仓库同步镜像到目标仓库
- [x] 支持镜像仓库管理镜像
- [x] ...

## 快速开始
### 构建前端
```shell
# 克隆项目
git clone https://github.com/gitlayzer/cis-frontend.git

# 安装依赖
pnpm install

# 打包项目
pnpm run build

# 将构建出来的文件放到 nginx 的 /usr/share/nginx/html 下即可
cp -r dist/* /usr/share/nginx/html/
```