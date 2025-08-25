import type {Todo} from "~/types/todo";
import type {TodosResponse} from "~/types/responses/todosResponse";
import type {CreateTodoResponse} from "~/types/responses/createTodoResponse";

export const useApi = () => {
    const storeTodo = async (todo: { title: string }): Promise<CreateTodoResponse> => {
        return useCustomRequest<CreateTodoResponse>('/todos', {
            method: 'POST',
            body: todo,
        })
    }

    const listTodos = async (): Promise<Todo[]> => {
        const {
            data
        } = await useCustomFetch<TodosResponse>('/todos', {method: 'GET'})

        return data.value?.data ?? []
    }


    return {
        storeTodo,
        listTodos,
    }
}