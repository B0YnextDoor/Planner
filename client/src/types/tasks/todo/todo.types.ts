import { ITaskBase } from '../task.types'

export interface ITodoTask extends ITaskBase {
	due_date: string | null
	time_overdue: number
}

export type TypeTodoForm = Partial<Omit<ITodoTask, 'time_overdue'>>
