<template>
    <div class="input-field col s12 wrapper">
        <textarea
            ref="field"
            :id="id"
            class="biography materialize-textarea"
            :disabled="isLoading"
            :placeholder="placeholder"
            v-model="content"
        ></textarea>
        <label
            class="active label"
            :for="id"
        >{{title}}</label>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch, Model } from 'vue-property-decorator';

// tslint:disable-next-line
const ClassicEditor = require('@ckeditor/ckeditor5-build-classic');


@Component<any>({
    instance: null
})
export default class WysiwygArea extends Vue {

    @Prop({ type: Boolean, required: true })
    isLoading!: boolean;

    @Prop({ type: String, required: true })
    title!: string;

    @Prop({ type: String, required: true })
    id!: string;

    @Prop({ type: String, required: true })
    placeholder!: string;

    @Model('update-content', { type: String })
    content!: string;

    @Watch('content')
    updateContent() {
        (this.$options as any).instance.setData(this.content);
    }

    mounted() {
        const config = {
            toolbar: [
                'heading',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                'blockQuote',
                'undo',
                'redo'
            ]
        };

        ClassicEditor
            .create(this.$refs.field, config)
            .then((editor: any) => {
                (window as any).t = editor;
                (this.$options as any).instance = editor;
                editor.model.document.on('change:data', () => {
                    this.$emit('update-content', editor.getData());
                });
            })
            .catch(console.error);
    }

    beforeDestroy() {
        if (!(this.$options as any).instance) {
            return;
        }

        (this.$options as any).instance.destroy()
            .catch(console.error);
    }

}
</script>

<style lang="stylus" scoped>
    .new-user {
        padding-top 20px
    }

    .wrapper {
        padding 15px 10px 0
    }

    .label {
        transform translateY(-30px) scale(.8)
    }

</style>
