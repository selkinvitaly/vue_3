<template>
    <div>
        <ul id="dropdown2" class="dropdown-content">
            <li
                :class="{'active': amount === 3}"
                @click="amount = 3"
            ><a>3 users</a></li>
            <li
                :class="{'active': amount === 5}"
                @click="amount = 5"
            ><a>5 users</a></li>
            <li
                :class="{'active': amount === 10}"
                @click="amount = 10"
            ><a>10 users</a></li>
            <li
                :class="{'active': amount === 20}"
                @click="amount = 20"
            ><a>20 users</a></li>
        </ul>
        <a ref="dropdown" class="btn dropdown-trigger" data-target="dropdown2">on page<i class="material-icons right">arrow_drop_down</i></a>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Model, Watch } from 'vue-property-decorator';
import { Dropdown } from 'materialize-css';

import { PageSizeTypes } from '../../models/pagination';


@Component({})
export default class PerPage extends Vue {

    @Model('change-amount', { type: Number })
    perPage!: PageSizeTypes;

    amount = this.perPage;

    dropdownInstance: Dropdown | null = null;

    @Watch('amount')
    changePerPage() {
        this.$emit('change-amount', this.amount);
    }

    mounted() {
        this.dropdownInstance = Dropdown.init(this.$refs.dropdown as HTMLElement);
    }

    destoyed() {
        this.dropdownInstance!.destroy();
    }

}
</script>

