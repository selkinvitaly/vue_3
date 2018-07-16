<template>
    <div>
        <ProgressLoader
            v-if="isLoading"
        />

        <Alert
            v-if="isFailed"
            :message="errorMessage"
        />

        <InfoCard
            v-if="authorized"
            :header-text="account.login"
            description="Welcome to your personal page!"
            button-text="Sign-out!"
            @click-button="signOut"
        />

        <InfoCard
            v-if="notAuthorized"
            header-text="Ooops!!"
            description="You need to sign-in!"
            button-text="Sign-in!"
            @click-button="showAuthForm"
        />

        <SignInForm
            v-if="authFormVisible"
            v-model="authFormData"
            @submit="signIn"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import { LoadingStatus } from '../models/users';
import { Account, SignInData } from '../models/accounts';
import { checkAuth } from '../services/check-auth';
import { signIn } from '../services/sign-in';
import { signOut } from '../services/sign-out';
import Alert from '../components/Alert.vue';
import ProgressLoader from '../components/ProgressLoader.vue';
import InfoCard from '../components/InfoCard.vue';
import SignInForm from '../components/SignInForm.vue';


@Component({
    components: {
        ProgressLoader, Alert, InfoCard, SignInForm
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
                this.redirectIfNecessary();
            })
            .catch(err => {
                this.loadingStatus = LoadingStatus.Failed;
                this.authFormVisible = false;
                this.errorMessage = err.message;
            });
    }

    redirectIfNecessary() {
        const query = this.$route.query;
        if (!query.redirect) {
            return;
        }
        this.$router.push({
            name: query.redirect
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

}
</script>
