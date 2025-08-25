export interface Todo {
    id: number
    title: string
    description: string | null
    due_date: string | null
    is_completed: boolean | null
    created_at: string
    updated_at: string
    user_id: number
}