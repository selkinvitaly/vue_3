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
        <DeleteUserModal
            v-if="deleteModalIsVisible"
            @confirm="confirmDeletionUser"
            @cancel="markAsPendingDeletion(null)"
        >
            <h5 slot="header">Confirm user deletion!</h5>
            <div slot="body">Are you sure that you want delete this user?</div>
        </DeleteUserModal>
        <table v-if="isSuccess" class="striped responsive-table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Avatar</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>

            <tbody>
                <tr
                    v-for="(user, index) in users"
                    is="UserItem"
                    :index="index"
                    :key="user.uuid"
                    :user="user"
                    @view-user="viewUser($event)"
                    @delete-user="markAsPendingDeletion($event)"
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
import { deleteUserById } from '../services/delete-user.by-id';
import FailedStatus from '../components/FailedStatus.vue';
import NotFound from '../components/NotFound.vue';
import ProgressLoader from '../components/ProgressLoader.vue';
import DeleteUserModal from '../components/DeleteUserModal.vue';


@Component({
    components: {
        ProgressLoader, FailedStatus, UserItem, NotFound, DeleteUserModal
    },
})
export default class UserList extends Vue {

    users: User[] = [];
    loadingStatus = LoadingStatus.Initial;
    errorMessage: string | null = null;

    userIdPendingDeletion: string | null = null;

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

    get deleteModalIsVisible(): boolean {
        return !!this.userIdPendingDeletion;
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

    confirmDeletionUser(): void {
        this.loadingStatus = LoadingStatus.Loading;
        deleteUserById(this.userIdPendingDeletion!)
            .then(() => {
                this.loadingStatus = LoadingStatus.Success;
                this.users = this.users.filter(u => u.uuid !== this.userIdPendingDeletion);
                this.userIdPendingDeletion = null;
            })
            .catch(err => {
                this.loadingStatus = LoadingStatus.Failed;
                this.errorMessage = err.message;
            });
    }

    viewUser(userId: string): void {
        this.$router.push({
            name: 'user-details',
            params: {
                id: userId
            }
        });
    }

    markAsPendingDeletion(userId: string | null): void {
        this.userIdPendingDeletion = userId;
    }

}
</script>
