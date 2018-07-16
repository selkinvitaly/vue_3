<template>
    <tr>
        <th scope="row">{{index + 1}}</th>
        <td>
            <span>{{fullName}}</span>
        </td>
        <td>
            <a :href="getPhoneLink(user.phone)">{{user.phone}}</a>
        </td>
    </tr>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component, Prop } from 'vue-property-decorator';

    import { User } from '../models/users';


    @Component
    export default class ContactUser extends Vue {

        @Prop()
        user!: User;

        @Prop()
        index!: number;

        get fullName(): string {
            return `${this.user.titleName}. ${this.user.firstName} ${this.user.lastName}`;
        }

        getPhoneLink(phone: string): string {
            return `tel:${phone}`;
        }

    }

</script>
<style lang="stylus" scoped>
</style>

