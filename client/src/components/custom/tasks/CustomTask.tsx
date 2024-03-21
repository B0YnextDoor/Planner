import cn from 'clsx'
import { Trash } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox/Checkbox'
import { TransparentInput } from '@/components/ui/input/TransparentInput'
import { Loader } from '@/components/ui/loader/Loader'
import { Select } from '@/components/ui/select/Select'

import { ICustomTask, TypeCustomTask } from '@/types/tasks/custom/custom.types'

import styles from './CustomTask.module.css'
import { useCustomListener } from './hooks/useCustomListener'
import { useDeleteCustom } from './hooks/useDeleteCustom'

interface IListRow {
	task: ICustomTask
	setTasks: Dispatch<SetStateAction<ICustomTask[] | undefined>>
}

export const CustomTask = ({ task, setTasks }: IListRow) => {
	const { register, control, watch } = useForm<TypeCustomTask>({
		defaultValues: {
			id: task.id,
			group_id: task.group_id,
			description: task.description,
			category: task.category,
			priority: task.priority,
			isCompleted: task.category === 'finished'
		}
	})

	useCustomListener({ watch, id: Number(task.id) })
	const { deleteTask, isDeletePending } = useDeleteCustom()
	return (
		<div
			draggable={false}
			className={cn(styles.task, watch('isCompleted') ? styles.completed : '')}
		>
			<span className='flex items-center gap-2.5 w-full'>
				{task.id && (
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
					<span>{task.description}</span>
				)}
			</span>
			<div className='capitalize flex items-center gap-2.5'>
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
							view
						/>
					)}
				/>
				<button
					onClick={() =>
						task.id
							? deleteTask({
									group_id: Number(task.group_id),
									task_id: Number(task.id)
								})
							: setTasks(prev => prev?.slice(0, -1))
					}
					className='opacity-50 transition-opacity hover:opacity-100 pr-2'
				>
					{isDeletePending ? <Loader size={15} /> : <Trash size={15} />}
				</button>
			</div>
		</div>
	)
}
