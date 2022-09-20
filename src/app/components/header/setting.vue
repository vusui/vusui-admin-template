<!--
 * @Description: 快捷功能栏
 * @Author: linpan(45650368@qq.com)
 * @Date: 2022-08-19 16:52:51
 * @LastEditors: linp linp@epsoft.com.cn
 * @LastEditTime: 2022-09-07 16:35:13
 * @WebSite: https://vusui.com
 * @Copyright: 2017-present The Vusui Authors
 * @Readme: 开源不易，且用且珍惜！
-->
<template>
  <transition name="setting-slide" mode="out-in" appear>
    <div class="app-setting-drawer" v-show="settingStatus">
      <div class="setting-title-wrapper" ref="settingTitleRef">
        <span>偏好设置</span>
        <div class="title-icon" @click="handleClose">
          <svg-icon icon="close" size="14" />
        </div>
      </div>
      <div
        class="setting-scroll-wrapper"
        :style="`height: calc(100vh - ${settingScrollHeight}px)`"
      >
        <el-scrollbar class="app-el-scrollbar">
          <div class="setting-form-wrapper">
            <el-form label-width="150px" label-position="left" :model="form">
              <el-form-item label-width="100px" label="主题">
                <el-select
                  v-model="form.theme"
                  @change="changeSettingValue($event, 'theme')"
                >
                  <el-option
                    v-for="item in themeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="显示logo">
                <div class="app-width-full app-flex app-flex-justify-end">
                  <el-switch
                    v-model="form.showLogo"
                    @change="changeSettingValue($event, 'showLogo')"
                  />
                </div>
              </el-form-item>
              <el-form-item label="固定头部" class="app-flex-justify-end">
                <div class="app-width-full app-flex app-flex-justify-end">
                  <el-switch
                    v-model="form.fixedHeader"
                    @change="changeSettingValue($event, 'fixedHeader')"
                  />
                </div>
              </el-form-item>
              <el-form-item label="显示面包屑">
                <div class="app-width-full app-flex app-flex-justify-end">
                  <el-switch
                    v-model="form.showBreadcrumb"
                    @change="changeSettingValue($event, 'showBreadcrumb')"
                  />
                </div>
              </el-form-item>
              <el-form-item label="显示标签">
                <div class="app-width-full app-flex app-flex-justify-end">
                  <el-switch
                    v-model="form.showTags"
                    @change="changeSettingValue($event, 'showTags')"
                  />
                </div>
              </el-form-item>
              <el-form-item>
                <template #label>
                  <span>显示标签图标</span>
                  <el-tooltip content="标签开启时生效" placement="top">
                    <span class="setting-form-help-icon">
                      <svg-icon icon="help-o" />
                    </span>
                  </el-tooltip>
                </template>
                <template #default>
                  <div class="app-width-full app-flex app-flex-justify-end">
                    <el-switch
                      v-model="form.showTagsIcon"
                      @change="changeSettingValue($event, 'showTagsIcon')"
                    />
                  </div>
                </template>
              </el-form-item>
              <el-form-item label="显示进度条">
                <div class="app-width-full app-flex app-flex-justify-end">
                  <el-switch
                    v-model="form.showProgress"
                    @change="changeSettingValue($event, 'showProgress')"
                  />
                </div>
              </el-form-item>
              <el-form-item label="显示刷新按钮">
                <div class="app-width-full app-flex app-flex-justify-end">
                  <el-switch
                    v-model="form.showRefresh"
                    @change="changeSettingValue($event, 'showRefresh')"
                  />
                </div>
              </el-form-item>
              <el-form-item label="显示用户名">
                <div class="app-width-full app-flex app-flex-justify-end">
                  <el-switch
                    v-model="form.showUserInfo"
                    @change="changeSettingValue($event, 'showUserInfo')"
                  />
                </div>
              </el-form-item>
              <el-form-item label="记录路由地址">
                <div class="app-width-full app-flex app-flex-justify-end">
                  <el-switch
                    v-model="form.recordRoute"
                    @change="changeSettingValue($event, 'recordRoute')"
                  />
                </div>
              </el-form-item>
              <el-form-item label-width="80px" label="表单尺寸">
                <div class="app-width-full app-flex app-flex-justify-end">
                  <el-radio-group
                    size="small"
                    v-model="form.formSize"
                    @change="changeSettingValue($event, 'formSize')"
                  >
                    <el-radio-button label="large">大</el-radio-button>
                    <el-radio-button label="default">默认</el-radio-button>
                    <el-radio-button label="small">小</el-radio-button>
                  </el-radio-group>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </el-scrollbar>
      </div>
      <div class="setting-bottom-wrapper" ref="settingBottomRef">
        <el-button class="app-width-full" type="primary" @click="handleSave">
          保存
        </el-button>
        <el-button class="app-width-full" @click="handleRestore">
          恢复默认
        </el-button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, nextTick, onMounted } from 'vue';
import useStore from '@/store';
import setting from '@/common/setting';
import { storage, addClass } from '@/common/utils';

// 创建 store 实例
const { app, settings } = useStore();

const settingTitleRef = ref<any>(null);
const settingBottomRef = ref<any>(null);
const settingScrollHeight = ref<number>(0);

// 可用主题列表
const themeList = ref<any>(setting.themeList);
// 快捷功能栏状态
const settingStatus = computed(() => app().setting);
// 获取个人设置
const mySetting = storage.get('settings.custom') || '';

// 表单数据
const form = reactive({
  theme: mySetting.theme ?? setting.theme,
  showLogo: mySetting.showLogo ?? setting.showLogo,
  fixedHeader: mySetting.fixedHeader ?? setting.fixedHeader,
  showBreadcrumb: mySetting.showBreadcrumb ?? setting.showBreadcrumb,
  showTags: mySetting.showTags ?? setting.showTags,
  showTagsIcon: mySetting.showTagsIcon ?? setting.showTagsIcon,
  showProgress: mySetting.showProgress ?? setting.showProgress,
  showRefresh: mySetting.showRefresh ?? setting.showRefresh,
  showUserInfo: mySetting.showUserInfo ?? setting.showUserInfo,
  routerMode: mySetting.routerMode ?? setting.routerMode,
  recordRoute: mySetting.recordRoute ?? setting.recordRoute,
  formSize: mySetting.formSize ?? setting.formSize
});

watch(
  () => settingStatus.value,
  (val) => {
    if (val) {
      setScrollHeight();
    }
  }
);

onMounted(() => {
  setScrollHeight();
});

// 获取标题与底部元素高度
const setScrollHeight = (): void => {
  nextTick(() => {
    settingScrollHeight.value =
      settingTitleRef.value.offsetHeight + settingBottomRef.value.offsetHeight;
  });
};

// 预览设置
const changeSettingValue = (value: any, key: string): void => {
  settings().changeSetting({ key: key, value: value });
  // 主题预览
  if (key === 'theme') {
    const dom = document.getElementsByTagName('html')[0];
    dom.removeAttribute('class');
    addClass(dom, value);
  }
};

// 保存设置
const handleSave = (): void => {
  handleClose();
  settings().saveSetting(form);
  // window.location.reload();
};

// 恢复默认设置
const handleRestore = (): void => {
  handleClose();
  storage.remove('settings.custom');
  window.location.reload();
};

// 关闭
const handleClose = (): void => {
  app().setSettingClose();
};
</script>
