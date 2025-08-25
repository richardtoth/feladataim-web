import type {Todo} from "~/types/todo";

export const useApi = () => {
    const storeTodo = async (todo: Todo) => {
        return useCustomRequest('/todos', {
            method: 'POST',
            body: todo,
        })
    }

    return {
        storeTodo,
    }
}