import Vue from 'vue';

import Router from 'vue-router';
import UserDetails from './views/UserDetails.vue';
import UserList from './views/UserList.vue';
import PersonalAccount from './views/PersonalAccount.vue';

Vue.use(Router);


export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'main',
      redirect: '/users'
    },
    {
      path: '/users',
      name: 'user-list',
      component: UserList
    },
    {
      path: '/users/:id',
      name: 'user-details',
      component: UserDetails
    },
    {
        path: '/account',
        name: 'account',
        component: PersonalAccount
    }
  ],
});
