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
        
        <TableWithUsers
            v-if="isSuccess"
            :users="users"
            @view-user="viewUser($event)"
            @delete-user="markAsPendingDeletion($event)"
        >
            <div class="controls" slot="header">
                <div class="per-page">
                    <span class="per-page__label">total users: {{totalUsers}}</span>
                    <PerPage
                        v-model="pageSize"
                    />
                </div>
            </div>

            <div slot="footer">
                <PageNav
                    v-model="pageNav"
                    :size="pageSize"
                    :total="totalUsers"
                />
            </div>
        </TableWithUsers>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';

import TableWithUsers from '../components/TableWithUsers/index.vue';
import PageNav from '../components/TableWithUsers/PageNav.vue';
import PerPage from '../components/TableWithUsers/PerPage.vue';
import { LoadingStatus, User } from '../models/users';
import { PageSizeTypes } from '../models/pagination';
import { getUsers } from '../services/get-users';
import { deleteUserById } from '../services/delete-user.by-id';
import FailedStatus from '../components/FailedStatus.vue';
import NotFound from '../components/NotFound.vue';
import ProgressLoader from '../components/ProgressLoader.vue';
import DeleteUserModal from '../components/DeleteUserModal.vue';


@Component({
    components: {
        ProgressLoader, FailedStatus, TableWithUsers, NotFound, DeleteUserModal,
        PageNav, PerPage
    },
})
export default class UserList extends Vue {

    users: User[] = [];
    totalUsers: number = 0;
    loadingStatus = LoadingStatus.Initial;
    errorMessage: string | null = null;
    pageSize = PageSizeTypes.ThreeUsersPerPage;
    pageNav = 1;

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

    get skip(): number {
        return (this.pageNav - 1) * this.pageSize;
    }

    get limit(): number {
        return this.pageSize;
    }

    mounted() {
        this.fetchUsers();
    }

    @Watch('pageNav')
    @Watch('pageSize')
    updateUserList(): void {
        this.fetchUsers();
    }

    fetchUsers(): void {
        this.loadingStatus = LoadingStatus.Loading;
        getUsers({ skip: this.skip, limit: this.limit })
            .then(({ total, users }) => {
                this.loadingStatus = LoadingStatus.Success;
                this.users = users;
                this.totalUsers = total;
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

<style lang="stylus" scoped>
    .controls {
        padding: 10px 5px 0
    }

    .per-page {
        display: flex

        &__label {
            font-weight: bold
            line-height: 36px
            margin-right: 10px
        }
    }

</style>
