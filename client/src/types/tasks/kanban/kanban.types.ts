import { ITaskBase } from '../task.types'

export interface IKanbanTask extends ITaskBase {
	time_spent: number
	time_created: string
}

export type TypeKanbanForm = Partial<IKanbanTask>
