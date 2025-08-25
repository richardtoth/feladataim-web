<script setup lang="ts">
import PageHeading from "~/components/PageHeading.vue";

import * as z from 'zod'
import type {FormSubmitEvent} from '@nuxt/ui'
import {useApi} from "~/composables/useApi";

const {storeTodo} = useApi();

const schema: z.ZodType<Todo> = z.object({
  title: z.string().nonempty('Title cannot be empty').min(3, 'Must be at least 3 characters')
})

const state = reactive<Todo>({
  title: '',
})

const toast = useToast()

const titleInput = useTemplateRef('titleInput')

async function onSubmit(event: FormSubmitEvent<Todo>) {
  await storeTodo({...event.data});
  toast.add({title: 'Success', description: 'The form has been submitted.', color: 'success'});
  state.title = '';
  await nextTick();
  setTimeout(() => titleInput.value?.inputRef?.focus(), 0)
}

</script>

<template>
  <div>
    <PageHeading>Reggeli tervezés</PageHeading>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UInput ref="titleInput" v-model="state.title" name="titleInput" class="mr-2" placeholder="Todo"/>

      <UButton type="submit" class="cursor-pointer">
        Mentés
      </UButton>
    </UForm>
  </div>
</template>

<style scoped>

</style>