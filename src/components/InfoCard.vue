<template>
    <div class="row">
        <div class="col s12 m6 offset-m3">
        <div class="card grey darken-1">
            <div class="card-content white-text">
            <span class="card-title">{{headerText}}</span>
            <p>{{description}}</p>
            </div>
            <div class="card-action">
                <a @click.prevent="clickButton">{{buttonText}}</a>
            </div>
        </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';


@Component({})
export default class InfoCard extends Vue {

    @Prop()
    headerText!: string;

    @Prop()
    description!: string;

    @Prop()
    buttonText!: string;

    clickButton(): void {
        this.$emit('click-button');
    }

}
</script>
