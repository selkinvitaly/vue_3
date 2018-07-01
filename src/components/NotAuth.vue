<template>
    <div class="row">
        <div class="col s12">
        <div class="card blue-grey darken-1">
            <div class="card-content white-text">
            <span class="card-title">Ooops!!</span>
            <p>You need sign in!</p>
            </div>
            <div class="card-action">
                <a @click.prevent="signIn">Sign in!</a>
            </div>
        </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';


@Component({})
export default class NotAuth extends Vue {

    signIn() {
        this.$emit('sign-in');
    }

}
</script>
