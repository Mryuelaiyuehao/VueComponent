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
import { generateCssVars, isDarkMode } from "./utils/theme";
import { loadLanguageAsync, setLanguage } from "./utils/i18n";
import { LANGUAGE, DARK_THEME, LIGHT_THEME } from "./statics/js/const";
import messages from "./languages/zh.js";

// 全局组件
Vue.component("base-view", BaseView);
Vue.component("card", Card);
// 设置多语言(默认中文)
Vue.use(VueI18n);
const i18n = new VueI18n({
	locale: LANGUAGE.CHINESE,
	fallbackLocale: LANGUAGE.CHINESE,
	messages: messages,
	lazy: true,
});
window.$i18n = i18n;
// 路由
const router = new VueRouter({
	mode: "history",
	routes,
});
Vue.use(VueRouter);
router.beforeEach(async (to, from, next) => {
	console.log(to);
	try {
		const lang = loadLanguageAsync(to.params.lang);
		setLanguage(lang);
	} catch (error) {
		// todo
	}
	next(true);
	// ...
});
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

