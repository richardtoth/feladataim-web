<script setup lang="ts">
import * as z from 'zod'
import type {FormSubmitEvent} from '@nuxt/ui'
import type {LoginCredentials} from "~/types/auth";

const {login} = useAuth();

const schema: z.ZodType<LoginCredentials> = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
})

const state = reactive<LoginCredentials>({
  email: '',
  password: ''
})

async function onSubmit(event: FormSubmitEvent<LoginCredentials>) {
  await login(event.data)
}
</script>

<template>
  <div class="w-full">
    <PageHeading>Bejelentkezés</PageHeading>
    <div class="border border-white/20 rounded p-8 max-w-md mx-auto">
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="Email" name="email">
          <UInput v-model="state.email" class="w-full"/>
        </UFormField>

        <UFormField label="Jelszó" name="password">
          <UInput v-model="state.password" type="password" class="w-full"/>
        </UFormField>
        <div class="text-center">
          <UButton type="submit" class="cursor-pointer">
            Bejelentkezés
          </UButton>
        </div>
      </UForm>
    </div>
  </div>
</template>