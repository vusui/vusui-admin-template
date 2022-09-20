/*
 * @Description: 权限指令
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-09-04 14:48:58
 * @LastEditors: vusui 45650368@qq.com
 * @LastEditTime: 2022-09-20 00:01:44
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
 */
import useStore from '@/store';
import { Directive, DirectiveBinding } from 'vue';

/**
 * @description: 角色权限校验(v-role="['admin', 'demo']")
 * @Date: 2022-09-04 14:50:30
 * @return {*}
 */
export const role: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding;

    if (value) {
      // DOM绑定需要的角色编码
      const requiredRoles = value;
      const { user } = useStore();
      const hasRole = user().roles.some((perm: any) => {
        return requiredRoles.includes(perm);
      });

      if (!hasRole) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      return false;
    }
  }
};
