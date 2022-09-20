<!--
 * @Description: 当前位置(面包屑)
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-19 16:52:51
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-02 11:25:44
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
-->
<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb-slide">
      <el-breadcrumb-item :key="item.path" v-for="(item, index) in levelList">
        <span
          class="no-redirect"
          v-if="
            item.redirect === 'noRedirect' || index === levelList.length - 1
          "
        >
          {{ item.meta.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { compile } from 'path-to-regexp';

// 获取路由数据
const route = useRoute();
// 设置路由数据
const router = useRouter();
// 面包屑列表
const levelList = ref<any>([]);

// 路由监听
watch(
  () => route.path,
  (path) => {
    // 如果转到重定向页面，不要更新面包屑
    if (path.startsWith('/redirect/')) {
      return false;
    }
    getBreadcrumb();
  }
);

// 组件被挂载之前调用
onBeforeMount(() => {
  getBreadcrumb();
});

/**
 * @description: 获取面包屑数据
 * @Date: 2022-08-10 09:41:02
 * @return {*}
 */
const getBreadcrumb = (): void => {
  // 只显示带有meta.title的路由
  let matched: any = route.matched.filter(
    (item) => item.meta && item.meta.title
  );
  const first = matched[0];

  if (!isDashboard(first)) {
    matched = [{ path: '/dashboard', meta: { title: '控制台' } }].concat(
      matched
    );
  }

  // 过虑不在breadcrumb面包屑显示的路由
  levelList.value = matched.filter(
    (item: any) =>
      item.meta && item.meta.title && item.meta.breadcrumb !== false
  );
};

/**
 * @description: 是否控制面板(首页)
 * @Date: 2022-08-10 09:41:55
 * @return {*}
 */
const isDashboard = (route: any): boolean => {
  const name = route && route.name;
  if (!name) {
    return false;
  }
  return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase();
};

/**
 * @description: 编译路径
 * @Date: 2022-08-10 09:43:04
 * @return {*}
 */
const pathCompile = (path: string): any => {
  const { params } = route;
  const toPath = compile(path);
  return toPath(params);
};

/**
 * @description: 路由跳转链接
 * @Date: 2022-08-10 09:53:13
 * @return {*}
 */
const handleLink = (item: any): any => {
  const { redirect, path } = item;
  if (redirect) {
    router.push(redirect);
    return false;
  }
  router.push(pathCompile(path));
};
</script>
