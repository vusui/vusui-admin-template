/*
 * @Description: 静态路由
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-25 17:51:03
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-20 11:20:37
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
 */
// 应用布局组件
export const App = (): Promise<any> => import('@/app/index.vue');

export default [
  {
    path: '/redirect',
    component: App,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: (): any => import('@/views/public/redirect.vue'),
        meta: {
          hidden: true,
          noTags: true,
          breadcrumb: false
        }
      }
    ]
  },
  {
    path: '/404',
    component: (): any => import('@/views/public/404.vue'),
    meta: {
      title: '404',
      hidden: true,
      noTags: true
    }
  },
  {
    path: '/login',
    component: (): any => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      hidden: true,
      noTags: true
    }
  },
  {
    path: '/',
    component: App,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: (): any => import('@/views/dashboard/index.vue'),
        meta: {
          title: '控制台',
          icon: 'dashboard',
          affix: true
        }
      }
    ]
  },
  {
    // 找不到路由重定向到404页面
    path: '/:pathMatch(.*)',
    redirect: '/404',
    meta: {
      hidden: true,
      noTags: true
    }
  }
];
