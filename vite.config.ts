/*
 * @Description: vite配置(根据个人情况配置)
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-17 16:48:00
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-20 11:42:38
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
 */
import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import { viteMockServe } from 'vite-plugin-mock';
import ElementPlus from 'unplugin-element-plus/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import progress from 'vite-plugin-progress';
import eslint from 'vite-plugin-eslint';
import viteCompression from 'vite-plugin-compression'; // 静态资源压缩
import VueSetupExtend from 'vite-plugin-vue-setup-extend'; // 定义组件名称
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isBuild = command === 'build';

  return {
    plugins: [
      vue(),
      VueSetupExtend(),
      eslint({
        // eslint要检查的文件
        include: [
          'src/**/*.ts',
          'src/**/*.js',
          'src/**/*.vue',
          'src/*.ts',
          'src/*.js',
          'src/*.vue'
        ]
      }),
      ElementPlus({
        useSource: true
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      // 注册svg
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[name]'
      }),
      viteMockServe({
        ignore: /^\_/,
        mockPath: './mock/source', // 解析，路径可根据实际变动
        localEnabled: !isBuild, // 开发环境
        prodEnabled: isBuild, // 生产环境设为true，也可以根据官方文档格式
        injectCode: `import { setupProdMockServer } from '../mock'; setupProdMockServer();`, // 这个路径需要注意是在你要注入的文件下的引用路径
        watchFiles: true, // 监听文件内容变更
        supportTs: true, //打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件
        logger: true, //是否在控制台显示请求日志
        injectFile: resolve('./src/main.ts') // 在main.ts注册后需要在此处注入，否则可能报找不到setupProdMockServer的错误
      }),
      // 打包进度条
      progress({
        // 自定义进度条的格式
        format:
          '正在打包 [:bar] 进度: :percent | 用时: :elapsed 秒 | 预计完成: :eta 秒',
        // 进度条的宽度
        width: 15,
        // 完成后的字符
        complete: '\u2588',
        // 未完成的字符
        incomplete: '\u2591'
      }),
      createHtmlPlugin({
        inject: {
          data: {
            // 将环境变量 VITE_APP_TITLE 赋值给 title 方便 html页面使用 title 获取系统标题
            title: env.VITE_APP_TITLE
          }
        }
      }),
      // 生成压缩包gz
      viteCompression({
        verbose: true, // 输出压缩成功
        disable: false, // 是否禁用
        deleteOriginFile: false, // 删除源文件
        threshold: 10240, // 体积大于阈值会被压缩，单位是b
        algorithm: 'gzip', // 压缩算法
        ext: '.gz' // 生成的压缩包后缀
      })
    ],
    // 项目基础路径
    base: env.VITE_BASE_PATH,
    // 配置简写路径
    resolve: {
      alias: {
        // 如果报错__dirname找不到，需要安装node,执行yarn add @types/node --save-dev
        '@': resolve(__dirname, 'src'),
        '@com': resolve(__dirname, 'src/components'),
        '@img': resolve(__dirname, 'src/assets/img')
      },
      // 导入时想要省略的扩展名列表
      // 不建议使用 .vue 影响IDE和类型支持
      extensions: [
        '.mjs',
        '.js',
        '.ts',
        '.jsx',
        '.tsx',
        '.json',
        '.scss',
        '.css'
      ]
    },
    css: {
      // 指定传递给 css 预处理器的选项
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variable.scss" as *;`
        }
      }
    },
    // 开发配置
    server: {
      //开启热更新
      hmr: true,
      // 自动打开浏览器
      open: true,
      // 服务器 IP 地址
      // 此处添加以下设置host: 0.0.0.0 或true
      // 将监听所有地址，包括局域网和公网地址
      host: true,
      // 服务器端口号
      port: 1995,
      // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。
      strictPort: false,
      proxy: {
        // 选项写法
        // [env.VITE_BASE_API]: {
        //   target: env.VITE_BASE_URL,
        //   changeOrigin: true
        //   // rewrite: (path) => path.replace(/^\/api/, '')
        // }
      }
    },
    // 打包配置
    build: {
      // 指定输出路径
      outDir: env.VITE_BUILD_OUT_DIR,
      // 生成静态资源的存放路径
      assetsDir: env.VITE_BUILD_ASSETS_DIR,
      // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
      assetsInlineLimit: 4096,
      chunkSizeWarningLimit: 2096,
      // 浏览器兼容性  "esnext"|"modules"
      target: 'modules',
      // 启用/禁用 CSS 代码拆分, 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
      cssCodeSplit: true,
      // 构建目录自动清除
      emptyOutDir: true,
      // 构建后是否生成 source map 文件
      sourcemap: false,
      // boolean | 'terser' | 'esbuild'
      // 混淆器, terser 构建后文件体积更小
      // vite3.x后需要自行安将插件terser, yarn add -D terser
      minify: 'terser',
      // 传递给 Terser 的更多 minify 选项。
      terserOptions: {
        compress: {
          // 生产环境时移除console
          drop_console: true,
          drop_debugger: true
        },
        output: {
          // 去掉注释内容
          comments: true
        }
      },
      rollupOptions: {
        output: {
          // 最小化拆分包
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString();
            }
          },
          // 用于命名代码拆分时创建的共享块的输出命名
          chunkFileNames: 'static/js/[name].[hash].js',
          // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
          entryFileNames: 'static/js/[name].[hash].js',
          // 用于输出静态资源的命名，[ext]表示文件扩展名
          // 此处会导致背景图片路径有问题
          assetFileNames: 'static/[ext]/[name].[hash].[ext]'
        }
      }
    },
    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        'element-plus/es/locale/lang/zh-cn',
        'element-plus/es/locale/lang/en',
        '@vueuse/core',
        'axios'
      ]
    }
  };
});
