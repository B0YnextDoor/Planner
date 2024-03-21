import { Dispatch, SetStateAction } from 'react'

import { ICustomTask } from '@/types/tasks/custom/custom.types'

interface IAddGroupInput {
	tasks: ICustomTask[] | undefined
	group_id: number
	setTasks: Dispatch<SetStateAction<ICustomTask[] | undefined>>
}

export const addCustomTask = ({
	tasks,
	group_id,
	setTasks
}: IAddGroupInput) => {
	if (tasks?.find(item => !item.id)) return
	setTasks((prev: any) => [
		...prev,
		{
			id: null,
			group_id: group_id,
			category: 'active',
			description: '',
			priority: null,
			isCompleted: false
		}
	])
}
