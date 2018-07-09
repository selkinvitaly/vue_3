<template>
    <div class="msg msg-error z-depth-3 scale-transition" role="alert">{{message}}</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';


@Component
export default class Alert extends Vue {

    @Prop()
    message!: string;

}
</script>

<style lang="stylus" scoped>
    .msg {
        padding 10px
        margin 20px
        color grey
    }

    .msg-error {
        background-color #ef5350
        color white
    }

    .msg-alert {
        background-color: #ff9800
        color: white
    }

    .msg-info {
        color white
        background-color #29b6f6
    }
</style>
