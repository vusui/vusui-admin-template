/*
 * @Description: Element 二次封装
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-23 09:03:40
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-02 14:53:59
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
 */
import { ElMessageBox } from 'element-plus';
import type { ElMessageBoxOptions } from 'element-plus';

/**
 * @description: 确认消息
 * @param {any} message 确认文字
 * @param {any} options 参数
 * @param {any} callback 回调
 * @Date: 2022-08-23 00:08:30
 * @return {*}
 */
export const $confirm = (message: any, options?: any, callback?: any): any => {
  const mesType = typeof message === 'object';
  const optType = typeof options === 'function';
  const params: ElMessageBoxOptions = {
    message: mesType ? '' : message,
    title: '提示',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  };
  // 合并参数
  Object.assign(params, mesType ? message : options);
  // ElMessageBox
  ElMessageBox.confirm(params.message, params.title, {
    confirmButtonText: params.confirmButtonText,
    cancelButtonText: params.cancelButtonText,
    type: params.type
  })
    .then(() => {
      optType ? options() : callback();
    })
    .catch((err) => console.log(err));
};
