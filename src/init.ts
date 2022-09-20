/*
 * @Description: 初始化应用
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-26 09:11:34
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-07 12:02:52
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
 */
import type { App } from 'vue';
import { createPinia } from 'pinia';
import router from '@/router';
import loadComponent from '@/components';
import loadDirective from '@/common/directive';
// 如果需要使用el-icon需要安装：npm i @element-plus/icons-vue
// import * as ElementPlusIconsVue from '@element-plus/icons-vue';

// 引入全局样式
import '@/styles/index.scss';

// 引入svg-icons注册脚本
import 'virtual:svg-icons-register';

// 访问许可(路由守卫)
import '@/router/permission';

export default async function init(app: App<Element>): Promise<any> {
  // 注册 ElementPlus 图标(配合@element-plus/icons-vue使用)
  // for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  //   app.component(key, component);
  // }
  // 注册全局指令
  loadDirective(app);
  // 注册全局组件
  loadComponent(app);
  // 状态管理
  app.use(createPinia());
  // 路由
  app.use(router);

  return router;
}
