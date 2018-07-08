<template>
    <div>
        <ul id="dropdown2" class="dropdown-content">
            <li
                v-for="cnt in amountOptions"
                :class="{'active': amount === cnt}"
                @click="amount = cnt"
            ><a>{{cnt}} users</a></li>
        </ul>
        <a ref="dropdown" class="btn dropdown-trigger" data-target="dropdown2">on page<i class="material-icons right">arrow_drop_down</i></a>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as isNumber from 'lodash/isNumber';
import { Component, Model, Watch } from 'vue-property-decorator';
import { Dropdown } from 'materialize-css';

import { PageSizeTypes } from '../../models/pagination';


@Component({})
export default class PerPage extends Vue {

    @Model('change-amount', { type: Number })
    perPage!: PageSizeTypes;

    amount = this.perPage;

    dropdownInstance: Dropdown | null = null;

    get amountOptions(): number[] {
        return (Object as any).values(PageSizeTypes)
            .filter(isNumber);
    }

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

