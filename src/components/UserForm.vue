<template>
    <div class="row new-user">
        <form class="col s12 m6 offset-m3">
            <div class="form-group">
                <label for="edit-title-name">Title name</label>
                <input
                    v-model="localUserModel.titleName"
                    v-validate="'required|max:5'"
                    :class="{'form-control': true, 'invalid': errors.has('title')}"
                    name="title"
                    :disabled="isLoading"
                    type="text"
                    class="form-control"
                    id="edit-title-name"
                    placeholder="Enter title (mr, ms etc.)"
                >
            </div>
            <div class="form-group">
                <label for="edit-first-name">First name</label>
                <input
                    v-model="localUserModel.firstName"
                    v-validate="'required'"
                    :class="{'form-control': true, 'invalid': errors.has('first-name')}"
                    name="first-name"
                    :disabled="isLoading"
                    type="text"
                    class="form-control"
                    id="edit-first-name"
                    placeholder="Enter your first name"
                >
            </div>

            <div class="form-group">
                <label for="edit-last-name">Last name</label>
                <input
                    v-model="localUserModel.lastName"
                    v-validate="'required'"
                    :class="{'form-control': true, 'invalid': errors.has('last-name')}"
                    name="last-name"
                    :disabled="isLoading"
                    type="text"
                    class="form-control"
                    id="edit-last-name"
                    placeholder="Enter your last name"
                >
            </div>

            <div class="form-group">
                <label for="edit-phone">Phone</label>
                <input
                    v-model="localUserModel.phone"
                    :disabled="isLoading"
                    type="text"
                    class="form-control"
                    id="edit-phone"
                    placeholder="Enter your phone"
                >
            </div>

            <div class="form-group">
                <label for="edit-email">Email</label>
                <input
                    v-model="localUserModel.email"
                    v-validate="'required|email'"
                    name="email"
                    :class="{'form-control': true, 'invalid': errors.has('email')}"
                    :disabled="isLoading"
                    type="email"
                    class="form-control"
                    id="edit-email"
                    placeholder="Enter your email"
                >
            </div>

            <div class="form-group">
                <Datepicker
                    title="Birthday"
                    id="edit-birthday"
                    placeholder="Enter your birthday"
                    v-model="localUserModel.birthday"
                />
            </div>

            <div class="form-group">
                <label for="edit-avatar">Avatar Url</label>
                <input
                    v-model="localUserModel.avatarUrl"
                    v-validate="'url'"
                    name="avatar"
                    :class="{'form-control': true, 'invalid': errors.has('avatar')}"
                    :disabled="isLoading"
                    type="url"
                    class="form-control"
                    id="edit-avatar"
                    placeholder="Enter link for your avatar"
                >
            </div>

            <div class="row">
                <WysiwygArea
                    :is-loading="isLoading"
                    id="biography"
                    v-model="localUserModel.biography"
                    placeholder="Enter your biography"
                    title="Biography"
                />
            </div>

            <slot></slot>
        </form>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch, Model } from 'vue-property-decorator';

import { NewUser } from '../models/users';
import Datepicker from './Datepicker.vue';
import WysiwygArea from './WysiwygArea.vue';


@Component({
    components: {
        Datepicker, WysiwygArea
    }
})
export default class UserForm extends Vue {

    localUserModel: NewUser = {
        ...this.userModel
    };

    @Prop()
    isLoading!: boolean;

    @Model('update-user-model', { type: Object })
    userModel!: NewUser;

    @Watch('localUserModel', { deep: true })
    updateModelForNewUser() {
        this.$emit('update-user-model', this.localUserModel);
    }

}
</script>

<style lang="stylus" scoped>
    .new-user {
        padding-top 20px
    }

    .biography {
        min-height 200px
    }
</style>
