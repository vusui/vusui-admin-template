<!--
 * @Description: tags组件
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-19 17:22:40
 * @LastEditors: vusui 45650368@qq.com
 * @LastEditTime: 2022-09-19 23:56:41
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
-->
<template>
  <div id="app-tags-wrapper" class="app-tags-wrapper">
    <div class="tags-scroll-pane-container">
      <scroll-pane ref="scrollPaneRef" @scroll="handleScroll">
        <router-link
          class="tags-link-item"
          ref="tag"
          :class="isActive(tag) ? 'active' : ''"
          :to="{ path: tag.path, query: tag.query }"
          :key="tag.path"
          :data-path="tag.path"
          v-for="tag in visitedTags"
          @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
          @contextmenu.prevent="openMenu(tag, $event)"
        >
          <!-- 图标 -->
          <template v-if="showTagsIcon">
            <el-icon class="tags-icon" v-if="tag.elIcon">
              <component :is="tag.elIcon" />
            </el-icon>
            <span class="tags-icon" v-else-if="tag.icon">
              <!-- vusui图标库 -->
              <i
                class="vus-icon"
                :class="tag.icon"
                v-if="tag.icon.includes('vi-')"
              />
              <!-- svg图标 -->
              <svg-icon :icon="tag.icon" v-else />
            </span>
          </template>
          <!-- 标题 -->
          <span class="tags-text">{{ tag.title }}</span>
          <!-- 关闭按钮 -->
          <span
            class="tags-close"
            v-if="!isAffix(tag)"
            @click.prevent.stop="closeSelectedTag(tag)"
          >
            <svg-icon icon="close" size="8" />
          </span>
        </router-link>
      </scroll-pane>
    </div>

    <!-- 右键菜单 -->
    <ul
      class="tags-context-menu"
      :style="{ left: left + 'px', top: top + 'px' }"
      v-show="visible"
    >
      <li @click="refreshSelectedTag(selectedTag)">刷新页面</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        关闭当前
      </li>
      <li @click="closeOthersTags">关闭其它</li>
      <li v-if="!isFirstTags()" @click="closeLeftTags">关闭左侧</li>
      <li v-if="!isLastTags()" @click="closeRightTags">关闭右侧</li>
      <li @click="closeAllTags(selectedTag)">关闭全部</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  watch,
  computed,
  nextTick,
  onMounted,
  getCurrentInstance
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import path from 'path-browserify';
import ScrollPane from './scroll-pane.vue';
import useStore from '@/store';

// 创建 store 实例
const { tags, permission, settings } = useStore();
// 获取路由数据
const route = useRoute();
// 设置路由数据
const router = useRouter();
// 组件实例
const { proxy }: any = getCurrentInstance();

// 显示与隐藏标签右键菜单
const visible = ref<boolean>(false);
// 顶部距离
const top = ref<number>(0);
// 左距离
const left = ref<number>(0);
// 当前选中的标签
const selectedTag = ref<any>({});
// 固定标签
const affixTags = ref<any>([]);
// 组件ref
const scrollPaneRef = ref();
// 标签列表
const visitedTags = computed<any>(() => tags().visitedTags);
// 路由列表
const routeList = computed<any>(() => permission().routes);
// 标题图标显示状态
const showTagsIcon = computed<any>(() => settings().showTagsIcon);

// 初始化监听
watch(
  () => router.currentRoute.value,
  () => {
    addTags();
    moveToCurrentTag();
  }
);

// 监听右键菜单状态
watch(visible, (value: boolean) => {
  if (value) {
    document.body.addEventListener('click', closeMenu);
  } else {
    document.body.removeEventListener('click', closeMenu);
  }
});

onMounted(() => {
  initTags();
  addTags();
});

// 当前激活的标签
function isActive(item: any): boolean {
  return item.path === route.path;
}

// 是否固定的标签
function isAffix(item: any): boolean {
  return item.meta?.affix;
}

// 过虑固定的标签
function filterAffixTags(routes: string[], basePath: string = '/'): any {
  let tags: any = [];
  routes.forEach((route: any) => {
    if (route.meta?.affix) {
      const tagPath = path.resolve(basePath, route.path);
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta }
      });
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path);
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags];
      }
    }
  });
  return tags;
}

// 初始化标签
function initTags(): void {
  const list: any[] = filterAffixTags(routeList.value);
  affixTags.value = list;
  for (const tag of list) {
    if (tag.name && !tag.meta?.noTags) {
      tags().addVisitedTag(tag);
    }
  }
}

// 添加标签
function addTags(): void {
  if (route.name && !route.meta?.noTags) {
    tags().addTag(route);
  }
}

// 移动到当前标签（高亮当前标签）
function moveToCurrentTag(): void {
  nextTick(() => {
    for (const tag of visitedTags.value) {
      if (tag.path === route.path) {
        scrollPaneRef?.value?.moveToTarget(tag);
        if (tag.fullPath !== route.fullPath) {
          tags().updateVisitedTag(route);
        }
      }
    }
  });
}

// 判断是否有左侧标签
function isFirstTags(): any {
  try {
    return (
      selectedTag.value.fullPath === visitedTags.value[1].fullPath ||
      selectedTag.value.fullPath === '/'
    );
  } catch (err) {
    return false;
  }
}

// 判断是否有右侧标签
function isLastTags(): any {
  try {
    return (
      selectedTag.value.fullPath ===
      visitedTags.value[visitedTags.value.length - 1].fullPath
    );
  } catch (err) {
    return false;
  }
}

// 刷新标签页面
async function refreshSelectedTag(view: any): Promise<any> {
  await tags().delCachedTag(view);
  const { fullPath } = view;
  nextTick(() => {
    router.replace({ path: '/redirect' + fullPath });
  });
}

// 跳到最后一个标签
function toLastTag(visitedTags: any, view?: any): void {
  const latestView = visitedTags.slice(-1)[0];
  if (latestView && latestView.fullPath) {
    router.push(latestView.fullPath);
  } else {
    if (view.name === 'Dashboard') {
      router.replace({ path: '/redirect' + view.fullPath });
    } else {
      router.push('/');
    }
  }
}

// 关闭当前标签
function closeSelectedTag(view: any): void {
  tags()
    .delTag(view)
    .then((res: any) => {
      if (isActive(view)) {
        toLastTag(res.visitedTags, view);
      }
    });
}

// 关闭左侧标签
function closeLeftTags(): void {
  tags()
    .delLeftTags(selectedTag.value)
    .then((res: any) => {
      if (
        !res.visitedTags.find((item: any) => item.fullPath === route.fullPath)
      ) {
        toLastTag(res.visitedTags);
      }
    });
}

// 关闭右侧标签
function closeRightTags(): void {
  tags()
    .delRightTags(selectedTag.value)
    .then((res: any) => {
      if (
        !res.visitedTags.find((item: any) => item.fullPath === route.fullPath)
      ) {
        toLastTag(res.visitedTags);
      }
    });
}

// 关闭其它标签
function closeOthersTags(): void {
  router.push(selectedTag.value);
  tags()
    .delOthersTags(selectedTag.value)
    .then(() => {
      moveToCurrentTag();
    });
}

// 关闭全部标签
function closeAllTags(view: any): void {
  tags()
    .delAllTags()
    .then((res: any) => {
      toLastTag(res.visitedTags, view);
    });
}

// 打开标签右建菜单
const openMenu = (tag: any, e: MouseEvent): void => {
  const el = proxy?.$el as any;
  const menuMinWidth = 105;
  const offsetLeft = el.getBoundingClientRect().left;
  const offsetWidth = el.offsetWidth;
  const maxLeft = offsetWidth - menuMinWidth;
  const domLeft = e.clientX - offsetLeft + 15;

  if (domLeft > maxLeft) {
    left.value = maxLeft;
  } else {
    left.value = domLeft;
  }

  top.value = e.clientY;
  visible.value = true;
  selectedTag.value = tag;
};

// 关闭右键菜单
const closeMenu = (): void => {
  visible.value = false;
};

// 滚动标签
const handleScroll = (): void => {
  closeMenu();
};
</script>
