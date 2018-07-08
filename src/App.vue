<template>
    <div>
        <Header />

        <router-view></router-view>

        <div class="fixed-action-btn">
            <button
                @click="addUser"
                type="button"
                class="red pulse btn-floating btn-large waves-effect waves-light"
            ><i class="material-icons">add</i></button>
        </div>

        <Footer />
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component } from 'vue-property-decorator';

    import Header from './components/Header.vue';
    import Footer from './components/Footer.vue';


    @Component({
        components: {
            Header, Footer
        }
    })
    export default class App extends Vue {

        addUser(): void {
            this.$router.push({
                name: 'new-user'
            });
        }
    }

</script>
