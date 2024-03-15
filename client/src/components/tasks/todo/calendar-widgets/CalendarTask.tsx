import cn from 'clsx'
import { GripVertical, Loader, Trash } from 'lucide-react'
import { Dispatch, SetStateAction, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox/Checkbox'
import { TransparentInput } from '@/components/ui/input/TransparentInput'
import { Select } from '@/components/ui/select/Select'

import { ITodoTask, TypeTodoForm } from '@/types/tasks/todo/todo.types'

import { useDeleteTodo } from '../hooks/useDeleteTodo'
import { useTodoListener } from '../hooks/useTodoListener'

import styles from './Calendar.module.css'

interface ICalednarTask {
	item: ITodoTask
	setItems: Dispatch<SetStateAction<ITodoTask[] | undefined>>
}

export const CalendarTask = ({ item, setItems }: ICalednarTask) => {
	const { register, watch } = useForm<TypeTodoForm>({
		defaultValues: {
			category: item.category,
			isCompleted: item.category === 'finished',
			description: item.description,
			due_date: item.due_date,
			priority: item.priority
		}
	})
	useTodoListener({ watch, id: item.task_id, category: item.category })

	const { deleteTask, isDeletePending } = useDeleteTodo()
	return (
		<div
			className={cn(
				styles.calendarTask,
				watch('isCompleted') ? styles.completed : '',
				!watch('isCompleted') && watch('category') != 'overdued'
					? watch('priority') == 'high'
						? styles.high
						: watch('priority') == 'medium'
							? styles.medium
							: watch('priority') == 'low'
								? styles.low
								: ''
					: '',
				watch('category') == 'overdued' ? styles.overdued : ''
			)}
		>
			<div>
				<span className='inline-flex items-center pl-1 w-full'>
					<TransparentInput {...register('description')} />
				</span>
			</div>
			<div>
				<button
					onClick={() =>
						item.task_id
							? deleteTask(item.task_id)
							: setItems(prev => prev?.slice(0, -1))
					}
					className='opacity-50 transition-opacity hover:opacity-100'
				>
					{isDeletePending ? <Loader size={15} /> : <Trash size={15} />}
				</button>
			</div>
		</div>
	)
}
