/*
 * @Description: 请求许可(路由守卫)
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-18 15:38:14
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-19 15:57:07
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
 */
// import { RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import { ElMessage } from 'element-plus';
import router from '@/router';
import useStore from '@/store';
import setting, { pageTitle } from '@/common/setting';
import 'nprogress/nprogress.css';

// 进度条配置
NProgress.configure({
  easing: 'ease',
  speed: 500,
  trickleSpeed: 200,
  showSpinner: false // 进度环显示隐藏
});

// 加载路由守卫
router.beforeEach(async (to, from, next) => {
  // 获取Store状态
  const { user, permission, settings } = useStore();
  const token = user().token;

  // 进度条开始
  settings().showProgress && NProgress.start();

  // 校验是否已登录、token是否存在
  if (token) {
    // 如果是登录页
    if (to.path === '/login') {
      // 转到首页
      next({ path: '/' });
      settings().showProgress && NProgress.done();
    } else {
      const hasRoles = user().roles?.length > 0;
      if (hasRoles) {
        if (to.matched.length === 0) {
          from.name ? next({ name: from.name as any }) : next('/401');
        } else {
          next();
        }
      } else {
        try {
          const { roles } = await user().getInfo();
          await permission().generateRoutes(token, roles);
          // 如果 addRoute 并未完成，路由守卫会一层一层的执行执行，直到 addRoute 完成，找到对应的路由
          // next({ ...to, replace: true });
          // 解决：[Vue Router warn]: No match found for location with path "/xxx/xxx"
          if (to.path === '/404' && to.redirectedFrom !== undefined) {
            next({ path: to.redirectedFrom?.fullPath, replace: true });
          } else {
            next({ ...to, replace: true });
          }
        } catch (error) {
          console.log(error);
          // 移除 token 并跳转登录页
          await user().resetToken();
          ElMessage.error('Has Error');
          // 跳转到登录页
          next(`/login?redirect=${to.path}`);
          settings().showProgress && NProgress.done();
        }
      }
    }
  } else {
    if (setting.routerWhiteList.includes(to.path)) {
      next();
    } else {
      // token失效回退到登录页时是否记录本次的路由
      if (settings().recordRoute) {
        next(`/login?redirect=${to.path}`);
      } else {
        next('/login');
      }
      settings().showProgress && NProgress.done();
    }
  }
});

// 导航后执行
router.afterEach((to: any) => {
  // 获取Store状态
  const { settings } = useStore();
  // 设置网页标题
  document.title = pageTitle(to.meta.title as string);
  // 进度条结束
  settings().showProgress && NProgress.done();
});
