<template>
    <div class="row new-user">
        <form class="col s12 m6 offset-m3">
            <div class="form-group">
                <label for="edit-title-name">Title name</label>
                <input
                    v-model="localUserModel.titleName"
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
                    :disabled="isLoading"
                    type="url"
                    class="form-control"
                    id="edit-avatar"
                    placeholder="Enter link for your avatar"
                >
            </div>

            <div class="row">
                <div class="input-field col s12">
                    <textarea
                        id="biography"
                        class="active biography materialize-textarea"
                        :disabled="isLoading"
                        placeholder="Enter your biography"
                        v-model="localUserModel.biography"
                    ></textarea>
                    <label for="biography">Biography</label>
                </div>
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


@Component({
    components: {
        Datepicker
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
