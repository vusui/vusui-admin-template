<!--
 * @Description: 404
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-18 15:38:14
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-20 11:03:27
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
-->
<template>
  <div
    class="vus-pa-50 vus-h-100 app-flex app-flex-items-center app-flex-justify-center column"
  >
    <div class="vus-fs-100 vus-fw-700">404</div>
    <div class="vus-fs-18">出错啦！你访问的页面不存在~~~</div>
    <div class="vus-pt-15">
      <el-button @click="handleBack">返回首页</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const handleBack = (): void => {
  router.push({
    path: '/'
  });
};
</script>
