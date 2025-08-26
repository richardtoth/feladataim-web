export interface TodoUpdate {
    title?: string
    description?: string | null
    due_date?: string | null
    is_completed?: boolean
}