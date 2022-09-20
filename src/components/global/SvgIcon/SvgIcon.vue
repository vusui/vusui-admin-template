<!--
 * @Description: SVG图标
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-26 09:11:34
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-02 14:55:53
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
-->
<template>
  <div
    class="svg-external-icon svg-icon"
    :style="styleExternalIcon"
    v-bind="$attrs"
    v-if="isUrl"
  />
  <svg
    aria-hidden="true"
    :class="svgClass"
    :style="svgStyle"
    v-bind="$attrs"
    v-else
  >
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup lang="ts" name="SvgIcon">
import { computed } from 'vue';
import { isExternal } from '@/common/utils';

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
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
  }
});

// 是否外链图标
const isUrl = computed(() => isExternal(props.icon));

// 图标名称
const symbolId = computed(() => `#${props.prefix}-${props.icon}`);

// 设置class样式
const svgClass = computed(() => {
  if (props.className) {
    return 'svg-icon ' + props.className;
  } else {
    return 'svg-icon';
  }
});

// 设置style样式
const svgStyle = computed(() => `font-size: ${props.size};`);

// 外部图标设置
const styleExternalIcon = computed(() => {
  return {
    mask: `url(${props.icon}) no-repeat 50% 50%`,
    '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
  };
});
</script>

<style scoped lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  /* 因icon大小被设置为和字体大小一致，而span等标签的下边缘会和字体的基线对齐，故需设置一个往下的偏移比例，来纠正视觉上的未对齐效果 */
  vertical-align: -0.1em;
  /* 定义元素的颜色，currentColor是一个变量，这个变量的值就表示当前元素的color值，如果当前元素未设置color值，则从父元素继承 */
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
