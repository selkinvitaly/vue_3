<template>
    <tr>
        <th scope="row">{{index + 1}}</th>
        <td>
            <span
                @click="viewUser(user.uuid)"
                style="border-bottom:1px dotted;cursor:pointer"
            >{{fullName}}</span>
        </td>
        <td>
            <img
                class="avatar"
                v-if="hasAvatar"
                :src="user.avatarUrl"
                alt=""
            />
            <span v-else>default avatar</span>
        </td>
        <td>
            <button
                @click="deleteUser"
                class="waves-effect waves-light btn red accent-2"
            >delete <i class="material-icons right">delete</i></button>
        </td>
    </tr>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component, Prop } from 'vue-property-decorator';

    import { User } from '../models/users';


    @Component
    export default class UserItem extends Vue {

        @Prop()
        user!: User;

        @Prop()
        index!: number;

        get hasAvatar(): boolean {
            return !!this.user.avatarUrl;
        }

        get fullName(): string {
            return `${this.user.titleName}. ${this.user.firstName} ${this.user.lastName}`;
        }

        viewUser(): void {
            this.$emit('view-user', this.user.uuid);
        }

        deleteUser(): void {
            this.$emit('delete-user', this.user.uuid);
        }

    }

</script>
<style lang="stylus" scoped>
    .avatar {
        width: 50px
        height: @width
    }
</style>

