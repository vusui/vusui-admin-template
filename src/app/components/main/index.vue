<!--
 * @Description: 视图主体
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-19 16:28:40
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-20 09:22:08
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
-->
<template>
  <div class="app-main">
    <router-view :key="key" v-slot="{ Component }">
      <transition appear name="page-slide" mode="out-in">
        <keep-alive :include="cachedTags">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import useStore from '@/store';

// 路由
const router = useRouter();

// 状态
const { tags } = useStore();

// tags
const cachedTags = computed(() => tags().cachedTags);

// 设置router-view key
const key = computed(() => router.currentRoute.value.fullPath + Math.random());
</script>
