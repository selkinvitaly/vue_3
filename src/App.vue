<template>
    <div>
        <nav role="navigation">
            <div class="nav-wrapper container">
                    <a id="logo-container" class="brand-logo">app</a>
                <ul class="right hide-on-med-and-down">
                    <router-link tag="li" active-class="active" to="/account">
                        <a>Account</a>
                    </router-link>
                    <router-link tag="li" active-class="active" to="/users/">
                        <a>Users</a>
                    </router-link>
                </ul>

                <ul id="nav-mobile" class="sidenav">
                    <router-link tag="li" active-class="active" to="/account">
                        <a>Account</a>
                    </router-link>
                    <router-link tag="li" active-class="active" to="/users/">
                        <a>Users</a>
                    </router-link>
                </ul>
                <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            </div>
        </nav>
        <router-view></router-view>
        <div class="fixed-action-btn">
            <button
                @click="addUser"
                class="pulse btn-floating btn-large waves-effect waves-light"
            ><i class="material-icons">add</i></button>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component } from 'vue-property-decorator';


    @Component({})
    export default class App extends Vue {

        addUser(): void {
            this.$router.push({
                name: 'new-user'
            });
        }
    }

</script>
<style lang="stylus" scoped>
nav
    background-color: #26a69a
</style>


