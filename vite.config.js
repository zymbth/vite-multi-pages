import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import { execSync } from 'child_process'

const pagename = process.env.PAGENAME

// // 多分支时，配置各模板允许的打包分支，避免打包错模板
// const allowedBranchs = {
//   address: ['master', 'address'],
//   page2: ['master', 'page2'],
// }[pagename]
// // 执行git命令获取当前分支名
// let currBranch
// try {
//   currBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim().split('/').at(-1)
// } catch (error) {
//   console.error('未获取到当前分支名', error)
// }
// // 根据当前分支名决定是否中断打包
// if (currBranch && allowedBranchs instanceof Array && !allowedBranchs.includes(currBranch)) {
//   throw new Error(
//     `中断打包: 当前分支为"${currBranch}"，不在允许的分支内(${allowedBranchs.join(
//       ', '
//     )})，请检查打包命令是否对应当前模板，或更改允许当前模板构建的分支列表！`
//   )
// }

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '~@': resolve(__dirname, `src/pages/${pagename}`),
    },
  },
  root: resolve(__dirname, `./src/pages/${pagename}`),
  envDir: resolve(__dirname),
  build: {
    outDir: resolve(__dirname, `dist/${pagename}`),
    rollupOptions: {
      input: {
        main: resolve(__dirname, `src/main.js`),
        [pagename]: resolve(__dirname, `src/pages/${pagename}/index.html`),
      },
    },
  },
})
