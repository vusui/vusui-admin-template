/*
 * @Description: 布局状态管理
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-18 15:38:14
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-07 15:45:57
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
 */
import { defineStore } from 'pinia';
import type { AppState, AppDeviceType } from '@/types/store';
import { storage } from '@/common/utils';

const useStore = defineStore({
  id: 'app',

  // 基本状态数据
  state: (): AppState => ({
    // 左侧菜单状态
    sidebar: {
      opened: storage.get('app.sidebar.opened') ?? true,
      withoutAnimation: false
    },
    // 设备类型：mobile = 移动端, desktop = PC端
    device: 'desktop',
    // 快捷设置功能
    setting: storage.get('app.setting') ?? false
  }),

  // 从基本数据(state)派生的数据
  getters: {},

  // 提交更新数据的方法(异步)
  actions: {
    // 设置左侧导航菜单
    setSidebar(): void {
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.withoutAnimation = false;
      if (this.sidebar.opened) {
        storage.set('app.sidebar.opened', true);
      } else {
        storage.set('app.sidebar.opened', false);
      }
    },

    // 关闭左侧导航菜单
    setSidebarClose(value: boolean): void {
      this.sidebar.opened = false;
      this.sidebar.withoutAnimation = value;
      storage.set('app.sidebar.opened', false);
    },

    // 设置设备类型
    setDevice(value: AppDeviceType): void {
      this.device = value;
    },

    // 设置快捷功能菜单
    setSetting(): void {
      this.setting = !this.setting;
      if (this.setting) {
        storage.set('app.setting', true);
      } else {
        storage.set('app.setting', false);
      }
    },

    // 关闭快捷功能菜单
    setSettingClose(): void {
      this.setting = false;
      storage.set('app.setting', false);
    }
  }
});

export default useStore;
