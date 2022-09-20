<!--
 * @Description: Vusui Icon 组件
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-09-09 11:26:01
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-09 11:39:59
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
-->
<template>
  <i class="vus-icon" :class="[iconName, className]" :style="caclStyle"></i>
</template>

<script setup lang="ts" name="VusIcon">
import { computed } from 'vue';

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: ''
  }
});

// 校验图标名称是否带有前缀
const iconName = computed(() => {
  return props.icon.startsWith('vi-', 0) ? props.icon : 'vi-' + props.icon;
});

// 设置行间样式
const caclStyle = computed(() => {
  let styles = '';
  if (props.size) {
    styles = `font-size: ${props.size}px;`;
  }
  if (props.color) {
    styles = `${styles}color: ${props.color};`;
  }
  return styles;
});
</script>

<style scoped lang="scss">
.vus-icon {
  display: inline-block;
}
</style>
