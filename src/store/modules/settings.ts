/*
 * @Description: 系统设置状态管理
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-18 15:38:14
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-07 16:21:21
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
 */
import { defineStore } from 'pinia';
import type { SettingsState } from '@/types/store';
import setting from '@/common/setting';
import { storage } from '@/common/utils';

// 获取默认设置
const {
  theme,
  fixedHeader,
  showLogo,
  showBreadcrumb,
  showUserInfo,
  showTags,
  showTagsIcon,
  showProgress,
  recordRoute,
  showRefresh,
  formSize
} = setting;

// 获取个人设置
const mySetting = storage.get('settings.custom') || '';

const useStore = defineStore({
  id: 'settings',

  // 基本状态数据
  state: (): SettingsState => ({
    theme: mySetting.theme ?? theme,
    fixedHeader: mySetting.fixedHeader ?? fixedHeader,
    showBreadcrumb: mySetting.showBreadcrumb ?? showBreadcrumb,
    showTags: mySetting.showTags ?? showTags,
    showTagsIcon: mySetting.showTagsIcon ?? showTagsIcon,
    showLogo: mySetting.showLogo ?? showLogo,
    showUserInfo: mySetting.showUserInfo ?? showUserInfo,
    showProgress: mySetting.showProgress ?? showProgress,
    recordRoute: mySetting.recordRoute ?? recordRoute,
    showRefresh: mySetting.showRefresh ?? showRefresh,
    formSize: mySetting.formSize ?? formSize
  }),

  // 从基本数据(state)派生的数据
  getters: {},

  // 提交更新数据的方法(异步)
  actions: {
    // 预览设置
    async changeSetting(payload: { key: string; value: any }) {
      const { key, value } = payload;
      switch (key) {
        case 'theme':
          this.theme = value;
          break;
        case 'showLogo':
          this.showLogo = value;
          break;
        case 'fixedHeader':
          this.fixedHeader = value;
          break;
        case 'showBreadcrumb':
          this.showBreadcrumb = value;
          break;
        case 'showProgress':
          this.showProgress = value;
          break;
        case 'recordRoute':
          this.recordRoute = value;
          break;
        case 'showRefresh':
          this.showRefresh = value;
          break;
        case 'showTags':
          this.showTags = value;
          break;
        case 'showTagsIcon':
          this.showTagsIcon = value;
          break;
        case 'showUserInfo':
          this.showUserInfo = value;
          break;
        case 'formSize':
          this.formSize = value;
          break;
        default:
          break;
      }
    },

    // 保存设置
    async saveSetting(value: any) {
      storage.set('settings.custom', value);
    }
  }
});

export default useStore;
