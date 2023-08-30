# AegisPro 系统单页项目

## 参考

> [Vite 配置](https://cn.vitejs.dev/config/)
>
> [Rollup 配置](https://rollupjs.org/configuration-options/)

## 一、项目介绍

本项目是基于 `vue` & `vite` 的多页面项目，主要是为基于 Django 的系统提供若干前端页面。

项目实际上为各个独立的子页面(子项目)的集合，子页面间毫无关联，但可能会有共同/类似逻辑，可提取为组件、工具函数。后端仅需要使用子页面而非项目本身，每个子页面开发、维护完毕后，需重新打包该子页面

## 二、目录结构

项目位于 `/static/vue-pages`，属于系统的静态文件。其结构如下:

```text
├ .vscode
├ dist/<pagename> 编译输出目录
├ node_modules
├ public 静态资源
├ src 源码目录
│ ├ assets 公共资源目录
│ ├ components 公共组件
│ ├ styles 公共样式
│ ├ utils 工具方法
│ ├ pages/<pagename> 子页面源码目录
│ │ ├ assets
│ │ ├ components
│ │ ├ styles
│ │ ├ App.vue
│ │ ├ index.html 与源码目录同级
│ │ ├ main.js
│ │ ├ styles
│ │ └ vite.config.js 与源码目录同级
│ │
│ ├ main.js 项目入口（无用，按模板启动各自子页面即可）
│ └ App.vue 项目根组件（无用，按模板启动各自子页面即可）
│
├ .eslintrc.js eslint 配置文件
├ .prettierrc.js prettier 配置文件
├ .gitattributes git 文件和目录属性设置
├ .gitignore
├ index.html 项目主页（无用，按模板启动各自子页面即可）
├ refresh-tmpl.js js 脚本，更新对应模板主页中引入的打包资源链接
├ package.json
├ vite.config.js
└ README.md
```

==**注意：**==

- 每个子页面对应于 `src/pages/<pagename>` 目录，页面私有资源、样式、组件等放在该目录下，公共的放在 `src` 下对应目录中。
- 子页面主页放在源码目录下，需更改对 `main.js` 的引入路径为 `./main.js`
- 每个子页面开发、维护完毕后，需重新打包该子页面，输出目录为 `dist/<pagename>`
- 基于 `django` 框架的系统将前端页面放在 `/templates/**/*.html` 下，为适配 `django`，打包后，通过 `refresh-tmpl.js` 脚本，将新的资源文件路径引入更新到目标页面中

## 三、配置

### 1. package.json

```json
{
  "name": "aegis-pro-vue-pages",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --base /",
    "dev:address": "vite serve src/pages/address",
    "dev:person": "vite serve src/pages/person",
    "build:address": "cross-env PAGENAME=address vite build && cross-env PAGENAME=address node refresh-tmpl.js",
    "build:person": "cross-env PAGENAME=person vite build && cross-env PAGENAME=person node refresh-tmpl.js",
    "format": "prettier --write \"src/**/*.{js,ts,jsx,tsx,vue,css,scss,html,htm}\""
  },
  "dependencies": {
    "jquery": "1.12.4",
    "sweetalert": "1.1.3",
    "vue": "3.2.47"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "4.1.0",
    "@vitejs/plugin-vue-jsx": "3.0.1",
    "cheerio": "1.0.0-rc.12",
    "cross-env": "7.0.3",
    "eslint": "8.41.0",
    "eslint-config-prettier": "8.8.0",
    "eslint-plugin-only-warn": "1.1.0",
    "eslint-plugin-prettier": "4.2.1",
    "prettier": "2.8.8",
    "sass": "^1.64.1",
    "vite": "4.3.9"
  }
}
```

==**注意：**==

- 使用 `eslint` & `prettier` 进行代码静态分析与格式化
- 使用 `sweetalert` 作消息提示
- 使用 `cross-env` 设置环境变量 `PAGENAME`，即，子页面名称
- 为每个子页面创建两个 npm 脚本命令（开发、打包）
- 打包命令包含 `vite` 打包构建与执行脚本 `refresh-tmpl.js`

### 2. vite 项目配置

`vite.config.js`:

```js
import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const pagename = process.env.PAGENAME

export default defineConfig({
  base: `/static/vue-pages/dist/${pagename}/`, // 打包后的文件在浏览器中的根路径
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '~@': resolve(__dirname, `src/pages/${pagename}`),
    },
  },
  build: {
    outDir: `dist/${pagename}`,
    rollupOptions: {
      input: {
        main: resolve(__dirname, `src/main.js`),
        [pagename]: resolve(__dirname, `src/pages/${pagename}/index.html`),
      },
    },
  },
})
```

==**注意：**==

- `process.env.PAGENAME` 是通过 `cross-env` 插件设置的环境变量，在配置中读取为子页面的名称
- 根据子页面名称设置打包路径
- 根据子页面名称调整了 `base` 路径（设置为绝对路径），打包后的文件最终需要被对应页面 `/templates/**/*.html` 引用
- 根据子页面名称设置打包入口

子页面配置中，无需再进行打包配置

### 3. 限制打包

如果项目使用不同分支维护不同子页面，可通过如下配置限制只打包指定子页面：

```js
import { defineConfig } from 'vite'
import { execSync } from 'child_process'

const pagename = process.env.PAGENAME

// 配置各模板允许的打包分支，避免打包错模板
const allowedBranchs = {
  address: ['master', 'address'],
  person: ['master', 'person'],
}[pagename]
// 执行git命令获取当前分支名
const currBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim().split('/').at(-1)
// 根据当前分支名决定是否中断打包
if (allowedBranchs instanceof Array && !allowedBranchs.includes(currBranch)) {
  throw new Error(
    `中断打包: 当前分支为"${currBranch}"，不在允许的分支内(${allowedBranchs.join(
      ', '
    )})，请检查打包命令是否对应当前模板，或更改允许当前模板构建的分支列表！`
  )
}

export default defineConfig({
  // ...
})
```

## 四、开发与维护

### 1. 添加新子页面

请确保 npm 脚本命令、子页面目录位置及目录名称、打包输出目录三者的正确性

例如：子页面 address

- npm script:

`"dev:address": "vite serve src/pages/address"`
`"build:address": "cross-env PAGENAME=address vite build && cross-env PAGENAME=address node refresh-tmpl.js"`

- 目录：

```text
├ src 源码目录
│ ├ pages/address 子页面源码目录
```

- refresh-tmpl.js:

```js
const pagename = process.env.PAGENAME
const reportDir = {
  address: '../../templates/address',
}[pagename]
```

### 2. 开发

同步代码，执行:

```bash
npm install
npm run dev:address
```

上例安装并运行了子页面“address”，本地开发时，如请求实时数据，需完成接口拦截与登录验证。

==**注意：**== 子页面开发过程中，请不要**随意改动公共**资源、组件、样式等，非公用的请放在子页面源码目录下。

多分支同时维护，避免因不当改动公共代码而影响其它分支。切换分支后，重新安装依赖。

### 3. 打包

`npm run build:address`

由于子页面间毫无关联，请仅打包当前开发/维护的子页面
