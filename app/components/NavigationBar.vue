<script setup lang="ts">
import {computed} from 'vue'
import type {NavigationMenuItem} from '@nuxt/ui'
import {useAuth} from '~/composables/useAuth'

const {user, logout} = useAuth()

const items = computed<NavigationMenuItem[][]>(() => {
  const leftMenu: NavigationMenuItem[] = user.value
      ? [
        {label: 'Reggeli tervezés', icon: 'i-lucide-sunrise', to: '/morning-planning'},
        {label: 'Mai feladatok', icon: 'i-lucide-check-square', to: '/todays-tasks'},
        {label: 'Információk', icon: 'i-lucide-info', to: '/informations'},
        {label: 'Áttekintés', icon: 'i-lucide-layout-dashboard', to: '/overview'}
      ]
      : [
        {label: 'Nyitólap', icon: 'i-lucide-home', to: '/'}
      ]

  const rightMenu: NavigationMenuItem[] = user.value
      ? [
        {label: 'Kijelentkezés', icon: 'i-lucide-log-out', onClick: logout, class: 'cursor-pointer'}
      ]
      : [
        {label: 'Bejelentkezés', icon: 'i-lucide-log-in', to: '/login'},
        {label: 'Regisztráció', icon: 'i-lucide-user-plus', to: '/registration'}
      ]

  return [leftMenu, rightMenu]
})
</script>

<template>
  <UNavigationMenu :items="items"/>
</template>
