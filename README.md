# Vusui-admin-template 后台前端模板

Vusui-admin-template 基于 Vite3 + Vue3 + TS 搭建。

集成环境：

- [Vite3](https://vitejs.cn/)
- [Vue3](https://cn.vuejs.org/)
- [Element-Plus](https://element-plus.org/zh-CN/guide/design.html)
- [Vusui](https://vusui.com)
- [Pinia](https://pinia.vuejs.org/)
- [Vue-router](https://router.vuejs.org/zh/)
- [Axios](http://www.axios-js.com/zh-cn/)
- TypeScript
- Eslint
- Prettie
- Mockjs
- ……

开发环境：

- VS Code: v1.69.1
- Nodejs: v14.20.0
- Yarn: v1.22.5
- Windows 10 x64
- Google Chrome 105.0.5195
- ……

兼容性：

- Nodejs：Vite3 需要 [Node.js](https://nodejs.org/zh-cn/) 版本 14.18+ / 16+
- 浏览器：Chrome >=87、Firefox >=78、Safari >=13、Edge >=88

适用项目：全平台

## npm 配置（没梯子爬墙）

```bash
# 配置源
npm config set registry https://registry.npm.taobao.org
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass
```

## cnpm 配置

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org

# 配置源
cnpm config set registry https://registry.npm.taobao.org
cnpm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass
```

## yarn 配置

```bash
npm install -g yarn --registry=https://registry.npm.taobao.org

# 配置源
yarn config set registry https://registry.npm.taobao.org
yarn config set sass_binary_site https://npm.taobao.org/mirrors/node-sass
```

## 项目安装

```bash
yarn install
npm install
cnpm install
pnpm install

# 安装依赖
yarn add -D/-S x1 x2 x3...
npm/cnpm -D/-S x1 x2 x3...
```

## 运行项目

```bash
# 以package.json文件的scripts命令为准
yarn dev
npm run dev
cnpm run dev
pnpm run dev
```

## 项目打包

```bash
yarn build
npm run build
cnpm run build
pnpm run build
```

## Git 常用命令

```bash
# 克隆分支(master)
git clone https://mygit.com/xxx.git
# 克隆指定分支(develop)
git clone -b develop https://mygit.com/xxx.git
# 将远程最新分支更新到本地
git fetch
# 查看远程所有分支
git branch -r
# 查看本地所有分支
git branch -a
# 拉取远程分支并创建本到地分支(develop)
git checkout -b develop origin/develop
# 创建本地分支(develop)
git branch develop
# 切换分支(test)
git checkout test
# 合并分支，将develop分支合并到test分支(先切换到test分支)
git merge develop
# 合并指定commit分支，commitid是commit的sha码
git cherry-pick commitid
# 合并代码(rebase形式)
git rebase --onto branch commitid^
# 回退到上个版本(包括add、commit操作)
git reset --hard "HEAD^"
# 回退到指定commit版本，commitid是commit的sha码
git reset --hard commitid
# git commit之后，撤销commit操作(只撤销git commit)
git reset --soft "HEAD^"
# 修改commit注释
git commit --amend
# 查看日志
git log
# 查看完整操作日志
git reflog
# 强制推送到远程(慎用)，回退版本时可用到
git push -f
# 查看工作区代码状态
git status
# 拉取远程分支到本地
git pull
# 将所有修改的文件添加到暂存区
git add .
git add --all
# 添加指定的文件到暂存区
git add a.css b.js c.html
# 将文件从暂存区提交到版本库
git commit -m "提交描述"
# 推送本地分支到远程
git push
```

## Git commit 类别

> **请务必遵循以下规则提交代码**：

| 类别     | 作用                     | 描述                                            |
| -------- | ------------------------ | ----------------------------------------------- |
| ci       | 配置文件和脚本的变动     | --                                              |
| chore    | 构建系统或辅助工具的变动 | --                                              |
| polish   | 改进和完善               | 代码或者功能模块的改进和完善                    |
| fix      | 代码 BUG 修复            | --                                              |
| feat     | 新功能                   | --                                              |
| perf     | 性能优化和提升           | --                                              |
| refactor | 代码变动                 | 仅仅是代码变动，既不是修复 BUG 也不是引入新功能 |
| style    | 代码格式调整             | 可能是空格、分号、缩进等等                      |
| docs     | 文档变动                 | --                                              |
| test     | 测试                     | 补充缺失的测试用例或者修正现有的测试用例        |

> **使用方法：**

```bash
# 新功能
git commit -m "feat: 创建了新功能"
# 修补BUG
git commit -m "fix: 修复了BUG"
...
```

## 目录说明

```
┌─ .vscode                        + vscode工具目录
│ ├─ extensions.json                * extensions.json
│ ├─ settings.json                  * settings.json配置文件，用于规范代码（不需要的可删除）
├─ mock                           + mockjs资源目录
│ ├─ index.ts                       * mock入口配置文件
│ ├─ source                         + mock源文件目录
├─ public                         + 静态资源目录
├─ src                            + 项目主目录
│ ├─ app                          + 项目布局
│ ├─ assets                       + 静态资源目录（如图片、视频等），注意：静态资源只能存放于此
│ │ └─ svg                          + SVG图标存放目录
│ ├─ common                       + 公共文件存放目录
│ │ ├─ api                          + 接口调用文件目录
│ │ ├─ config                       + 项目配置文件目录
│ │ ├─ request                      + 网络请求配置目录
│ │ ├─ setting                      + 系统设置文件目录
│ │ └─ utils                        + 公共函数/工具文件目录
│ ├─ components                   + 组件文件存放目录
│ ├─ router                       + 路由配置文件目录
│ ├─ store                        + 状态管理文件目录
│ ├─ styles                       + CSS/SCSS/LESS等样式文件存放目录
│ ├─ types                        + TS类型文件目录
│ ├─ views                        + 业务页面文件存放的目录
│ │ ├─ public                       + 公共页面目录
│ │ ├─ index
│ │ │  └─ index.vue                 * index页面
│ │ └─ login
│ │  │ └─ login.vue                 * login页面
│  ......
│ ├─ App.vue                      * 应用配置，用来配置App全局样式以及监听
│ ├─ main.ts                      * vue初始化入口文件
│ └─ permission.ts                * 路由授权配置文件
├─ .eslintrc.js                   * eslint配置文件
├─ .gitignore                     * git提交时需要忽略的文件
├─ .prettierrc.js                 * prettier的格式化配置文件
├─ babel.config.js                * babel的配置文件
├─ package.json                   * 项目模块和配置
├─ postcss.config.js              * CSS处理配置文件
├─ README.md                      * 项目入门手册（必读）
├─ tsconfig.json                  * typeScript配置文件
├─ tsconfig.node.json             * typeScript node配置文件
├─ vite.config.ts                 * vite配置文件
└─ yarn.lock                      * yarn依赖管理
```
