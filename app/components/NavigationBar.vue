<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Reggeli tervezés',
      icon: 'i-lucide-sunrise',
      to: '/morning-planning'
    },
    {
      label: 'Mai feladatok',
      icon: 'i-lucide-check-square',
      to: '/todays-tasks'
    },
    {
      label: 'Információk',
      icon: 'i-lucide-info',
      to: '/informations',
    },
    {
      label: 'Áttekintés',
      icon: 'i-lucide-layout-dashboard',
      to: '/overview',
    }
  ],
  [
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      badge: '3.8k',
      to: 'https://github.com/nuxt/ui',
      target: '_blank'
    }
  ]
])
</script>

<template>
  <UNavigationMenu color="neutral" :items="items" class="w-full" />
</template>
