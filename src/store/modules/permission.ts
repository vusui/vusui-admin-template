/*
 * @Description: 访问权限状态管理
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-18 15:38:14
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-19 16:07:51
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
 */
import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import router, { constantRoutes } from '@/router';
import type { PermissionState, PermissionMenuData } from '@/types/store';
import { getRoutes } from '@/common/api';
import { formatRouter, filterAsyncRoutes } from '@/common/utils';

const useStore = defineStore({
  id: 'permission',

  // 基本状态数据
  state: (): PermissionState => ({
    routes: [],
    openeds: []
  }),

  // 从基本数据(state)派生的数据
  getters: {},

  // 提交更新数据的方法(异步)
  actions: {
    // 设置路由
    setRoutes(routes: any[]) {
      this.routes = constantRoutes.concat(routes);
    },

    // 设置默认展开的菜单
    setOpeneds(value: string) {
      this.openeds.push(value);
    },

    // 获取路由数据并生成路由菜单
    generateRoutes(token: string, roles: string[]) {
      return new Promise((resolve, reject) => {
        getRoutes({ token })
          .then((res: any) => {
            const data: any = res.data || [];

            // 处理菜单数据
            const dataMap = data.map((item: PermissionMenuData) => {
              return {
                id: item.id,
                parentId: item.parentId,
                name: item.name,
                path: item.path,
                component: item.component,
                redirect: item.redirect,
                meta: {
                  hidden: item.hidden,
                  alwaysShow: item.alwaysShow,
                  roles: item.roles,
                  title: item.title,
                  icon: item.icon,
                  elIcon: item.elIcon,
                  noCache: item.noCache,
                  breadcrumb: item.breadcrumb,
                  affix: item.affix,
                  noTags: item.noTags,
                  open: item.open,
                  activeMenu: item.activeMenu
                }
              };
            });

            // 格式化路由
            const routes = formatRouter(dataMap);

            // 根据角色权限过虑动态路由
            const routerMap = filterAsyncRoutes(routes, roles);

            // 添加路由
            routerMap.forEach((item: any) => {
              router.addRoute(item);
            });

            // 获取默认展开的菜单并保存
            router.getRoutes().forEach((item: RouteRecordRaw) => {
              if (item.meta?.open) {
                this.setOpeneds(item.path);
              }
            });

            // 在动态路由添加后，在将404添加入，解决刷新是找不到路由跳转404
            router.addRoute({
              path: '/:pathMatch(.*)',
              redirect: '/404',
              meta: {
                hidden: true,
                noTags: true
              }
            });

            this.setRoutes(routerMap);
            resolve(routerMap);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
  }
});

export default useStore;
