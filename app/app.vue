<script setup lang="ts">
const toaster = { position: 'top-center' }
</script>

<template>
  <NuxtLayout>
    <UApp :toaster="toaster">
      <NuxtPage/>
    </UApp>
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(.2rem);
}
</style>