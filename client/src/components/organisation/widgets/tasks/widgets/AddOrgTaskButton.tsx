import dayjs from 'dayjs'
import { type Dispatch, type SetStateAction } from 'react'

import { IOrganisationTask } from '@/types/tasks/organisation/organisationTask.types'

interface IOrgTaskAddCardInput {
	category: string
	setItems: Dispatch<SetStateAction<IOrganisationTask[] | undefined>>
}

export const AddOrgTaskButton = ({
	setItems,
	category
}: IOrgTaskAddCardInput) => {
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
					isCompleted: false,
					executors: null
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
