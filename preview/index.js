import Vue from "vue";
import VueRouter from "vue-router";
import VueI18n from "vue-i18n";
import App from "./app.vue";
import BaseView from "./components/BaseView";
import Card from "./components/Card";
import "@/assets/font/index.js";
import "@/assets/css/normalize.css";
import "@/assets/css/reset.scss";
import "./utils/rem.js";
import routes from "./route/index.js";
import { generateCssVars, isDarkMode } from "./utils/theme";

import { LANGUAGE, DARK_THEME, LIGHT_THEME } from "./statics/js/enums";
import messages from "./languages/index.js";

// 全局组件
Vue.component("BaseView", BaseView);
Vue.component("Card", Card);
// 设置多语言(默认中文)
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: LANGUAGE.CHINESE,
  fallbackLocale: LANGUAGE.CHINESE,
  messages: messages,
});
window.$i18n = i18n;
// 路由
const router = new VueRouter({
  mode: "history",
  routes,
});
Vue.use(VueRouter);
//  设置主题
generateCssVars(
  isDarkMode() ? DARK_THEME.primary : LIGHT_THEME.primary,
  isDarkMode()
);
new Vue({
  i18n,
  router,
  render: (h) => h(App),
}).$mount("#app");
