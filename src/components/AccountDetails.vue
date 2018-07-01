<template>
    <div class="row">
        <div class="col s12 m6">
        <div class="card blue-grey darken-1">
            <div class="card-content white-text">
            <span class="card-title">{{account.login}}</span>
            <p>Welcome to your personal page!</p>
            </div>
            <div class="card-action">
                <a @click.prevent="signOut">Sign out!</a>
            </div>
        </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { Account } from '../models/accounts';


@Component({})
export default class AccountDetails extends Vue {

    @Prop()
    account!: Account;

    signOut(): void {
        this.$emit('sign-out');
    }

}
</script>
