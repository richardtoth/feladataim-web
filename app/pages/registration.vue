<script setup lang="ts">
import * as z from 'zod'
import type {FormSubmitEvent} from '@nuxt/ui'
import type {RegisterData} from "~/types/auth";

const {register} = useAuth();

const schema: z.ZodType<RegisterData> = z.object({
  name: z.string().min(4, 'Invalid name'),
  email: z.email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
  password_confirmation: z.string().min(8, 'Must be at least 8 characters'),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ["password_confirmation"],
});

const state = reactive<RegisterData>({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
})

async function onSubmit(event: FormSubmitEvent<RegisterData>) {
  await register(event.data)
}
</script>

<template>
  <div>
    <PageHeading>Regisztráció</PageHeading>
    <div class="border border-white/20 rounded p-8 max-w-md mx-auto">
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="Név" name="name">
          <UInput v-model="state.name" class="w-full"/>
        </UFormField>

        <UFormField label="Email" name="email">
          <UInput v-model="state.email" class="w-full"/>
        </UFormField>

        <UFormField label="Jelszó" name="password">
          <UInput v-model="state.password" type="password" class="w-full"/>
        </UFormField>

        <UFormField label="Jelszó megerősítése" name="password_confirmation">
          <UInput v-model="state.password_confirmation" type="password" class="w-full"/>
        </UFormField>

        <div class="text-center">
          <UButton type="submit" class="cursor-pointer">
            Regisztrálok
          </UButton>
        </div>
      </UForm>
    </div>
  </div>
</template>