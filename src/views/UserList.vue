<template>
    <div>
        <ProgressLoader
            v-if="isLoading"
        />
        <FailedStatus
            v-if="isFailed"
            :message="errorMessage"
        />
        <NotFound
            v-if="usersNotFound"
            message="users not found!"
        />
        <table v-if="isSuccess" class="table table-sm">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Avatar</th>
                </tr>
            </thead>

            <tbody>
                <tr
                    v-for="(user, index) in users"
                    is="UserItem"
                    :user-id="user.uuid"
                    @viewUser="viewUser(user.uuid)"
                    :key="user.uuid"
                    :index="index"
                    :title="user.titleName"
                    :avatar-src="user.avatarUrl"
                    :first-name="user.firstName"
                    :last-name="user.lastName"
                ></tr>
            </tbody>
        </table>
        
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import UserItem from '../components/UserItem.vue';
import { LoadingStatus, User } from '../models/users';
import { getUsers } from '../services/get-users';
import FailedStatus from '../components/FailedStatus.vue';
import NotFound from '../components/NotFound.vue';
import ProgressLoader from '../components/ProgressLoader.vue';


@Component({
    components: {
        ProgressLoader, FailedStatus, UserItem, NotFound
    },
})
export default class UserList extends Vue {

    users: User[] = [];
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

    get usersNotFound(): boolean {
        return this.isSuccess && !this.users.length;
    }

    mounted() {
        this.loadingStatus = LoadingStatus.Loading;
        getUsers()
            .then((users) => {
                this.loadingStatus = LoadingStatus.Success;
                this.users = users;
            })
            .catch((err) => {
                this.loadingStatus = LoadingStatus.Failed;
                this.errorMessage = err.message;
            });
    }

    viewUser(userId: string): void {
        this.$router.push(`/users/${userId}`);
    }

}
</script>
