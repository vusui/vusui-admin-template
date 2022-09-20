/*
 * @Description: 常用函数
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-18 15:38:14
 * @LastEditors: vusui 45650368@qq.com
 * @LastEditTime: 2022-09-05 22:01:23
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
 */
/**
 * @description: 判断是否为外部地址
 * @param {string} path 路径
 * @Date: 2022-08-12 12:35:16
 * @return {*}
 */
export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @description: 检查class名称是否存在
 * @param {HTMLElement} ele
 * @param {string} cls
 * @Date: 2022-08-31 17:28:30
 * @return {*}
 */
export function hasClass(ele: HTMLElement, cls: string): boolean {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

/**
 * @description: 添加样式
 * @param {HTMLElement} ele
 * @param {string} cls
 * @Date: 2022-08-31 17:28:22
 * @return {*}
 */
export function addClass(ele: HTMLElement, cls: string): void {
  if (!hasClass(ele, cls)) {
    ele.className += ' ' + cls;
  }
}

/**
 * @description: 删除样式
 * @param {HTMLElement} ele
 * @param {string} cls
 * @Date: 2022-08-31 17:27:13
 * @return {*}
 */
export function removeClass(ele: HTMLElement, cls: string): void {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    ele.className = ele.className.replace(reg, ' ');
  }
}

/**
 * @description: 删除（添加）一个类
 * @param {HTMLElement} ele
 * @param {string} cls
 * @Date: 2022-08-31 17:33:13
 * @return {*}
 */
export function toggleClass(ele: HTMLElement, cls: string): void {
  if (hasClass(ele, cls)) {
    removeClass(ele, cls);
  } else {
    addClass(ele, cls);
  }
}
