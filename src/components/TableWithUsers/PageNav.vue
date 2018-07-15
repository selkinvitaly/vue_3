<template>
    <ul class="pagination">
        <li
            :class="{'disabled': !prevPageIsAvailable, 'waves-effect': true}"
            @click="goPrev"
        ><a><i class="material-icons">chevron_left</i></a></li>
        <li
            :class="{'waves-effect': true, 'active': page === currentPage}"
            @click="selectPage(currentPage)"
            v-for="currentPage in maxPage"
        ><a>{{currentPage}}</a></li>
        <li
            :class="{'disabled': !nextPageIsAvailable, 'waves-effect': true}"
            @click="goNext"
        ><a><i class="material-icons">chevron_right</i></a></li>
    </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Model, Watch, Prop } from 'vue-property-decorator';


@Component({})
export default class PageNav extends Vue {

    @Model('change-page', { type: Number })
    page!: number;

    @Prop()
    total!: number;

    @Prop()
    size!: number;

    @Watch('page')
    changePage() {
        this.$emit('change-page', this.page);
    }

    get maxPage(): number {
        return Math.ceil(this.total / this.size);
    }

    get prevPageIsAvailable(): boolean {
        return this.page > 1;
    }

    get nextPageIsAvailable(): boolean {
        return this.maxPage !== this.page;
    }

    selectPage(page: number): void {
        this.$emit('change-page', page);
    }

    goPrev(): void {
        if (!this.prevPageIsAvailable) {
            return;
        }
        this.selectPage(this.page - 1);
    }

    goNext(): void {
        if (!this.nextPageIsAvailable) {
            return;
        }
        this.selectPage(this.page + 1);
    }

}
</script>
