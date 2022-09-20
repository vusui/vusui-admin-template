/*
 * @Description: mock配置入口
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-17 15:10:01
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-02 11:24:52
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
 */
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

// 自动导入文件, 忽略 database 文件夹所有文件
const modules = import.meta.glob(['./source/*.ts', '!./source/database/*'], {
  import: 'default',
  eager: true
});

const mockModules: any[] = [];
Object.keys(modules).forEach(async (key) => {
  if (key.includes('_')) {
    return;
  }
  mockModules.push(...(modules[key] as any));
});

export function setupProdMockServer(): void {
  createProdMockServer(mockModules);
}
