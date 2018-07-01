<template>
    <div class="progress">
      <div class="indeterminate"></div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';


@Component
export default class ProgressLoader extends Vue {}
</script>
