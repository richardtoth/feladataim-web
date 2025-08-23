<script setup lang="ts">

import AppHeader from "~/components/AppHeader.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <div class="container mx-auto flex-1">
      <AppHeader/>
      <div class="border border-white/20 py-12 px-5 rounded">
        <slot/>
      </div>
    </div>
    <AppFooter/>
  </div>
</template>

<style scoped>

</style>