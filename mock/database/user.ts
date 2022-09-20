/*
 * @Description: 用户数据
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-19 09:03:47
 * @LastEditors: vusui 45650368@qq.com
 * @LastEditTime: 2022-09-19 23:54:13
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
 */
import routes from './routes';

export default {
  // 用户信息
  users: {
    'admin-token': {
      name: 'Admin',
      roleName: '超级管理员',
      roles: ['admin'],
      expires: 180,
      avatar: 'https://cdn.vusui.com/avatar/vusui.png'
    },
    'demo-token': {
      name: 'Demo',
      roleName: '演示组',
      roles: ['demo'],
      expires: 180,
      avatar: 'https://cdn.vusui.com/avatar/001.gif'
    }
  },
  // token信息
  tokens: {
    admin: {
      token: 'admin-token'
    },
    demo: {
      token: 'demo-token'
    }
  },
  // 动态路由
  routes
};
