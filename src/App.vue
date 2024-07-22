<script setup lang="ts">
import {  RouterView } from 'vue-router'

</script>

<template>
 <router-view />
</template>

<style>
  /* 全局设置 box-sizing 为 border-box */
  *, *::before, *::after {
      box-sizing: border-box;
    }

    /* 样式重置 */
    body, html {
      margin: 0;
      padding: 0;
      height: 100%;
      width: 100%;
    }

</style>
