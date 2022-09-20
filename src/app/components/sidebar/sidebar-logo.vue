<!--
 * @Description: LOGO组件
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-19 16:29:41
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-02 11:28:18
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
-->
<template>
  <div class="logo-wrapper" :class="{ collapse }">
    <transition name="logo-slide" mode="out-in">
      <router-link class="logo-link" key="collapse" to="/" v-if="collapse">
        <img class="logo-img" :src="logo" v-if="logo" />
        <div class="logo-title" v-else-if="title">{{ title }}</div>
      </router-link>
      <router-link class="logo-link" key="expand" to="/" v-else>
        <img class="logo-img" :src="logo" v-if="logo" />
        <div class="logo-title" v-if="title">{{ title }}</div>
      </router-link>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import setting from '@/common/setting';

// 标题
const title = computed(() => setting.title);
// LOGO
const logo = computed(() => setting.logo);

// Props
defineProps({
  collapse: {
    type: Boolean,
    required: true
  }
});
</script>
