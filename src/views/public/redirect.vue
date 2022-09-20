<!--
 * @Description: 路由重定向
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-18 15:38:14
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-02 16:00:24
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
-->
<template>
  <div />
</template>
<script setup lang="ts">
import { unref } from 'vue';
import { useRouter } from 'vue-router';

const { currentRoute, replace } = useRouter();
const { params, query } = unref(currentRoute);
const { path, redirectType = 'path' } = params;

Reflect.deleteProperty(params, '_redirect_type');
Reflect.deleteProperty(params, 'path');

const _path = Array.isArray(path) ? path.join('/') : path;
setTimeout(() => {
  if (redirectType === 'name') {
    replace({
      name: _path,
      query,
      params
    });
  } else {
    replace({
      path: _path.startsWith('/') ? _path : `/${_path}`,
      query
    });
  }
});
</script>
