/*
 * @Description: 表单状态管理
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-09-07 15:34:44
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-07 16:21:36
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
 */
import { defineStore } from 'pinia';
import type { FormState, FormLabelType } from '@/types/store';

const useStore = defineStore({
  id: 'form',

  // 基本状态数据
  state: (): FormState => ({
    labelPosition: 'right'
  }),

  // 从基本数据(state)派生的数据
  getters: {},

  // 提交更新数据的方法(异步)
  actions: {
    // 设置表单label位置
    setFormLabel(value: FormLabelType): void {
      this.labelPosition = value;
    }
  }
});

export default useStore;
