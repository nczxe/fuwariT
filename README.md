# 🍥Fuwari  
![Node.js >= 20](https://img.shields.io/badge/node.js-%3E%3D20-brightgreen) 
![pnpm >= 9](https://img.shields.io/badge/pnpm-%3E%3D9-blue) 
[![DeepWiki](https://img.shields.io/badge/DeepWiki-saicaca%2Ffuwari-blue.svg?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAyCAYAAAAnWDnqAAAAAXNSR0IArs4c6QAAA05JREFUaEPtmUtyEzEQhtWTQyQLHNak2AB7ZnyXZMEjXMGeK/AIi+QuHrMnbChYY7MIh8g01fJoopFb0uhhEqqcbWTp06/uv1saEDv4O3n3dV60RfP947Mm9/SQc0ICFQgzfc4CYZoTPAswgSJCCUJUnAAoRHOAUOcATwbmVLWdGoH//PB8mnKqScAhsD0kYP3j/Yt5LPQe2KvcXmGvRHcDnpxfL2zOYJ1mFwrryWTz0advv1Ut4CJgf5uhDuDj5eUcAUoahrdY/56ebRWeraTjMt/00Sh3UDtjgHtQNHwcRGOC98BJEAEymycmYcWwOprTgcB6VZ5JK5TAJ+fXGLBm3FDAmn6oPPjR4rKCAoJCal2eAiQp2x0vxTPB3ALO2CRkwmDy5WohzBDwSEFKRwPbknEggCPB/imwrycgxX2NzoMCHhPkDwqYMr9tRcP5qNrMZHkVnOjRMWwLCcr8ohBVb1OMjxLwGCvjTikrsBOiA6fNyCrm8V1rP93iVPpwaE+gO0SsWmPiXB+jikdf6SizrT5qKasx5j8ABbHpFTx+vFXp9EnYQmLx02h1QTTrl6eDqxLnGjporxl3NL3agEvXdT0WmEost648sQOYAeJS9Q7bfUVoMGnjo4AZdUMQku50McDcMWcBPvr0SzbTAFDfvJqwLzgxwATnCgnp4wDl6Aa+Ax283gghmj+vj7feE2KBBRMW3FzOpLOADl0Isb5587h/U4gGvkt5v60Z1VLG8BhYjbzRwyQZemwAd6cCR5/XFWLYZRIMpX39AR0tjaGGiGzLVyhse5C9RKC6ai42ppWPKiBagOvaYk8lO7DajerabOZP46Lby5wKjw1HCRx7p9sVMOWGzb/vA1hwiWc6jm3MvQDTogQkiqIhJV0nBQBTU+3okKCFDy9WwferkHjtxib7t3xIUQtHxnIwtx4mpg26/HfwVNVDb4oI9RHmx5WGelRVlrtiw43zboCLaxv46AZeB3IlTkwouebTr1y2NjSpHz68WNFjHvupy3q8TFn3Hos2IAk4Ju5dCo8B3wP7VPr/FGaKiG+T+v+TQqIrOqMTL1VdWV1DdmcbO8KXBz6esmYWYKPwDL5b5FA1a0hwapHiom0r/cKaoqr+27/XcrS5UwSMbQAAAABJRU5ErkJggg==)](https://deepwiki.com/saicaca/fuwari)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fsaicaca%2Ffuwari.svg?type=shield&issueType=license)](https://app.fossa.com/projects/git%2Bgithub.com%2Fsaicaca%2Ffuwari?ref=badge_shield&issueType=license)

一个使用 [Astro](https://astro.build) 构建的静态博客模板。

[**🖥️ 在线预览（Vercel）**]([https://fuwari.vercel.app/])

![预览图片](https://raw.githubusercontent.com/saicaca/resource/main/fuwari/home.png)

## ✨ 特性

- [x] 使用 [Astro](https://astro.build) 和 [Tailwind CSS](https://tailwindcss.com) 构建
- [x] 流畅的动画和页面过渡效果
- [x] 浅色 / 深色模式
- [x] 可自定义主题颜色和横幅
- [x] 响应式设计
- [x] 使用 [Pagefind](https://pagefind.app/) 实现搜索功能
- [x] [Markdown 扩展功能](https://github.com/saicaca/fuwari?tab=readme-ov-file#-markdown-extended-syntax)
- [x] 文章目录
- [x] RSS 订阅

## 🚀 快速开始

1. 创建你的博客仓库：
    - [从模板生成新仓库](https://github.com/saicaca/fuwari/generate) 或 fork 此仓库。
    - 或者运行以下命令之一：
       ```sh
       npm create fuwari@latest
       yarn create fuwari
       pnpm create fuwari@latest
       bun create fuwari@latest
       deno run -A npm:create-fuwari@latest
       ```
2. 在本地编辑你的博客，克隆仓库后运行 `pnpm install` 安装依赖。
    - 如果你还没有安装 [pnpm](https://pnpm.io)，请先安装：`npm install -g pnpm`
3. 编辑配置文件 `src/config.ts` 来自定义你的博客。
4. 运行 `pnpm new-post <filename>` 创建新文章，并在 `src/content/posts/` 目录中编辑。
5. 按照 [指南](https://docs.astro.build/en/guides/deploy/) 将你的博客部署到 Vercel、Netlify、GitHub Pages 等平台。部署前你需要编辑 `astro.config.mjs` 中的站点配置。

## 📝 文章前置元数据

```yaml
---
title: 我的第一篇博客文章
published: 2023-09-09
description: 这是我新 Astro 博客的第一篇文章。
image: ./cover.jpg
tags: [Foo, Bar]
category: 前端
draft: false
lang: jp      # 仅当文章语言与 `config.ts` 中的站点语言不同时设置
---
```

## 🧩 Markdown 扩展语法

除了 Astro 默认支持的 [GitHub Flavored Markdown](https://github.github.com/gfm/)，还包含了一些额外的 Markdown 功能：

- 提示框（Admonitions）([预览和使用方法](https://blog.tncrr.us.kg/posts/markdown-extended/#admonitions))
- GitHub 仓库卡片 ([预览和使用方法](https://blog.tncrr.us.kg/posts/markdown-extended/#github-repository-cards))
- 使用 Expressive Code 增强的代码块 ([预览](https://blog.tncrr.us.kg/posts/expressive-code/) / [文档](https://expressive-code.com/))

## ⚡ 命令

所有命令都在项目根目录下运行：

| 命令                    | 操作                                              |
|:---------------------------|:----------------------------------------------------|
| `pnpm install`             | 安装依赖                               |
| `pnpm dev`                 | 启动本地开发服务器，地址为 `localhost:4321`         |
| `pnpm build`               | 构建生产版本到 `./dist/` 目录             |
| `pnpm preview`             | 在部署前本地预览构建结果        |
| `pnpm check`               | 检查代码中的错误                  |
| `pnpm format`              | 使用 Biome 格式化代码                        |
| `pnpm new-post <filename>` | 创建新文章                                   |
| `pnpm astro ...`           | 运行 Astro CLI 命令，如 `astro add`、`astro check`    |
| `pnpm astro --help`        | 获取 Astro CLI 帮助                        |

## ✏️ 贡献

查看 [贡献指南](https://github.com/saicaca/fuwari/blob/main/CONTRIBUTING.md) 了解如何为此项目做出贡献。

## 📄 许可证

本项目采用 MIT 许可证。

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fsaicaca%2Ffuwari.svg?type=large&issueType=license)](https://app.fossa.com/projects/git%2Bgithub.com%2Fsaicaca%2Ffuwari?ref=badge_large&issueType=license)
