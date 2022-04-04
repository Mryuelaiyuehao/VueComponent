import Vue from "vue";
import VueRouter from "vue-router";
import App from "./app.vue";
import BaseView from "./components/BaseView";
import Card from "./components/Card";
import "@/assets/font/index.js"; // 字体
import "@/assets/css/normalize.css";
import "@/utils/rem.js";
import cssVars from "css-vars-ponyfill";
import { generateTheme, isDarkMode } from "@/utils/index";
import routes from "./route/index.js";
const router = new VueRouter({
	mode: "history",
	routes,
});

cssVars({
	variables: generateTheme(isDarkMode()),
});
Vue.component("base-view", BaseView);
Vue.component("card", Card);
Vue.use(VueRouter);
new Vue({
	router,
	render: (h) => h(App),
}).$mount("#app");

