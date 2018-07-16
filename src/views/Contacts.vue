<template>
    <div>
        <TableWithUsers>
            <tr slot="header">
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
            </tr>
            <template
                slot="body"
                slot-scope="{users, getOrderByIndex}"
            >
                <tr
                    v-for="(user, index) in users"
                    is="ContactUser"
                    :index="getOrderByIndex(index)"
                    :key="user.uuid"
                    :user="user"
                ></tr>
            </template>
        </TableWithUsers>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import TableWithUsers from '../components/TableWithUsers/index.vue';
import ContactUser from '../components/ContactUser.vue';


@Component({
    components: {
        TableWithUsers, ContactUser
    }
})
export default class Contacts extends Vue {}
</script>
