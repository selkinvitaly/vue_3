<template>
    <div class="update-user">
        <ProgressLoader
            v-if="isLoading"
        />

        <FailedStatus
            v-else-if="isFailed"
            :message="errorMessage"
        />

        <NotFound
            v-else-if="userNotFound"
            message="no such user found!"
        />

        <EditingForm
            :user="userDetails"
            :is-loading="isLoading"
            v-model="userDetails"
            v-else
        >
            <div class="update-user-btns">
                <button
                    type="button"
                    :disabled="!prevSiblingsExists || isLoading"
                    class="waves-effect waves-light btn"
                    @click="goPrevUser"
                ><i class="material-icons left">navigate_before</i></button>

                <button
                    type="button"
                    :disabled="fieldsNotModified || isLoading"
                    class="waves-effect waves-light btn"
                    @click="updateUser"
                ><i class="material-icons left">done</i>save</button>

                <button
                    type="button"
                    :disabled="!nextSiblingsExists || isLoading"
                    class="waves-effect waves-light btn"
                    @click="goNextUser"
                ><i class="material-icons right">navigate_next</i></button>
                
            </div>

            
        </EditingForm>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as isEqual from 'lodash/isEqual';
import { Component } from 'vue-property-decorator';
import { Route } from 'vue-router';

import FailedStatus from '../components/FailedStatus.vue';
import NotFound from '../components/NotFound.vue';
import ProgressLoader from '../components/ProgressLoader.vue';
import EditingForm from '../components/EditingForm.vue';
import { LoadingStatus, User, SiblingsInfo } from '../models/users';
import { getUserById } from '../services/get-user-by-id';
import { updateUserById } from '../services/update-user-by-id';
import { getSiblingsInfoById } from '../services/get-siblings-info-by-id';


Component.registerHooks(['beforeRouteUpdate']);

@Component({
    components: {
        FailedStatus, ProgressLoader, NotFound, EditingForm
    }
})
export default class UserDetails extends Vue {

    userDetails: User | null = null;
    siblingsInfo: SiblingsInfo | null = null;
    lastSavedUserDetails: User | null = null;
    loadingStatus = LoadingStatus.Initial;
    errorMessage: string | null = null;

    get userId(): string {
        return this.$route.params.id;
    }

    get isLoading(): boolean {
        return this.loadingStatus === LoadingStatus.Loading;
    }

    get isFailed(): boolean {
        return this.loadingStatus === LoadingStatus.Failed;
    }

    get userNotFound(): boolean {
        return this.isSuccess && !this.userDetails;
    }

    get isSuccess(): boolean {
        return this.loadingStatus === LoadingStatus.Success;
    }

    get fieldsNotModified(): boolean {
        return isEqual(this.userDetails, this.lastSavedUserDetails);
    }

    get prevSiblingsExists(): boolean {
        return !!this.siblingsInfo && !!this.siblingsInfo.prev;
    }

    get nextSiblingsExists(): boolean {
        return !!this.siblingsInfo && !!this.siblingsInfo.next;
    }

    mounted() {
        this.getData();
    }

    beforeRouteUpdate(to: Route, from: Route, next: Function) {
        const nextUserId = to.params.id;
        const shouldLoadNewData = to.name === 'user-details' && nextUserId;
        if (!shouldLoadNewData) {
            return next();
        }

        this.getData(nextUserId)
            .then(() => next());
    }

    getData(userId: string = this.userId): Promise<void> {
        this.loadingStatus = LoadingStatus.Loading;
        return Promise.all([
            getUserById(userId),
            getSiblingsInfoById(userId)
        ])
            .then(data => {
                const [ details, siblings ] = data;
                this.loadingStatus = LoadingStatus.Success;
                this.userDetails = details;
                this.siblingsInfo = siblings;
                this.lastSavedUserDetails = details;
            })
            .catch((err) => {
                this.loadingStatus = LoadingStatus.Failed;
                this.errorMessage = err.message;
            });
    }

    updateUser(): void {
        this.loadingStatus = LoadingStatus.Loading;
        updateUserById(this.userId, this.userDetails!)
            .then(() => {
                this.lastSavedUserDetails = {
                    ...this.userDetails!
                };
                this.loadingStatus = LoadingStatus.Success;
            })
            .catch(err => {
                this.loadingStatus = LoadingStatus.Failed;
                this.errorMessage = err.message;
            });
    }

    goPrevUser(): void {
        this.$router.push({
            name: 'user-details',
            params: {
                id: this.siblingsInfo!.prev!
            }
        });
    }

    goNextUser(): void {
        this.$router.push({
            name: 'user-details',
            params: {
                id: this.siblingsInfo!.next!
            }
        });
    }

}
</script>

<style lang="stylus" scoped>
    .update-user {
        padding-top: 30px
    }

    .update-user-btns {
        display: flex
        justify-content: space-between
    }
</style>


