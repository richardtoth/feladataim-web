export interface Todo {
    id: number | null
    title: string
    description: string | null
    due_date: string | null
    is_completed: boolean | null
    created_at: string | null
    updated_at: string | null
    user_id: number | null
}