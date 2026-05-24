---
title: "Next.js 静态导出部署到 GitHub Pages"
date: "2026-05-23"
description: "了解如何配置 Next.js 静态导出并部署到 GitHub Pages"
category: "Tutorial"
tags: ["nextjs", "github-pages", "deployment", "static-export"]
---

# Next.js 静态导出部署到 GitHub Pages

了解如何配置 Next.js 生成静态文件并部署到 GitHub Pages。

## 配置

在 `next.config.js` 中添加以下配置：

```javascript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  trailingSlash: true
}

module.exports = nextConfig
```

## 关键配置项

### output: 'export'

告诉 Next.js 生成静态站点，而非服务端渲染应用。

### images.unoptimized

静态导出时必须配置此项，禁用图片优化 API。

### trailingSlash: true

为所有 URL 添加尾部斜杠，以更好地兼容 GitHub Pages。

## GitHub Actions 工作流

在 `.github/workflows/deploy.yml` 创建工作流文件：

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out
      - uses: actions/deploy-pages@v4
```

## 构建站点

运行构建命令：

```bash
npm run build
```

静态文件将生成在 `out` 目录中，可以直接部署。
