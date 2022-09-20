/*
 * @Description: 路由配置
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-18 15:38:14
 * @LastEditors: vusui 45650368@qq.com
 * @LastEditTime: 2022-09-20 00:03:58
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
 */
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router';
import setting from '@/common/setting';
import constant from './modules/constant';

// // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
// redirect: 'noRedirect',
// meta: {
//   // 当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
//   hidden: true, // (默认 false)
//   // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
//   // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
//   // 若你想不管路由下面的 children 声明的个数都显示你的根路由
//   // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
//   alwaysShow: true,
//   roles: ['admin', 'editor'], // 设置该路由进入的权限，支持多个权限叠加
//   title: '', // 设置该路由在侧边栏和面包屑中展示的名字
//   icon: '', // 设置该路由的图标，支持 vusui-icon / svg 图标。
//   elIcon: '', // 仅支持 element-plus icon , 如设置 elIcon 图标会优先显示, icon设置则无效
//   noCache: true, // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
//   breadcrumb: false, // 如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
//   affix: true, // 如果设置为true，它则会固定在tags中(默认 false)
//   noTags: true, // 如果设置为true，它则不会显示在tags中(默认 false)
//   open: true, // 如果设置为true，它则展开当前子菜单的数组(默认 false)
//   // 当路由设置了该属性，则会高亮相对应的侧边栏。
//   // 这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
//   // 点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
//   activeMenu: '/article/list'
// }

// 静态路由
export const constantRoutes = constant;

// 设置路由模式
export const routerMode = (): any => {
  if (setting.routerMode === 'history') {
    return createWebHistory();
  } else {
    return createWebHashHistory();
  }
};

// 创建路由
const router = createRouter({
  // strict: true,
  history: routerMode(),
  routes: constantRoutes as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 })
});

// 重置路由
export function resetRouter(): void {
  // 禁止删除的路由白名单
  const resetWhiteNameList = ['Dashboard'];
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export default router;
