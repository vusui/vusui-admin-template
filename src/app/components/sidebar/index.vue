<!--
 * @Description: 侧边菜单导航
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-19 16:29:41
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-07 17:18:53
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
-->
<template>
  <div class="app-sidebar" :class="{ 'has-logo': showLogo }">
    <!-- logo -->
    <sidebar-logo :collapse="isCollapse" v-if="showLogo" />
    <!-- 滚动组件 -->
    <el-scrollbar wrap-class="sidebar-scrollbar-wrapper">
      <!-- 菜单组件 -->
      <el-menu
        mode="vertical"
        text-color="var(--vus-admin-sidebar-menu-text-color)"
        active-text-color="var(--vus-admin-sidebar-menu-text-active-color)"
        background-color="var(--vus-admin-sidebar-menu-bg-color)"
        :unique-opened="false"
        :collapse-transition="false"
        :collapse="isCollapse"
        :default-openeds="defaultOpens"
        :default-active="activeMenu"
      >
        <!-- 菜单 loop -->
        <sidebar-item
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
          v-for="route in menuList"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import useStore from '@/store';
// 组件
import SidebarItem from './sidebar-item.vue';
import SidebarLogo from './sidebar-logo.vue';

// 路由
const router = useRouter();

// 创建 store 实例
const { app, settings, permission } = useStore();

// 是否显示LOGO组件
const showLogo = computed(() => settings().showLogo);

// 默认展开的菜单path
const defaultOpens = computed(() => permission().openeds);

// 获取菜单列表(路由)
const menuList = computed(() => permission().routes);

// 菜单折叠
const isCollapse = computed(() => !app().sidebar.opened);

// 设置当前菜单高亮
const activeMenu = computed(() => {
  const routeVal = router.currentRoute.value;
  const { meta, path }: any = routeVal;
  // 如果设置了path，侧边栏将突出显示设置的路径
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});
</script>
