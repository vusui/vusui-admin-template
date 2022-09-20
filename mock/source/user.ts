/*
 * @Description: 用户API接口
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-18 15:53:18
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-02 10:49:47
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
 */
import { MockMethod } from 'vite-plugin-mock';
import userData from '../database/user';
const { users, tokens, routes }: any = userData;

export default [
  {
    url: '/admin-api/user/login',
    method: 'post',
    response: (config: any) => {
      const { username }: any = config.body;
      const token = tokens[username];
      if (!token) {
        return {
          code: 0,
          status: 'error',
          msg: '登录失败！',
          data: null
        };
      }
      return {
        code: 200,
        status: 'success',
        msg: '登录成功！',
        data: token
      };
    }
  },
  {
    url: '/admin-api/user/info',
    method: 'get',
    response: (config: any) => {
      const { token } = config.query;
      const info = users[token];
      if (!info) {
        return {
          code: 0,
          status: 'info',
          msg: '获取用户信息失败！',
          data: null
        };
      }
      return {
        code: 200,
        status: 'success',
        msg: '获取成功！',
        data: info
      };
    }
  },
  {
    url: '/admin-api/user/routes',
    method: 'get',
    response: (config: any) => {
      const { token } = config.query;
      const info = users[token];
      if (!info) {
        return {
          code: 0,
          status: 'info',
          msg: '获取菜单数据失败！',
          data: null
        };
      }
      return {
        code: 200,
        status: 'success',
        msg: '获取成功！',
        data: routes
      };
    }
  },
  {
    url: '/admin-api/user/logout',
    method: 'post',
    response: () => {
      return {
        code: 200,
        status: 'success',
        msg: '退出成功！',
        data: null
      };
    }
  }
] as MockMethod[];
