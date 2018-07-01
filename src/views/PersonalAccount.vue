<template>
    <div>
        <ProgressLoader
            v-if="isLoading"
        />
        <FailedStatus
            v-if="isFailed"
            :message="errorMessage"
        />

        <AccountDetails
            v-if="authorized"
            :account="account"
            @sign-out="signOut"
        />

        <NotAuth
            v-if="notAuthorized"
            @sign-in="showAuthForm"
        />

        <SignInForm
            v-if="authFormVisible"
            :login="authFormData.login"
            :password="authFormData.password"
            @input-login="updateSignInData({login: $event})"
            @submit="signIn"
            @input-password="updateSignInData({password: $event})"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import { LoadingStatus } from '../models/users';
import { Account } from '../models/accounts';
import { checkAuth } from '../services/check-auth';
import { signIn } from '../services/sign-in';
import { signOut } from '../services/sign-out';
import FailedStatus from '../components/FailedStatus.vue';
import ProgressLoader from '../components/ProgressLoader.vue';
import NotAuth from '../components/NotAuth.vue';
import AccountDetails from '../components/AccountDetails.vue';
import SignInForm from '../components/SignInForm.vue';


interface SignInData {
    login: string;
    password: string;
}

@Component({
    components: {
        ProgressLoader, FailedStatus, NotAuth, AccountDetails, SignInForm
    }
})
export default class PersonalAccount extends Vue {

    account: Account | null = null;
    loadingStatus = LoadingStatus.Initial;
    errorMessage: string | null = null;

    authFormVisible = false;
    authFormData: SignInData = {
        login: '',
        password: ''
    };

    get isLoading(): boolean {
        return this.loadingStatus === LoadingStatus.Loading;
    }

    get isFailed(): boolean {
        return this.loadingStatus === LoadingStatus.Failed;
    }

    get authorized(): boolean {
        return this.isSuccess && !!this.account;
    }

    get notAuthorized(): boolean {
        return this.isSuccess && !this.account;
    }

    get isSuccess(): boolean {
        return this.loadingStatus === LoadingStatus.Success;
    }

    mounted(): void {
        this.checkAuth();
    }

    checkAuth() {
        this.loadingStatus = LoadingStatus.Loading;
        checkAuth()
            .then(account => {
                this.loadingStatus = LoadingStatus.Success;
                this.account = account;
            })
            .catch(err => {
                this.loadingStatus = LoadingStatus.Failed;
                this.errorMessage = err.message;
            });
    }

    signIn(): void {
        this.loadingStatus = LoadingStatus.Loading;
        signIn(this.authFormData.login, this.authFormData.password)
            .then(account => {
                this.loadingStatus = LoadingStatus.Success;
                this.account = account;
                this.authFormVisible = false;
            })
            .catch(err => {
                this.loadingStatus = LoadingStatus.Failed;
                this.authFormVisible = false;
                this.errorMessage = err.message;
            });
    }

    showAuthForm(): void {
        this.authFormVisible = true;
    }

    signOut(): void {
        this.loadingStatus = LoadingStatus.Loading;
        signOut()
            .then(() => {
                this.loadingStatus = LoadingStatus.Success;
                this.account = null;
                this.authFormVisible = false;
            })
            .catch(err => {
                this.loadingStatus = LoadingStatus.Failed;
                this.authFormVisible = false;
                this.errorMessage = err.message;
            });
    }

    updateSignInData(signInData: Partial<SignInData>): void {
        this.authFormData = {
            ...this.authFormData,
            ...signInData
        };
    }

}
</script>
