import Vuex from 'vuex';
import Vue from 'vue';


import usersModule from './modules/users';

Vue.use(Vuex);

export interface RootState {}

const store = new Vuex.Store<RootState>({

    strict: process.env.NODE_ENV !== 'production',

    modules: {
        users: usersModule
    }
});

export default store;
