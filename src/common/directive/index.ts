/*
 * @Description: 自定义指令
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-09-04 14:48:37
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-05 11:33:36
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
 */
import type { App, Directive } from 'vue';

// 自动引入global文件夹文件
const modulesFiles: any = import.meta.glob('./global/*.ts', { eager: true });
const modulesList: any = {};
const modules = Object.keys(modulesFiles).reduce(
  (modules: { [key: string]: any }, path: string) => {
    const moduleName = path.replace(/^\.\/(.*)\.\w+$/, '$1');
    modulesList[moduleName] = modulesFiles[path];
    modules = { ...modules, ...modulesList[moduleName] };
    return modules;
  },
  {}
);

// 注册全局指令
export default function loadDirective(app: App<Element>): void {
  Object.keys(modules).forEach((key) => {
    app.directive(key, (modules as { [key: string]: Directive })[key]);
  });
}
