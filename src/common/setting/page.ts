/*
 * @Description: 页面标题设置
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-18 15:38:14
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-02 11:34:48
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
 */
import setting from './setting';

export const pageTitle = (pageTitle: string): string => {
  if (pageTitle) {
    return `${pageTitle} - ${setting.title}`;
  }
  return `${setting.title}`;
};
