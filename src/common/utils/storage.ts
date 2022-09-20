/*
 * @Description: storage封装
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-18 15:38:14
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-02 14:54:39
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
 */
import setting from '@/common/setting';

/**
 * @description: 获取storage类型
 * @param {*} type
 * @return {*}
 */
function getStorageType(type: string): any {
  return type === 'session' || type === 'sessionStorage'
    ? window.sessionStorage
    : window.localStorage;
}

/*
 * 封装 localStorage 与 sessionStorage
 * @key key
 * @value 值
 * @storageType 自定义存储类型 本地存储(永久)localStorage | 会话存储(临时)sessionStorage
 * @expires 过期时间(分钟)
 * @设置调用：storage.set('token', '123456', 60, 'session');
 * @获取调用：storage.get('token', 'session');
 */
export const storage = {
  // 设置
  set: (key: string, value: any, storageType?: any, expires?: number): any => {
    expires = expires ?? setting.storageExpires;
    if (storageType) {
      storageType = getStorageType(storageType);
    } else {
      storageType = getStorageType(setting.storage);
    }
    try {
      if (expires) {
        return storageType.setItem(
          key,
          JSON.stringify({
            data: value,
            expires: new Date().getTime() + expires * 1000 * 60
          })
        );
      } else {
        return storageType.setItem(
          key,
          JSON.stringify({
            data: value
          })
        );
      }
    } catch (e) {
      // console.log(e);
    }
  },

  // 获取
  get: (key: string, storageType?: any): any => {
    if (storageType) {
      storageType = getStorageType(storageType);
    } else {
      storageType = getStorageType(setting.storage);
    }
    const result = JSON.parse(storageType.getItem(key) || '{}');
    if (result && new Date().getTime() < result.expires) {
      return result.data;
    } else {
      storageType.removeItem(key);
      return null;
    }
  },

  // 删除
  remove(key: string, storageType?: any): void {
    if (storageType) {
      storageType = getStorageType(storageType);
    } else {
      storageType = getStorageType(setting.storage);
    }
    storageType.removeItem(key);
  },

  // 删除全部
  clear(storageType?: any): void {
    if (storageType) {
      storageType = getStorageType(storageType);
    } else {
      storageType = getStorageType(setting.storage);
    }
    storageType.clear();
  }
};
