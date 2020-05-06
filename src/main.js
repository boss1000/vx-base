import Vue from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';
import FastClick from 'fastclick'
// 瀑布流
import waterfall from 'vue-waterfall2'
// 全局引入UI库 vant
import '@/plugins/vant'
// 全局引入rem
import '@/config/rem'
// 全局引入 Reset-css
import 'reset-css'
//  全局引入 过滤器
import '@/config/filter'

Vue.config.productionTip = false

// 解决移动端点击延迟200ms的问题
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
      FastClick.attach(document.body);
  }, false);
}

Vue.use(waterfall)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
