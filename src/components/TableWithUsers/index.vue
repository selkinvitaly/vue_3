<template>
    <div class="table-users">
        <div class="header">
            <slot name="header"></slot>
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
                    v-for="user in users"
                    is="UserItem"
                    :index="user.index"
                    :key="user.uuid"
                    :user="user"
                    @view-user="viewUser($event)"
                    @delete-user="markAsPendingDeletion($event)"
                ></tr>
            </tbody>
        </table>
        <div class="footer">
            <div class="footer__bars">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import UserItem from './UserItem.vue';
import { User } from '../../models/users';


@Component({
    components: {
        UserItem
    },
})
export default class TableWithUsers extends Vue {

    @Prop()
    users!: User[];

    viewUser(userId: string): void {
        this.$emit('view-user', userId);
    }

    markAsPendingDeletion(userId: string | null): void {
        this.$emit('delete-user', userId);
    }

}
</script>


<style lang="stylus" scoped>
    .footer {
        text-align: center

        &__bars {
            display: inline-block
        }
    }
</style>
