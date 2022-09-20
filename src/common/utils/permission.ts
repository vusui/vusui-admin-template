/*
 * @Description: 访问许可
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-09-04 14:36:38
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-19 16:09:56
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
 */
import useStore from '@/store';

/**
 * @description: 检查是否有权限访问
 * @param {any} value
 * @Date: 2022-09-04 14:43:47
 * @return {*}
 */
export const checkPermission = (value: any): boolean => {
  // 获取Store状态
  const { user } = useStore();
  if (value && value instanceof Array && value.length > 0) {
    const roles = user().roles;
    const permissionRoles = value;
    const hasPermission = roles.some((role: any) => {
      return permissionRoles.includes(role);
    });
    return hasPermission;
  } else {
    return false;
  }
};

/**
 * @description: 校验当前路由是否包含权限
 * @param {*} roles 用户角色
 * @param {*} route 路由
 * @Date: 2022-08-11 16:52:50
 * @return {*}
 */
export const hasPermission = (roles: string[], route: any): boolean => {
  if (route.meta && route.meta.roles) {
    // 如果为管理则拥有所有权限
    if (roles.includes('admin')) {
      return true;
    }
    return roles.some((role) => {
      if (route.meta?.roles !== undefined) {
        return (route.meta.roles as string[]).includes(role);
      }
    });
  } else {
    // 当前菜单如果不设置roles则开放所有权限
    return true;
  }
};

/**
 * @description: 根据角色权限过虑路由
 * @param {*} routes 路由列表
 * @param {*} roles 角色权限
 * @Date: 2022-08-11 16:55:10
 * @return {*}
 */
export const filterAsyncRoutes = (routes: any, roles: string[]): any => {
  const finallyRoutes: any[] = [];
  // 动态引入组件，需要使用 '../../', 不支持 '@/' 方法
  const modules = import.meta.glob('../../views/**/**.vue');
  routes.forEach((route: any) => {
    const tmp = { ...route } as any;
    if (hasPermission(roles, tmp)) {
      // 是否为布局组件
      if (tmp.component === '#' || tmp.component === 'App') {
        tmp.component = (): any => import('@/app/index.vue');
      } else {
        // 动态注册组件
        const component = modules[`../../views/${tmp.component}.vue`] as any;
        if (component) {
          tmp.component = modules[`../../views/${tmp.component}.vue`];
        } else {
          tmp.component = modules[`../../views/public/404.vue`];
        }
      }
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      finallyRoutes.push(tmp);
    }
  });
  return finallyRoutes;
};

/**
 * @description: 格式化菜单路由数据
 * @param {any} list 路由数据列表
 * @param {string} sort 排序
 * @Date: 2022-08-28 09:48:58
 * @return {*}
 */
export const formatRouter = (list: any, sort: string = 'sort'): any => {
  const newList: any[] = [];
  const map: any = {};

  list.forEach((item: any) => (map[item.id] = item));
  list.forEach((item: any) => {
    const parent = map[item.parentId];

    if (parent) {
      (parent?.children || (parent.children = [])).push(item);
    } else {
      if (!item.parentId) {
        newList.push(item);
      }
    }
  });

  const fn = (list: any): void => {
    list.map((item: any) => {
      if (item?.children instanceof Array) {
        item.children = orderBy(item.children, sort);
        fn(item.children);
      }
    });
  };

  fn(newList);

  return orderBy(newList, sort);
};

/**
 * @description: 列表排序
 * @param {any} list 列表
 * @param {string} key 排序的key
 * @Date: 2022-08-26 11:01:14
 * @return {*}
 */
export const orderBy = (list: any, key: string): any => {
  return list.sort((a: any, b: any) => a[key] - b[key]);
};
