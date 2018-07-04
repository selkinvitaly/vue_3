<template>
    <div>
        <h1>new user</h1>
        <!-- <button
            type="button"
            class="btn btn-outline-secondary"
            @click="comeBack"
        >come back</button>

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
            v-else
        /> -->
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

// import FailedStatus from '../components/FailedStatus.vue';
// import NotFound from '../components/NotFound.vue';
// import ProgressLoader from '../components/ProgressLoader.vue';
// import EditingForm from '../components/EditingForm.vue';
// import { LoadingStatus, User } from '../models/users';
// import { getUserById } from '../services/get-user-by-id';


@Component({
    components: {
        // FailedStatus, ProgressLoader, NotFound, EditingForm
    }
})
export default class UserDetails extends Vue {

    // userDetails: User | null = null;
    // loadingStatus = LoadingStatus.Initial;
    // errorMessage: string | null = null;

    // get userId(): string {
    //     return this.$route.params.id;
    // }

    // get isLoading(): boolean {
    //     return this.loadingStatus === LoadingStatus.Loading;
    // }

    // get isFailed(): boolean {
    //     return this.loadingStatus === LoadingStatus.Failed;
    // }

    // get isSuccessAndUserDetailsExists(): boolean {
    //     return this.isSuccess && !!this.userDetails;
    // }

    // get userNotFound(): boolean {
    //     return this.isSuccess && !this.userDetails;
    // }

    // get isSuccess(): boolean {
    //     return this.loadingStatus === LoadingStatus.Success;
    // }

    // mounted() {
    //     this.loadingStatus = LoadingStatus.Loading;
    //     getUserById(this.userId)
    //         .then((details) => {
    //             this.loadingStatus = LoadingStatus.Success;
    //             this.userDetails = details;
    //         })
    //         .catch((err) => {
    //             this.loadingStatus = LoadingStatus.Failed;
    //             this.errorMessage = err.message;
    //         });
    // }

    // comeBack(): void {
    //     this.$router.back();
    // }

}
</script>

