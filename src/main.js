import Vue from 'vue'
import App from './App.vue'

import VConsole from "vconsole";
import Devtools from 'vue-vconsole-devtools'
Devtools.initPlugin(new VConsole());
// or init with options
new VConsole({ maxLogNumber: 1000 });
Vue.config.productionTip = false;
// Vue.prototype.$isArray = (arr) => isArray(arr) && arr.length;
// Vue.prototype.$deepCopy = (obj) => JSON.parse(JSON.stringify(obj))
new Vue({
  render: h => h(App),
}).$mount('#app')
