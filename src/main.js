import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import App from './App';
import router from './router/index';
import storeData from './store';
import { initialize } from './helpers/general';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store(storeData);

initialize(store, router);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
