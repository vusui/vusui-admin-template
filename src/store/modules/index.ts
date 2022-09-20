/*
 * @Description: 模块（作用域）状态管理
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-18 15:38:14
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-02 15:00:14
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
 */
// import 自动导入
const modulesFiles = import.meta.glob('./*.ts', {
  import: 'default',
  eager: true
});

const modules = Object.keys(modulesFiles).reduce(
  (modules: { [key: string]: any }, path: string) => {
    const moduleName = path.replace(/^\.\/(.*)\.\w+$/, '$1');
    modules[moduleName] = modulesFiles[path];
    return modules;
  },
  {}
);

export default modules;
