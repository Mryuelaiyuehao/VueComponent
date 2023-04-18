import Vue from "vue";
import VueRouter from "vue-router";
import VueI18n from "vue-i18n";
import App from "./app.vue";
import BaseView from "./components/BaseView";
import Card from "./components/Card";
import "@/assets/font/index.js";
import "@/assets/css/normalize.css";
import "@/utils/rem.js";
import routes from "./route/index.js";
import { isDarkMode, generateCssVars, switchLanguage } from "../src/utils";
import { DARK_THEME, LIGHT_THEME } from "../src/assets/js/const";
import messages from "./languages/index";
// 全局组件
Vue.component("base-view", BaseView);
Vue.component("card", Card);
// 设置多语言
Vue.use(VueI18n);
const i18n = new VueI18n({
	locale: "en",
	messages: messages,
});
switchLanguage(i18n, "zh");
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

