import * as ES6Promise from 'es6-promise';
import Vue from 'vue';
import 'whatwg-fetch';
import 'materialize-css/dist/css/materialize.css';

import App from './App.vue';
import router from './router';
import './vendor/materialize';


ES6Promise.polyfill();
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
