import cn from 'clsx'
import dayjs from 'dayjs'
import { GripVertical, Trash } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox/Checkbox'
import { TransparentInput } from '@/components/ui/input/TransparentInput'
import { Loader } from '@/components/ui/loader/Loader'
import { Select } from '@/components/ui/select/Select'

import { IKanbanTask, TypeKanbanForm } from '@/types/tasks/kanban/kanban.types'

import { useDeleteKanban } from '../hooks/useDeleteKanban'
import { useKanbanListener } from '../hooks/useKanbanListener'
import { formatTime } from '../utils/kanban.time'

import styles from './Kanban.module.css'

interface ITaskKanban {
	item: IKanbanTask
	setItems: Dispatch<SetStateAction<IKanbanTask[] | undefined>>
}

export const KanbanTask = ({ item, setItems }: ITaskKanban) => {
	const { register, control, watch } = useForm<TypeKanbanForm>({
		defaultValues: {
			category: item.category,
			description: item.description,
			priority: item.priority,
			isCompleted: item.isCompleted,
			time_created: item.time_created,
			time_spent: item.time_spent
		}
	})

	useKanbanListener({ watch, id: item.task_id, categoty: item.category })

	const { deleteTask, isDeletePending } = useDeleteKanban()

	return (
		<div className={cn(styles.card, 'animation-opacity')}>
			<div className={styles.cardHeader}>
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
					<span className='ml-2 italic line-through opacity-50'>
						{item.description}
					</span>
				)}
			</div>

			<div className={styles.cardBody}>
				{(watch('category') == 'in process' || watch('category') == 'done') && (
					<span
						className={cn(
							'font-mono',
							watch('isCompleted') ? 'opacity-50' : ''
						)}
					>
						Started: {dayjs(watch('time_created')).format('LLL')}
					</span>
				)}
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
				{watch('isCompleted') && watch('category') == 'done' && (
					<span className='font-mono'>
						Time spent: {formatTime(item.time_spent)}
					</span>
				)}
			</div>

			<div className={styles.cardActions}>
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
