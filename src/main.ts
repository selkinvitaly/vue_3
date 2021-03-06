import * as ES6Promise from 'es6-promise';
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import 'whatwg-fetch';
import 'materialize-css/dist/css/materialize.css';

import App from './App.vue';
import router from './router';
import store from './store';


ES6Promise.polyfill();
Vue.config.productionTip = false;
Vue.use(VeeValidate);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
