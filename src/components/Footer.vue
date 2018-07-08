<template>
    <footer class="page-footer">
        <div class="container">
        <div class="row">
            <div class="col l6 s12">
            <h5 class="white-text">What's it?</h5>
            <p class="grey-text text-lighten-4">This is a test application on vuejs!<br/>Just for fun! &#x263A;</p>
            </div>
            <div class="col l4 offset-l2 s12">
            <h5 class="white-text">Menu</h5>
            <ul>
                <router-link tag="li" to="/account">
                    <a class="grey-text text-lighten-3">Account</a>
                </router-link>
                <router-link tag="li" to="/users/">
                    <a class="grey-text text-lighten-3">Users</a>
                </router-link>
            </ul>
            </div>
        </div>
        </div>
        <div class="footer-copyright">
            <div class="container">
                © 2018 All rights reserved!
                <a class="grey-text text-lighten-4 right" href="//github.com/selkinvitaly/vue_3">sources</a>
            </div>
        </div>
    </footer>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component } from 'vue-property-decorator';


    @Component({})
    export default class Footer extends Vue {}

</script>
<style lang="stylus" scoped>
    .page-footer
        background-color: #26a69a
</style>


