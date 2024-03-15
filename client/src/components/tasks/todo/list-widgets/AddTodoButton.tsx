import { type Dispatch, type SetStateAction } from 'react'

import { ITodoTask } from '@/types/tasks/todo/todo.types'

import styles from './List.module.css'

interface IListAddRowInput {
	filterDate?: string
	setItems: Dispatch<SetStateAction<ITodoTask[] | undefined>>
}

export const AddTodoButton = ({ setItems, filterDate }: IListAddRowInput) => {
	const addTask = () => {
		setItems((prev: any) => {
			if (!prev) return
			return [
				...prev,
				{
					task_id: null,
					category: 'active',
					description: '',
					due_date: filterDate,
					time_overdue: 0,
					priority: null,
					isCompleted: false
				}
			]
		})
	}

	return (
		<div className={styles.addTask}>
			<button
				onClick={addTask}
				className='italic opacity-40 text-sm'
			>
				Add task...
			</button>
		</div>
	)
}
