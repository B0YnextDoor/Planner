import { type Dispatch, type SetStateAction } from 'react'

import { IKanbanTask } from '@/types/tasks/kanban/kanban.types'

interface IKanbanAddCardInput {
	category: string
	setItems: Dispatch<SetStateAction<IKanbanTask[] | undefined>>
}

export const AddKanbanButton = ({
	setItems,
	category
}: IKanbanAddCardInput) => {
	const addCard = () => {
		setItems((prev: any) => {
			if (!prev) return

			return [
				...prev,
				{
					task_id: null,
					category: category,
					description: '',
					priority: null,
					isCompleted: false
				}
			]
		})
	}

	return (
		<div className='mt-5 text-center'>
			<button
				onClick={addCard}
				className='italic opacity-40 text-sm'
			>
				Add task...
			</button>
		</div>
	)
}
