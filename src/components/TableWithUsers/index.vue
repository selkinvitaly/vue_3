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
                    <slot name="header" />
                </thead>

                <tbody>
                    <slot
                        name="body"
                        :users="users"
                        :get-order-by-index="getOrderByIndex"
                        :view-user="viewUser"
                        :mark-as-pending-deletion="markAsPendingDeletion"
                    />
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
import { Component } from 'vue-property-decorator';

import PageNav from './PageNav.vue';
import PerPage from './PerPage.vue';
import ProgressLoader from '../ProgressLoader.vue';
import DeleteUserModal from '../DeleteUserModal.vue';
import Alert from '../Alert.vue';
import { User, LoadingStatus } from '../../models/users';
import { PageSizeTypes } from '../../models/pagination';
import { UsersModuleState, UsersModuleGetters } from '../../store/modules/users';


@Component({
    components: {
        PageNav, PerPage, ProgressLoader, DeleteUserModal, Alert
    }
})
export default class TableWithUsers extends Vue {

    get state(): UsersModuleState {
        return this.$store.state.users;
    }

    get getters(): UsersModuleGetters {
        return this.$store.getters;
    }


    get totalUsers(): number {
        return this.state.totalUsers;
    }

    get users(): User[] {
        return this.state.users;
    }

    get errorMessage(): string | null {
        return this.state.errorMessage;
    }

    get pageNav(): number {
        return this.state.pageNav;
    }

    set pageNav(page: number) {
        this.$store.commit({
            type: 'setPageNav',
            page
        });
        this.fetchUsers();
    }

    get pageSize(): PageSizeTypes {
        return this.state.pageSize;
    }

    set pageSize(size: PageSizeTypes) {
        this.$store.commit({
            type: 'setPageSize',
            size
        });
        if (this.pageNav > this.maxAvailablePage) {
            this.pageNav = 1;
        }
        this.fetchUsers();
    }

    get isLoading(): boolean {
        return this.state.loadingStatus === LoadingStatus.Loading;
    }

    get isFailed(): boolean {
        return this.state.loadingStatus === LoadingStatus.Failed;
    }

    get isSuccess(): boolean {
        return this.state.loadingStatus === LoadingStatus.Success;
    }

    get usersNotFound(): boolean {
        return this.isSuccess && !this.state.users.length;
    }

    get deleteModalIsVisible(): boolean {
        return !!this.state.userIdPendingDeletion;
    }

    get skip(): number {
        return this.getters.skip;
    }

    get limit(): number {
        return this.getters.limit;
    }

    get maxAvailablePage(): number {
        return Math.ceil(this.state.totalUsers / this.state.pageSize);
    }


    mounted() {
        this.fetchUsers();
    }


    getOrderByIndex(i: number): number {
        return this.getters.getOrderByIndex(i);
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
        this.$store.commit({
            type: 'setUserIdPendingDeletion',
            userId
        });
    }

    fetchUsers(): void {
        this.$store.dispatch({
            type: 'fetchUsers'
        });
    }

    confirmDeletionUser(): void {
        this.$store.dispatch({
            type: 'confirmDeletionUser'
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

