<template>
    <ul class="pagination">
        <li
            :class="{'disabled': !prevPageIsAvailable, 'waves-effect': true}"
            @click="goPrev"
        ><a><i class="material-icons">chevron_left</i></a></li>
        <li
            :class="{'waves-effect': true, 'active': page === currentPage}"
            @click="selectPage(page)"
            v-for="page in maxPage"
        ><a>{{page}}</a></li>
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

    currentPage = this.page;

    @Watch('currentPage')
    changePage() {
        this.$emit('change-page', this.currentPage);
    }

    get maxPage(): number {
        return Math.ceil(this.total / this.size);
    }

    get prevPageIsAvailable(): boolean {
        return this.currentPage > 1;
    }

    get nextPageIsAvailable(): boolean {
        return this.maxPage !== this.currentPage;
    }

    selectPage(page: number): void {
        this.currentPage = page;
    }

    goPrev(): void {
        if (!this.prevPageIsAvailable) {
            return;
        }
        this.selectPage(this.currentPage - 1);
    }

    goNext(): void {
        if (!this.nextPageIsAvailable) {
            return;
        }
        this.selectPage(this.currentPage + 1);
    }

}
</script>
