/*
 * @Description: Tags状态管理
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-19 17:32:20
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-02 17:51:40
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
 */
import { defineStore } from 'pinia';
import type { TagsState } from '@/types/store';

const useStore = defineStore({
  id: 'tags',

  // 基本状态数据
  state: (): TagsState => ({
    // 已访问的页面标签
    visitedTags: [],
    // 缓存标签
    cachedTags: []
  }),

  // 从基本数据(state)派生的数据
  getters: {},

  // 提交更新数据的方法(异步)
  actions: {
    // 添加标签与标签缓存
    addTag(view: any) {
      this.addVisitedTag(view);
      this.addCachedTag(view);
    },

    // 添加标签
    addVisitedTag(view: any) {
      if (this.visitedTags.some((v) => v.path === view.path)) {
        return;
      }
      if (view.meta?.affix) {
        this.visitedTags.unshift(
          Object.assign({}, view, {
            title: view.meta?.title || '无标题',
            icon: view.meta?.icon || '',
            elIcon: view.meta?.elIcon || ''
          })
        );
      } else {
        this.visitedTags.push(
          Object.assign({}, view, {
            title: view.meta?.title || '无标题',
            icon: view.meta?.icon || '',
            elIcon: view.meta?.elIcon || ''
          })
        );
      }
    },

    // 添加标签缓存
    addCachedTag(view: any) {
      if (this.cachedTags.includes(view.name)) {
        return;
      }
      if (view.meta?.noCache) {
        this.cachedTags.push(view.name);
      }
    },

    // 删除标签与缓存
    delTag(view: any) {
      return new Promise((resolve) => {
        this.delVisitedTag(view);
        this.delCachedTag(view);
        resolve({
          visitedTags: [...this.visitedTags],
          cachedTags: [...this.cachedTags]
        });
      });
    },

    // 删除标签
    delVisitedTag(view: any) {
      return new Promise((resolve) => {
        for (const [i, v] of this.visitedTags.entries()) {
          if (v.path === view.path) {
            this.visitedTags.splice(i, 1);
            break;
          }
        }
        resolve([...this.visitedTags]);
      });
    },

    // 删除标签缓存
    delCachedTag(view: any) {
      return new Promise((resolve) => {
        const index = this.cachedTags.indexOf(view.name);
        index > -1 && this.cachedTags.splice(index, 1);
        resolve([...this.cachedTags]);
      });
    },

    // 删除其它标签与缓存
    delOthersTags(view: any) {
      return new Promise((resolve) => {
        this.delOthersVisitedTags(view);
        this.delOthersCachedTags(view);
        resolve({
          visitedTags: [...this.visitedTags],
          cachedTags: [...this.cachedTags]
        });
      });
    },

    // 删除其它标签
    delOthersVisitedTags(view: any) {
      return new Promise((resolve) => {
        this.visitedTags = this.visitedTags.filter((v) => {
          return v.meta?.affix || v.path === view.path;
        });
        resolve([...this.visitedTags]);
      });
    },

    // 删除其它标签缓存
    delOthersCachedTags(view: any) {
      return new Promise((resolve) => {
        const index = this.cachedTags.indexOf(view.name);
        if (index > -1) {
          this.cachedTags = this.cachedTags.slice(index, index + 1);
        } else {
          this.cachedTags = [];
        }
        resolve([...this.cachedTags]);
      });
    },

    // 删除所有标签与缓存
    delAllTags(view?: any) {
      return new Promise((resolve) => {
        this.delAllVisitedTags(view);
        this.delAllCachedTags(view);
        resolve({
          visitedTags: [...this.visitedTags],
          cachedTags: [...this.cachedTags]
        });
      });
    },

    // 删除所有标签
    delAllVisitedTags(view?: any) {
      return new Promise((resolve) => {
        const affixTags = this.visitedTags.filter((tag) => tag.meta?.affix);
        this.visitedTags = affixTags;
        resolve([...this.visitedTags]);
      });
    },

    // 删除所有标签缓存
    delAllCachedTags(view?: any) {
      return new Promise((resolve) => {
        this.cachedTags = [];
        resolve([...this.cachedTags]);
      });
    },

    // 删除左侧标签
    delLeftTags(view: any) {
      return new Promise((resolve) => {
        const currIndex = this.visitedTags.findIndex(
          (v) => v.path === view.path
        );
        if (currIndex === -1) {
          return;
        }
        this.visitedTags = this.visitedTags.filter((item, index) => {
          // affix: true 固定tag，例如“首页”
          if (index >= currIndex || item.meta?.affix) {
            return true;
          }
          const cacheIndex = this.cachedTags.indexOf(item.name as string);
          if (cacheIndex > -1) {
            this.cachedTags.splice(cacheIndex, 1);
          }
          return false;
        });
        resolve({
          visitedTags: [...this.visitedTags]
        });
      });
    },

    // 删除右侧标签
    delRightTags(view: any) {
      return new Promise((resolve) => {
        const currIndex = this.visitedTags.findIndex(
          (v) => v.path === view.path
        );
        if (currIndex === -1) {
          return;
        }
        this.visitedTags = this.visitedTags.filter((item, index) => {
          // affix: true 固定tag，例如“首页”
          if (index <= currIndex || item.meta?.affix) {
            return true;
          }
          const cacheIndex = this.cachedTags.indexOf(item.name as string);
          if (cacheIndex > -1) {
            this.cachedTags.splice(cacheIndex, 1);
          }
          return false;
        });
        resolve({
          visitedTags: [...this.visitedTags]
        });
      });
    },

    // 更新标签
    updateVisitedTag(view: any) {
      for (let v of this.visitedTags) {
        if (v.path === view.path) {
          v = Object.assign(v, view);
          break;
        }
      }
    }
  }
});

export default useStore;
