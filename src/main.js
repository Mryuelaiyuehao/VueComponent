import Vue from 'vue'
import App from './App.vue'

import VConsole from "vconsole";
import Devtools from 'vue-vconsole-devtools'
Devtools.initPlugin(new VConsole());
// or init with options
// const vConsole = new VConsole({ maxLogNumber: 1000 });
import {isArray} from 'lodash'
Vue.config.productionTip = false;
Vue.prototype.$isArray = (arr) => isArray(arr) && arr.length;
Vue.prototype.$deepCopy = (obj) => JSON.parse(JSON.stringify(obj))
new Vue({
  render: h => h(App),
}).$mount('#app')
