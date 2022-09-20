<!--
 * @Description: tags滚动组件
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-19 17:22:23
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-02 11:28:44
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
-->
<template>
  <el-scrollbar
    class="tags-scroll-pane-wrapper"
    ref="scrollContainer"
    :vertical="false"
    @wheel.prevent="handleScroll"
  >
    <slot />
  </el-scrollbar>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  // getCurrentInstance,
  onMounted,
  onBeforeUnmount
} from 'vue';
import useStore from '@/store';

// 标签空隔距离
const tagAndTagSpacing = ref<number>(4);
// 组件ref
const scrollContainer = ref<any>(null);

// 获取当前实例参数
// const { proxy }: any = getCurrentInstance();

// emit
const emits = defineEmits(['scroll']);
// 滚动事件
const emitScroll = (): void => {
  emits('scroll');
};

// 创建store实例
const { tags } = useStore();

const visitedTags = computed(() => tags().visitedTags);

// 滚动组件ref
const scrollWrapper = computed(() => scrollContainer.value.wrap$);

onMounted(() => {
  scrollWrapper.value.addEventListener('scroll', emitScroll, true);
});

onBeforeUnmount(() => {
  scrollWrapper.value.removeEventListener('scroll', emitScroll);
});

/**
 * @description: 滚动事件
 * @param {*} e
 * @Date: 2022-08-21 00:53:00
 */
const handleScroll = (e: any): void => {
  const eventDelta = e.wheelDelta || -e.deltaY * 40;
  const $scrollWrapper = scrollWrapper.value;
  $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4;
};

/**
 * @description: 称动到指定标签
 * @param {*} currentTag 当前标签
 * @Date: 2022-08-05 14:12:07
 */
const moveToTarget = (currentTag: any): void => {
  const $container = scrollContainer.value.$el;
  const $containerWidth = $container.offsetWidth;
  const $scrollWrapper = scrollWrapper.value;
  // 父组件tag标签数量
  // const tagList = proxy?.$parent.$refs.tag;
  const tagList = visitedTags.value;

  // 第一个标签
  let firstTag: any = null;
  // 最后一个标签
  let lastTag: any = null;

  if (tagList.length > 0) {
    firstTag = tagList[0];
    lastTag = tagList[tagList.length - 1];
  }

  if (firstTag === currentTag) {
    $scrollWrapper.scrollLeft = 0;
  } else if (lastTag === currentTag) {
    $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth;
  } else {
    // 找到上一个标签与下一个标签
    const tagListDom = document.getElementsByClassName('tags-link-item');
    const currentIndex = tagList.findIndex((item: any) => item === currentTag);
    let prevTag: any = null;
    let nextTag: any = null;

    for (const k in tagListDom) {
      if (k !== 'length' && Object.hasOwnProperty.call(tagListDom, k)) {
        if (
          (tagListDom[k] as any).dataset.path === tagList[currentIndex - 1].path
        ) {
          prevTag = tagListDom[k];
        }
        if (
          (tagListDom[k] as any).dataset.path === tagList[currentIndex + 1].path
        ) {
          nextTag = tagListDom[k];
        }
      }
    }

    // 标签与下一个标签距离
    const afterNextTagOffsetLeft =
      nextTag.offsetLeft + nextTag.offsetWidth + tagAndTagSpacing.value;

    // 标签与上一个标签距离
    const beforePrevTagOffsetLeft = prevTag.offsetLeft - tagAndTagSpacing.value;

    if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
      $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth;
    } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
      $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft;
    }
  }
};

// 导出方法
defineExpose({
  moveToTarget
});
</script>
