<!--
 * @Description: Header头部导航
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-19 16:52:51
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-07 09:59:58
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
-->
<template>
  <div class="app-header">
    <!-- 左侧栏开关 -->
    <div
      class="header-menu-icon"
      :class="{ active: sidebar.opened }"
      @click="handleToggleSideBar"
    >
      <svg-icon icon="flexible" size="14" />
    </div>
    <!-- 面包屑 -->
    <header-breadcrumb v-if="showBreadcrumb" />
    <!-- 用户信息 -->
    <header-user @logout="handleLogout" />
    <!-- 快捷设置功能图标 -->
    <div class="header-quick-wrapper">
      <div class="quick-icon" @click="handleSettingOpen">
        <svg-icon icon="set-o" size="14" />
      </div>
      <div class="quick-icon" @click="handleReload" v-if="showRefresh">
        <svg-icon icon="refresh" size="14" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useStore from '@/store';
import { $confirm } from '@/common/utils';

// 组件
import HeaderBreadcrumb from './breadcrumb.vue';
import HeaderUser from './user.vue';

// 创建 store 实例
const { app, user, settings } = useStore();
// 创建路由实例
const route = useRoute();
const router = useRouter();

// 刷新页面
// const reload: any = inject('reload');

// 获取侧边栏状态
const sidebar = computed(() => app().sidebar);
// 面包屑显示状态
const showBreadcrumb = computed(() => settings().showBreadcrumb);
// 刷新按钮显示状态
const showRefresh = computed(() => settings().showRefresh);

// 申缩左则菜单
const handleToggleSideBar = (): void => {
  app().setSidebar();
};

// 打开快捷功能栏
const handleSettingOpen = (): void => {
  app().setSetting();
};

// 刷新页面
const handleReload = (): void => {
  const { fullPath } = route;
  nextTick(() => {
    router.replace({ path: '/redirect' + fullPath });
  });
};

/**
 * @description: 退出
 * @Date: 2022-07-28 16:35:01
 * @return {*}
 */
const handleLogout = (): void => {
  $confirm('确定退出当前账号', async () => {
    await user().logout();
    if (settings().recordRoute) {
      router.replace({
        path: '/login',
        query: {
          redirect: route.fullPath
        }
      });
    } else {
      router.replace({
        path: '/login'
      });
    }
  });
};
</script>
