import { IKanbanTask } from '../kanban/kanban.types'

export interface IOrganisationTask extends IKanbanTask {
	executors: string | null
}

export type TypeOrganisationTask = Partial<IOrganisationTask>
