<template>
    <div class="row">
        <form @submit.prevent="onSubmit" class="col s12">
            <div class="row">
                <div class="input-field col s6">
                    <input
                        placeholder="Login"
                        id="login"
                        type="text"
                        :value="login"
                        @input="onInputLogin"
                        required
                    >
                    <label for="login">Login</label>
                    <span class="helper-text" data-error="wrong" data-success="right">login: user-1</span>
                </div>
                <div class="input-field col s6">
                    <input
                        id="password"
                        type="password"
                        :value="password"
                        @input="onPasswordLogin"
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
import { Component, Prop } from 'vue-property-decorator';



@Component({})
export default class SignInForm extends Vue {

    @Prop()
    login!: string;

    @Prop()
    password!: string;

    onInputLogin($e: Event): void {
        this.$emit('input-login', ($e.target as HTMLInputElement).value);
    }

    onPasswordLogin($e: Event): void {
        this.$emit('input-password', ($e.target as HTMLInputElement).value);
    }

    onSubmit(): void {
        this.$emit('submit');
    }

}
</script>
