import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import router from './router/index';

import 'bootstrap/dist/css/bootstrap.css';

Vue.config.productionTip = false;

Vue.use(VueRouter);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});