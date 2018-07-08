<template>
    <nav role="navigation">
        <div class="nav-wrapper container">
            <a id="logo-container" class="brand-logo">app</a>
            <ul class="right hide-on-med-and-down">
                <router-link tag="li" to="/account">
                    <a>Account</a>
                </router-link>
                <router-link tag="li" to="/users/">
                    <a>Users</a>
                </router-link>
            </ul>

            <ul ref="sidenav" id="nav-mobile" class="sidenav">
                <router-link tag="li" to="/account">
                    <a>Account</a>
                </router-link>
                <router-link tag="li" to="/users/">
                    <a>Users</a>
                </router-link>
            </ul>
            <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        </div>
    </nav>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component } from 'vue-property-decorator';
    import { Sidenav } from 'materialize-css';


    @Component({})
    export default class Header extends Vue {

        sidenavInstance: Sidenav | null = null;

        mounted() {
            this.sidenavInstance = Sidenav.init(this.$refs.sidenav as HTMLElement);
        }

        beforeDestroy() {
            this.sidenavInstance!.destroy();
        }
    }

</script>
<style lang="stylus" scoped>
    nav {
        background-color: #26a69a
    }
</style>


