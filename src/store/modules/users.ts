import { Module, ActionContext } from 'vuex';

import { User, LoadingStatus } from '../../models/users';
import { PageSizeTypes } from '../../models/pagination';
import { RootState } from '../index';
import { getUsers } from '../../services/get-users';
import { deleteUserById } from '../../services/delete-user.by-id';


export interface UsersModuleState {
    users: User[];
    totalUsers: number;
    loadingStatus: LoadingStatus;
    pageNav: number;
    pageSize: PageSizeTypes;
    errorMessage: string | null;
    userIdPendingDeletion: string | null;
}

export interface UsersModuleGetters {
    skip: number;

    limit: number;

    getOrderByIndex: (i: number) => number;
}

const usersModule: Module<UsersModuleState, RootState> = {

    state: {
        users: [],
        loadingStatus: LoadingStatus.Initial,
        pageNav: 1,
        totalUsers: 0,
        pageSize: PageSizeTypes.ThreeUsersPerPage,
        errorMessage: null,
        userIdPendingDeletion: null
    },

    getters: {
        skip(state: UsersModuleState): number {
            return (state.pageNav - 1) * state.pageSize;
        },

        limit(state: UsersModuleState): number {
            return state.pageSize;
        },

        getOrderByIndex: (state: UsersModuleState) => (i: number) => {
            return (state.pageNav - 1) * state.pageSize + i;
        }
    },

    mutations: {
        setUsers(state: UsersModuleState, payload: { users: User[] }): void {
            state.users = payload.users;
        },

        setStatus(state: UsersModuleState, payload: { status: LoadingStatus }): void {
            state.loadingStatus = payload.status;
        },

        setPageNav(state: UsersModuleState, payload: { page: number }): void {
            state.pageNav = payload.page;
        },

        setPageSize(state: UsersModuleState, payload: { size: number }): void {
            state.pageSize = payload.size;
        },

        setErrorMessage(state: UsersModuleState, payload: { message: string | null }): void {
            state.errorMessage = payload.message;
        },

        setUserIdPendingDeletion(state: UsersModuleState, payload: { userId: string | null }): void {
            state.userIdPendingDeletion = payload.userId;
        },

        setTotalUsers(state: UsersModuleState, payload: { total: number }): void {
            state.totalUsers = payload.total;
        }
    },

    actions: {
        fetchUsers(context: ActionContext<UsersModuleState, RootState>): void {
            context.commit({
                type: 'setStatus',
                status: LoadingStatus.Loading
            });
            getUsers({ skip: context.getters.skip, limit: context.getters.limit })
                .then(({ total, users }) => {
                    context.commit({
                        type: 'setStatus',
                        status: LoadingStatus.Success
                    });
                    context.commit({
                        type: 'setUsers',
                        users
                    });
                    context.commit({
                        type: 'setTotalUsers',
                        total
                    });
                })
                .catch(err => {
                    context.commit({
                        type: 'setStatus',
                        status: LoadingStatus.Failed
                    });
                    context.commit({
                        type: 'setErrorMessage',
                        message: err.message
                    });
                });
        },

        confirmDeletionUser(context: ActionContext<UsersModuleState, RootState>): void {
            context.commit({
                type: 'setStatus',
                status: LoadingStatus.Loading
            });
            deleteUserById(context.state.userIdPendingDeletion!)
                .then(() => {
                    context.commit({
                        type: 'setStatus',
                        status: LoadingStatus.Success
                    });
                    context.commit({
                        type: 'setUsers',
                        users: context.state.users
                            .filter(u => u.uuid !== context.state.userIdPendingDeletion)
                    });
                    context.commit({
                        type: 'setUserIdPendingDeletion',
                        userId: null
                    });
                })
                .catch(err => {
                    context.commit({
                        type: 'setStatus',
                        status: LoadingStatus.Failed
                    });
                    context.commit({
                        type: 'setErrorMessage',
                        message: err.message
                    });
                });
        }
    }

};
export default usersModule;
