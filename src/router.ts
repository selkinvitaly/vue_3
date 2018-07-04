import Vue from 'vue';
import Router from 'vue-router';

import UserDetails from './views/UserDetails.vue';
import UserList from './views/UserList.vue';
import PersonalAccount from './views/PersonalAccount.vue';
import NewUser from './views/NewUser.vue';
import { checkAuth } from './services/check-auth';

Vue.use(Router);


const router = new Router({
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
      meta: {
          authRequired: true
      },
      component: UserList
    },
    {
      path: '/users/:id',
      name: 'user-details',
      meta: {
            authRequired: true
      },
      component: UserDetails
    },
    {
        path: '/users/new/',
        name: 'new-user',
        meta: {
            authRequired: true
        },
        component: NewUser
    },
    {
        path: '/account',
        name: 'account',
        component: PersonalAccount
    }
  ],
});

router.beforeEach((to, from, next) => {
    const nextPageRequiredAuth = to.matched.some(r => !!r.meta.authRequired);

    if (!nextPageRequiredAuth) {
        return next();
    }

    checkAuth()
        .then(account => {
            if (account) {
                next();
            } else {
                next({
                    name: 'account',
                    query: {
                        redirect: to.name!
                    }
                });
            }
        })
        .catch(next);
});

export default router;
