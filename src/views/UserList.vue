<template>
    <div>
        <TableWithUsers />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import TableWithUsers from '../components/TableWithUsers/index.vue';


@Component({
    components: {
        TableWithUsers
    }
})
export default class UserList extends Vue {}
</script>
