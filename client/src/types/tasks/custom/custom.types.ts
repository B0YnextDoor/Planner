import { NodeModel } from '@minoru/react-dnd-treeview'

import { ITaskBase } from '../task.types'

export interface ICustomTask extends Omit<ITaskBase, 'task_id'> {
	id: number | null
	group_id: number
}

export type TypeCustomTask = Partial<ICustomTask>

export interface ICustomGroup extends Omit<NodeModel<any>, 'data'> {}

export type TypeCustomGroup = Partial<ICustomGroup>
