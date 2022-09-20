<!--
 * @Description: 应用主模板
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-17 16:48:00
 * @LastEditors: vusui 45650368@qq.com
 * @LastEditTime: 2022-09-20 00:07:43
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
-->
<template>
  <el-config-provider :locale="locale">
    <router-view v-if="isRouterAlive" />
  </el-config-provider>
</template>

<script setup lang="ts">
import { ref, computed, provide, nextTick, onMounted } from 'vue';
import useStore from '@/store';
import { addClass } from '@/common/utils';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
// 状态管理
const { settings } = useStore();

// element-plus设置
const locale = zhCn; // 中文

// 获取主题
const appTheme = computed(() => settings().theme);

// 刷新页面
const isRouterAlive = ref<boolean>(true);
const onRefresh = (): void => {
  isRouterAlive.value = false;
  nextTick(() => {
    isRouterAlive.value = true;
  });
};

// 父组件使用provide，子组件接收：inject('reload')
provide('reload', onRefresh);

onMounted(() => {
  // 获取当前主题
  addClass(document.getElementsByTagName('html')[0], appTheme.value);
});
</script>

<style lang="scss"></style>
