import { ITaskBase } from '../task.types'

export interface ITodoTask extends ITaskBase {
	task_id: number
	due_date: string | null
	time_overdue: number
}

export type TypeTodoForm = Partial<Omit<ITodoTask, 'time_overdue'>>
