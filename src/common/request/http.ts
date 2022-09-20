/*
 * @Description: 网络请求配置
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-19 09:03:47
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-02 11:33:01
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
 */
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { storage } from '@/common/utils';
import setting from '@/common/setting';

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 6000
});

// 请求拦截处理
service.interceptors.request.use(
  (config: any) => {
    if (setting.request.token && storage.get(setting.tokenName)) {
      config.headers['X-Token'] = storage.get(setting.tokenName);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截处理
service.interceptors.response.use(
  (response) => {
    const data = response.data;

    if (data.code !== 200) {
      ElMessage({
        message: data.msg || 'Error',
        type: 'error'
      });
      return Promise.reject(data.msg);
    }
    return data;
  },
  (error) => {
    ElMessage({
      message: error.msg || 'Error',
      type: 'error'
    });
    return Promise.reject(error);
  }
);

export default service;
