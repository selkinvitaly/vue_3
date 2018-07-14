<template>
    <div class="row">
        <form @submit.prevent="onSubmit" class="col s12">
            <div class="row">
                <div class="input-field col s6">
                    <input
                        placeholder="Login"
                        id="login"
                        type="text"
                        v-validate="'required'"
                        name="login"
                        :class="{'form-control': true, 'invalid': errors.has('login')}"
                        v-model="localFormData.login"
                        required
                    >
                    <label for="login">Login</label>
                    <span class="helper-text" data-error="wrong" data-success="right">login: user-1</span>
                </div>
                <div class="input-field col s6">
                    <input
                        id="password"
                        type="password"
                        v-validate="'required'"
                        name="password"
                        :class="{'form-control': true, 'invalid': errors.has('password')}"
                        v-model="localFormData.password"
                        required
                    >
                    <label for="password">Password</label>
                    <span class="helper-text" data-error="wrong" data-success="right">pw: 131dwstwte</span>
                </div>
            </div>
            <div class="row">
                <button
                    class="btn waves-effect waves-light"
                    type="submit"
                    name="action"
                >Submit
                    <i class="material-icons right">send</i>
                </button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch, Model } from 'vue-property-decorator';

import { SignInData } from '../models/accounts';


@Component({})
export default class SignInForm extends Vue {

    localFormData: SignInData = {
        ...this.account
    };

    @Model('update-account-model', { type: Object })
    account!: SignInData;

    @Watch('localFormData', { deep: true })
    onChangeForm() {
        this.$emit('update-account-model', this.localFormData);
    }

    onSubmit(): void {
        this.$emit('submit');
    }

}
</script>
