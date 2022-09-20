<!--
 * @Description: 应用主布局入口
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-18 15:38:14
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-07 15:51:44
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
-->
<template>
  <div class="app-container" :class="appClass">
    <!-- 遮罩层 -->
    <div
      class="app-mask"
      :class="{ 'index-setting-drawer': settingStatus }"
      v-if="(device === 'mobile' && sidebar.opened) || settingStatus"
      @click="handleMaskColse"
    ></div>
    <!-- 侧边栏 -->
    <app-sidebar />
    <!-- 主体容器 -->
    <div class="app-main-wrapper" :class="{ 'has-header-tags': showTags }">
      <div :class="{ 'has-fixed-header': fixedHeader }">
        <!-- 顶部导航 -->
        <app-header />
        <!-- 标签列表 -->
        <app-tags v-if="showTags" />
      </div>
      <!-- 内容主体 -->
      <app-main />
    </div>
    <!-- 设置功能栏 -->
    <app-setting />
  </div>
</template>

<script setup lang="ts">
import { computed, watch, watchEffect } from 'vue';
import { useWindowSize } from '@vueuse/core';
import useStore from '@/store';
import setting from '@/common/setting';

// 组件
import {
  AppSidebar,
  AppMain,
  AppHeader,
  AppSetting,
  AppTags
} from './components';
import router from '@/router';

// 监听窗口变化
const { width } = useWindowSize();

// 状态管理
const { app, settings, form } = useStore();

// 获取侧边栏状态
const sidebar = computed(() => app().sidebar);
// 获取设备类型
const device = computed(() => app().device);
// 获取设置栏状态
const settingStatus = computed(() => app().setting);

// 设置响应样式
const appClass = computed(() => ({
  hideSidebar: !sidebar.value.opened,
  openSidebar: sidebar.value.opened,
  withoutAnimation: sidebar.value.withoutAnimation,
  mobile: device.value === 'mobile'
}));

// 获取tags状态
const showTags = computed(() => settings().showTags);
// 获取浮动header状态
const fixedHeader = computed(() => settings().fixedHeader);

/**
 * @description: 监听路由变化
 * @Date: 2022-08-23 11:10:05
 * @return {*}
 */
watch(
  () => router.currentRoute.value.path,
  () => {
    // 关闭侧边栏
    if (device.value === 'mobile' && sidebar.value.opened) {
      app().setSidebarClose(false);
    }
    // 关闭设置功能栏
    if (settingStatus.value) {
      app().setSettingClose();
    }
  }
);

/**
 * @description: 监听窗口变化
 * @Date: 2022-08-12 16:00:12
 * @return {*}
 */
watchEffect(() => {
  if (width.value < setting.width) {
    app().setDevice('mobile');
    app().setSidebarClose(true);
    form().setFormLabel('top');
  } else {
    app().setDevice('desktop');
    form().setFormLabel('right');
  }
});

/**
 * @description: 点击背景关闭事件
 * @Date: 2022-08-12 16:00:07
 * @return {*}
 */
const handleMaskColse = (): void => {
  if (settingStatus.value) {
    app().setSettingClose();
  } else {
    app().setSidebarClose(false);
  }
};
</script>

<style lang="scss"></style>
