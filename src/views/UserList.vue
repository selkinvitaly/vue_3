<template>
    <div>
        <TableWithUsers>
            <tr slot="header">
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Avatar</th>
                <th scope="col">Delete</th>
            </tr>
            <template
                slot="body"
                slot-scope="{users, getOrderByIndex, viewUser, markAsPendingDeletion}"
            >
                <tr
                    v-for="(user, index) in users"
                    is="UserItem"
                    :index="getOrderByIndex(index)"
                    :key="user.uuid"
                    :user="user"
                    @view-user="viewUser"
                    @delete-user="markAsPendingDeletion"
                ></tr>
            </template>
        </TableWithUsers>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import TableWithUsers from '../components/TableWithUsers/index.vue';
import UserItem from '../components/TableWithUsers/UserItem.vue';


@Component({
    components: {
        TableWithUsers, UserItem
    }
})
export default class UserList extends Vue {}
</script>
