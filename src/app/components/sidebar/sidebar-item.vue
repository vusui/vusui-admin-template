<!--
 * @Description: 菜单Item项
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-19 16:29:41
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-02 17:31:54
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
-->
<template>
  <div v-if="!item.meta || !item.meta.hidden">
    <!-- 是否有子级路由菜单 -->
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        (!item.meta || !item.meta.alwaysShow)
      "
    >
      <sidebar-link
        :to="resolvePath(onlyOneChild.path)"
        v-if="onlyOneChild.meta"
      >
        <el-menu-item
          :class="{ 'submenu-title-noDropdown': !isNest }"
          :index="resolvePath(onlyOneChild.path)"
        >
          <!-- 是否带有图标 -->
          <template v-if="onlyOneChild.meta.elIcon">
            <el-icon>
              <component :is="onlyOneChild.meta.elIcon" />
            </el-icon>
          </template>
          <template v-else-if="onlyOneChild.meta.icon">
            <!-- vusui 图标库 -->
            <i
              class="vus-icon"
              :class="onlyOneChild.meta.icon"
              v-if="onlyOneChild.meta.icon.includes('vi-')"
            />
            <!-- svg图标 -->
            <svg-icon :icon="onlyOneChild.meta.icon" v-else />
          </template>
          <!-- 标题 -->
          <template #title v-if="onlyOneChild.meta.title">
            <span class="vus-title">
              {{ onlyOneChild.meta.title }}
            </span>
          </template>
        </el-menu-item>
      </sidebar-link>
    </template>
    <!-- popper-append-to-body 添加此属性后菜单el-popper需要逐个手动隐藏,不添加则影响滚动条事件 -->
    <el-sub-menu
      ref="sub-menu"
      popper-append-to-body
      :index="resolvePath(item.path)"
      v-else
    >
      <template #title>
        <!-- 是否带有图标 -->
        <template v-if="item.meta">
          <template v-if="item.meta.elIcon">
            <el-icon>
              <component :is="item.meta.elIcon" />
            </el-icon>
          </template>
          <template v-else-if="item.meta.icon">
            <!-- vusui 图标库 -->
            <i
              class="vus-icon"
              :class="item.meta.icon"
              v-if="item.meta.icon.includes('vi-')"
            />
            <!-- svg图标 -->
            <svg-icon :icon="item.meta.icon" v-else />
          </template>
          <!-- 标题 -->
          <span class="vus-title" v-if="item.meta.title">
            {{ item.meta.title }}
          </span>
        </template>
      </template>
      <!-- 菜单项 -->
      <sidebar-item
        class="nest-menu"
        :is-nest="true"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
        v-for="child in item.children"
      />
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import path from 'path-browserify';
import { isExternal } from '@/common/utils';
// 组件
import SidebarLink from './sidebar-link.vue';

// props
const props = defineProps({
  // 当前路由项
  item: {
    type: Object,
    required: true
  },
  // 基础URL路径
  basePath: {
    type: String,
    default: ''
  },
  // 是否嵌套路由
  isNest: {
    type: Boolean,
    default: false
  }
});

// 只有一个子菜单
const onlyOneChild = ref<any>(null);

/**
 * @description: 设置只有一个子菜单数据格式
 * @param {*} children
 * @param {*} parent
 * @Date: 2022-07-28 18:06:58
 * @return {*}
 */
const hasOneShowingChild = (children: any[] = [], parent: any): any => {
  if (!children) {
    children = [];
  }
  const showingChildren = children.filter((item) => {
    if (item.meta && item.meta.hidden) {
      return false;
    } else {
      // 临时设置(只有一个显示子节点时使用)
      onlyOneChild.value = item;
      return true;
    }
  });

  // 当只有一个子路由时，缺省显示该子路由
  if (showingChildren.length === 1) {
    return true;
  }

  // 如果没有子路由显示，则显示父路由
  if (showingChildren.length === 0) {
    onlyOneChild.value = {
      ...parent,
      path: '',
      noShowingChildren: true
    };
    return true;
  }

  return false;
};

/**
 * @description: 路径判断(解析)
 * @param {*} routePath
 * @Date: 2022-07-28 18:08:23
 * @return {*}
 */
const resolvePath = (routePath: string): any => {
  // 是否外部链接
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  return path.resolve(props.basePath, routePath);
};
</script>
