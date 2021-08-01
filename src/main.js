import Vue from 'vue'
import App from './App.vue'
// 引入anime动画库
import anime from 'animejs/lib/anime.es.js';
Vue.prototype.$anime = anime;
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
