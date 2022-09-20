/*
 * @Description: 注册组件
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-26 09:11:34
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-09 11:27:36
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
 */
import { App, defineAsyncComponent } from 'vue';

// 自动引入组件
const modules = import.meta.glob('./global/**/*.vue');

// 注册组件
export default function loadComponent(app: App<Element>): void {
  for (const path in modules) {
    const result = path.match(/.*\/(.+).vue$/);
    if (result) {
      const name = result[1];
      const component = modules[path];
      app.component(name, defineAsyncComponent(component as any));
    }
  }
}
