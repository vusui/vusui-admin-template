/*
 * @Description: 应用主入口
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-17 16:48:00
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-20 11:45:01
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
 */
import { createApp } from 'vue';
import App from './App.vue';
import init from './init';

// 创建VUE实例
const app = createApp(App);

init(app).then(async (router) => {
  router.isReady().then(() => app.mount('#app'));
});
