<!--
 * @Description: 菜单链接组件
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-19 16:29:41
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-19 15:56:20
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
-->
<template>
  <component :is="linkType" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { isExternal } from '@/common/utils';

// props
const props = defineProps({
  // 链接地址
  to: {
    type: String,
    required: true
  }
});

/**
 * @description: 判断链接类型：外部使用 a 标签, 内部使用 router-link
 * @Date: 2022-07-29 12:03:54
 * @return {*}
 */
const linkType = computed(() => {
  if (isExternal(props.to)) {
    return 'a';
  }
  return 'router-link';
});

/**
 * @description: 链接属性
 * @param {*} to 链接地址
 * @Date: 2022-07-29 12:04:21
 * @return {*}
 */
const linkProps = (to: string): any => {
  if (isExternal(props.to)) {
    return {
      href: to,
      target: '_blank',
      rel: 'noopener'
    };
  }
  return {
    to: to
  };
};
</script>
