/*
 * @Description: 用户管理API
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-18 15:38:14
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-02 11:30:22
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
 */
import request from '@/common/request/http';

// 登录
export function login(data?: any): Promise<any> {
  return request({
    url: `/user/login`,
    method: 'post',
    data
  });
}

// 获取用户信息
export function getInfo(params?: any): Promise<any> {
  return request({
    url: `/user/info`,
    method: 'get',
    params
  });
}

// 获取菜单列表(路由数据)
export function getRoutes(params?: any): Promise<any> {
  return request({
    url: `/user/routes`,
    method: 'get',
    params
  });
}

// 退出
export function logout(): Promise<any> {
  return request({
    url: `/user/logout`,
    method: 'post'
  });
}
