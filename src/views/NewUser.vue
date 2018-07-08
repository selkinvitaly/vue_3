<template>
    <div>
        <ProgressLoader
            v-if="isLoading"
        />

        <FailedStatus
            v-if="isFailed"
            :message="errorMessage"
        />

        <NewUserForm
            v-model="newUserModel"
            :is-loading="isLoading"
        >
            <button
                type="button"
                :disabled="!allFieldsFilled"
                class="waves-effect waves-light btn"
                @click="createUser"
            >create new user</button>
        </NewUserForm>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import FailedStatus from '../components/FailedStatus.vue';
import ProgressLoader from '../components/ProgressLoader.vue';
import NewUserForm from '../components/NewUserForm.vue';
import { LoadingStatus, NewUser } from '../models/users';
import { createNewUser } from '../services/create-new-user';


@Component({
    components: {
        FailedStatus, ProgressLoader, NewUserForm
    }
})
export default class UserDetails extends Vue {

    newUserModel = this.getDefaultModel();
    loadingStatus = LoadingStatus.Initial;
    errorMessage: string | null = null;

    get isLoading(): boolean {
        return this.loadingStatus === LoadingStatus.Loading;
    }

    get isFailed(): boolean {
        return this.loadingStatus === LoadingStatus.Failed;
    }

    get isSuccess(): boolean {
        return this.loadingStatus === LoadingStatus.Success;
    }

    get allFieldsFilled(): boolean {
        return Object.keys(this.newUserModel)
            .reduce((acc: boolean, field: string) => {
                // avatarUrl - optional
                return field !== 'avatarUrl'
                    ? acc && !!(this.newUserModel as {[key: string]: any})[field]
                    : acc;
            }, true);
    }

    getDefaultModel(): NewUser {
        return {
            titleName: '',
            firstName: '',
            lastName: '',
            avatarUrl: '',
            phone: '',
            email: ''
        };
    }


    createUser(): void {
        this.loadingStatus = LoadingStatus.Loading;
        createNewUser(this.newUserModel)
            .then(() => {
                this.newUserModel = this.getDefaultModel();
                this.loadingStatus = LoadingStatus.Success;
            })
            .catch(err => {
                this.errorMessage = err.message;
                this.loadingStatus = LoadingStatus.Failed;
            });
    }

}
</script>

