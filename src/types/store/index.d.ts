/*
 * @Description: 状态管理类型声明
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-18 15:38:14
 * @LastEditors: vusui 45650368@qq.com
 * @LastEditTime: 2022-09-18 16:47:38
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
 */
/**
 * @description: APP布局类型声明
 * @Date: 2022-08-11 17:58:26
 */
// device类型
export type AppDeviceType = 'mobile' | 'desktop';
export interface AppState {
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
  device: AppDeviceType;
  setting: boolean;
}

/**
 * @description: 用户信息类型声明
 * @Date: 2022-08-12 09:14:19
 * @return {*}
 */
export interface UserState {
  token: any;
  info: any;
  roles: any[];
}

/**
 * @description: 权限类型声明
 * @Date: 2022-08-12 12:57:22
 * @return {*}
 */
export interface PermissionState {
  routes: any[];
  openeds: string[];
}

/**
 * @description: 动态路由(菜单)数据类型声明
 * @Date: 2022-09-18 16:41:33
 * @return {*}
 */
export interface PermissionMenuData {
  // 菜单 id
  id: number | string;
  // 菜单父级 id
  parentId: number | string;
  // 排序，数值越大越往前排
  sort: number;
  // 路由名称(不要起同名的)
  name: string;
  // 路由地址
  path: string;
  // 如果使用默认的布局组件，输入 # 号即可。
  component: string; // # 号为默认布局组件
  // 重定向
  redirect: string;
  // 是否隐藏菜单
  hidden: boolean;
  // 一直显示根路由
  alwaysShow: boolean;
  // 标题
  title: string;
  // 图标
  icon: string;
  // element-plus 图标
  elIcon: string;
  // 不缓存
  noCache: boolean;
  // 是否在面包屑中显示
  breadcrumb: boolean;
  // 固定在tags标签栏中(不可删除)
  affix: boolean;
  // 不在tags标签栏中显示
  noTags: boolean;
  // 展开当前子菜单(如果有子菜单)
  open: boolean;
  // 高亮菜单
  activeMenu: string;
  // 菜单权限
  roles: string[];
}

/**
 * @description: 系统设置类型声明
 * @Date: 2022-08-12 16:04:12
 * @return {*}
 */
export interface SettingsState {
  theme: string;
  fixedHeader: boolean;
  showBreadcrumb: boolean;
  showTags: boolean;
  showTagsIcon: boolean;
  showLogo: boolean;
  showUserInfo: boolean;
  showProgress: boolean;
  recordRoute: boolean;
  showRefresh: boolean;
  formSize: string;
}

/**
 * @description: 标签类型声明
 * @Date: 2022-08-19 17:34:30
 * @return {*}
 */
export interface TagsState {
  visitedTags: any[];
  cachedTags: any[];
}

/**
 * @description: 表单类型声明
 * @Date: 2022-09-07 15:40:47
 * @return {*}
 */
// form类型
export type FormLabelType = 'left' | 'right' | 'top';
export interface FormState {
  labelPosition: string;
}
