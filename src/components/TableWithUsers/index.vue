<template>
    <div>
        <ProgressLoader
            v-if="isLoading"
        />
        <Alert
            v-if="isFailed"
            :message="errorMessage"
        />
        <Alert
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

        <div class="table-users">
            <div class="header">
                
                <div class="controls">
                    <div class="per-page">
                        <span class="per-page__label">total users: {{totalUsers}}</span>
                        <PerPage
                            v-model="pageSize"
                        />
                    </div>
                </div>

            </div>
            <table class="striped responsive-table">
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
                        :index="getOrderByIndex(index)"
                        :key="user.uuid"
                        :user="user"
                        @view-user="viewUser"
                        @delete-user="markAsPendingDeletion"
                    ></tr>
                </tbody>
            </table>
            <div class="footer">
                <div class="footer__bars">
                    <PageNav
                        v-model="pageNav"
                        :size="pageSize"
                        :total="totalUsers"
                    />
                </div>
            </div>
        </div>

    </div>
    
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';

import UserItem from './UserItem.vue';
import PageNav from './PageNav.vue';
import PerPage from './PerPage.vue';
import ProgressLoader from '../ProgressLoader.vue';
import DeleteUserModal from '../DeleteUserModal.vue';
import Alert from '../Alert.vue';
import { User, LoadingStatus } from '../../models/users';
import { PageSizeTypes } from '../../models/pagination';
import { getUsers } from '../../services/get-users';
import { deleteUserById } from '../../services/delete-user.by-id';


@Component({
    components: {
        UserItem, PageNav, PerPage, ProgressLoader, DeleteUserModal, Alert
    }
})
export default class TableWithUsers extends Vue {

    users: User[] = [];
    totalUsers = 0;
    loadingStatus = LoadingStatus.Initial;
    errorMessage: string | null = null;
    pageNav = 1;
    pageSize = PageSizeTypes.ThreeUsersPerPage;
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

    get maxAvailablePage(): number {
        return Math.ceil(this.totalUsers / this.pageSize);
    }


    mounted() {
        this.fetchUsers();
    }


    getOrderByIndex(i: number): number {
        return (this.pageNav - 1) * this.pageSize + i;
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

    @Watch('pageNav')
    @Watch('pageSize')
    updateUserList(): void {
        if (this.pageNav > this.maxAvailablePage) {
            this.pageNav = 1;
        }
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

}
</script>


<style lang="stylus" scoped>
    .footer {
        text-align center

        &__bars {
            display inline-block
        }
    }

    .controls {
        padding 10px 5px 0
    }

    .per-page {
        display flex

        &__label {
            font-weight bold
            line-height 36px
            margin-right 10px
        }
    }
</style>

