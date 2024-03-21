import cn from 'clsx'
import { GripVertical, Trash } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox/Checkbox'
import { DatePicker } from '@/components/ui/date-picker/DatePicker'
import { TransparentInput } from '@/components/ui/input/TransparentInput'
import { Loader } from '@/components/ui/loader/Loader'
import { Select } from '@/components/ui/select/Select'

import { ITodoTask, TypeTodoForm } from '@/types/tasks/todo/todo.types'

import { useDeleteTodo } from '../hooks/useDeleteTodo'
import { useTodoListener } from '../hooks/useTodoListener'

import styles from './List.module.css'

interface IListRow {
	item: ITodoTask
	setItems: Dispatch<SetStateAction<ITodoTask[] | undefined>>
}

export const TodoTaskRow = ({ item, setItems }: IListRow) => {
	const { register, control, watch } = useForm<TypeTodoForm>({
		defaultValues: {
			category: item.category,
			isCompleted: item.category === 'finished',
			description: item.description,
			due_date: item.due_date,
			priority: item.priority
		}
	})

	useTodoListener({ watch, id: item.task_id })

	const { deleteTask, isDeletePending } = useDeleteTodo()
	return (
		<div
			className={cn(
				styles.row,
				watch('isCompleted') ? styles.completed : '',
				'animation-opacity'
			)}
		>
			<div>
				<span className='inline-flex items-center gap-2.5 w-full'>
					<button aria-describedby='todo-item'>
						<GripVertical className={styles.grip} />
					</button>
					{item.task_id && (
						<Controller
							control={control}
							name='isCompleted'
							render={({ field: { value, onChange } }) => (
								<Checkbox
									onChange={onChange}
									checked={value}
								/>
							)}
						/>
					)}
					{!watch('isCompleted') ? (
						<TransparentInput {...register('description')} />
					) : (
						<span>{item.description}</span>
					)}
				</span>
			</div>
			<div>
				<Controller
					control={control}
					name='due_date'
					render={({ field: { value, onChange } }) => (
						<DatePicker
							onChange={onChange}
							value={value || ''}
						/>
					)}
				/>
			</div>
			<div className='capitalize'>
				<Controller
					control={control}
					name='priority'
					render={({ field: { value, onChange } }) => (
						<Select
							data={['high', 'medium', 'low'].map(item => ({
								value: item,
								label: item
							}))}
							onChange={onChange}
							value={value || ''}
						/>
					)}
				/>
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
