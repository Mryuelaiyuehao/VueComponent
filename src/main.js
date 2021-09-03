import Vue from 'vue'
import App from './App.vue'

import {isArray} from 'lodash'
Vue.config.productionTip = false;
Vue.prototype.$isArray = (arr) => isArray(arr) && arr.length;
new Vue({
  render: h => h(App),
}).$mount('#app')
