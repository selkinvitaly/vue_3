<template>
    <div>
        <label :for="id">{{title}}</label>
        <input
            class="form-control"
            ref="input"
            type="text"
            :placeholder="placeholder"
            :id="id"
            :value="date"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch, Model, Prop } from 'vue-property-decorator';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/material_green.css';


@Component<any>({
    instance: null
})
export default class Datepicker extends Vue {

    @Prop({ type: String, required: true })
    title!: string;

    @Prop({ type: String, required: true })
    placeholder!: string;

    @Prop({ type: String, required: true })
    id!: string;

    @Model('update-date', { type: String })
    date!: string;

    @Watch('date')
    updateDate(): void {
        this.changeDateInFlatpickr(this.date);
        this.emitUpdatedDateToParent(this.date);
    }

    mounted() {
        const inputRef = this.$refs.input as HTMLInputElement;
        (this.$options as any).instance = flatpickr(inputRef, {
            dateFormat: 'd.m.Y',
            onChange: (dates: Date[], date: string): void => {
                this.emitUpdatedDateToParent(date);
            }
        });
    }

    beforeDestroy() {
        (((this.$options as any).instance) as flatpickr.Instance).destroy();
    }

    emitUpdatedDateToParent(date: string): void {
        this.$emit('update-date', date);
    }

    changeDateInFlatpickr(date: string): void {
        (((this.$options as any).instance) as flatpickr.Instance).setDate(date);
    }

}
</script>
