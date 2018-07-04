<template>
    <tr>
        <th scope="row">{{index + 1}}</th>
        <td>
            <span
                @click="viewUser(userId)"
                style="border-bottom:1px dotted;cursor:pointer"
            >{{fullName}}</span>
        </td>
        <td>
            <img
                v-if="hasAvatar"
                :src="avatarSrc"
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


    @Component
    export default class UserItem extends Vue {

        @Prop()
        userId!: string;

        @Prop()
        title!: string;

        @Prop()
        avatarSrc!: string | null;

        @Prop()
        firstName!: string;

        @Prop()
        lastName!: string;

        @Prop()
        index!: number;

        get hasAvatar(): boolean {
            return !!this.avatarSrc;
        }

        get fullName(): string {
            return `${this.title}. ${this.firstName} ${this.lastName}`;
        }

        viewUser(): void {
            this.$emit('view-user', this.userId);
        }

        deleteUser(): void {
            this.$emit('delete-user', this.userId);
        }

    }

</script>

