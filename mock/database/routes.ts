/*
 * @Description: 动态路由
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-09-05 21:19:38
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-20 09:14:13
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
 */
export default [
  {
    id: 1000,
    parentId: 0,
    sort: 0,
    path: '/404',
    component: '#'
  },
  {
    id: 1001,
    parentId: 1000,
    sort: 0,
    path: '/404',
    component: 'public/404',
    title: '404',
    icon: 'vi-bug'
  },
  {
    id: 2000,
    parentId: 0,
    sort: 0,
    path: '/link',
    component: '#'
  },
  {
    id: 2001,
    parentId: 2000,
    sort: 0,
    path: 'https://vusui.com',
    title: '外链',
    icon: 'vi-chain'
  },
  {
    id: 3000,
    parentId: 0,
    sort: 0,
    path: '/donate',
    component: '#'
  },
  {
    id: 3001,
    parentId: 3000,
    sort: 0,
    path: 'https://vusui.com/admin/guide/#打赏支持',
    component: '#',
    title: '打赏',
    icon: 'vi-coffee-o'
  }
];
