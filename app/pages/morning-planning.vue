<script setup lang="ts">
import PageHeading from "~/components/PageHeading.vue";

import * as z from 'zod'
import type {FormSubmitEvent} from '@nuxt/ui'
import {useApi} from "~/composables/useApi";
import type {Todo} from "~/types/todo";

const {storeTodo, listTodos} = useApi();

const schema = z.object({
  title: z.string().nonempty('Title cannot be empty').min(3, 'Must be at least 3 characters')
})

type TodoForm = z.infer<typeof schema>

const state = reactive<TodoForm>({
  title: '',
})


const titleInput = useTemplateRef('titleInput')

const todos = ref<Todo[]>([])
async function loadTodos() {
  todos.value = await listTodos()
}
await loadTodos()

async function onSubmit(event: FormSubmitEvent<Todo>) {
  const newTodo: { title: string } = {
    title: event.data.title,
  }

  const res = await storeTodo(newTodo);
  if (res?.data) {
    todos.value = [res.data, ...todos.value]
  }

  state.title = '';
  await nextTick();
  setTimeout(() => titleInput.value?.inputRef?.focus(), 0)
}

</script>

<template>
  <div>
    <PageHeading>Reggeli tervezés</PageHeading>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <div class="flex items-start">
        <UFormField name="title">
          <UInput ref="titleInput" v-model="state.title" name="titleInput" class="mr-2" placeholder="Todo"/>
        </UFormField>
        <UButton type="submit" class="cursor-pointer">
          Mentés
        </UButton>
      </div>
    </UForm>

    <UTable :data="todos" class="flex-1"/>

  </div>
</template>

<style scoped>

</style>