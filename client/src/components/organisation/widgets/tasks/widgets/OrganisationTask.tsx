import cn from 'clsx'
import dayjs from 'dayjs'
import { GripVertical, Trash } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox/Checkbox'
import { TransparentInput } from '@/components/ui/input/TransparentInput'
import { Loader } from '@/components/ui/loader/Loader'
import { MultipleSelect } from '@/components/ui/select/MultipleSelect'
import { Select } from '@/components/ui/select/Select'

import { IOrganisationMember } from '@/types/organisation/organisation.types'
import {
	IOrganisationTask,
	TypeOrganisationTask
} from '@/types/tasks/organisation/organisationTask.types'

import { useDeleteOrgTask } from '../hooks/useDeleteOrgTask'
import { useOrgTaskListener } from '../hooks/useOrgTaskListener'
import { formatTime } from '../utils/kanban.time'

import styles from './Kanban.module.css'

interface IOrgTaskKanban {
	item: IOrganisationTask
	role: string | undefined
	members: IOrganisationMember[] | undefined
	setItems: Dispatch<SetStateAction<IOrganisationTask[] | undefined>>
}

export const OrganisationTask = ({
	item,
	role,
	members,
	setItems
}: IOrgTaskKanban) => {
	const { register, control, watch } = useForm<TypeOrganisationTask>({
		defaultValues: {
			category: item.category,
			description: item.description,
			priority: item.priority,
			isCompleted: item.isCompleted,
			time_created: item.time_created,
			time_spent: item.time_spent,
			executors: item.executors
		}
	})
	useOrgTaskListener({
		watch,
		id: item.task_id,
		categoty: item.category
	})

	const { deleteTask, isDeletePending } = useDeleteOrgTask()

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
				{!watch('isCompleted') && role && role == 'head' ? (
					<TransparentInput {...register('description')} />
				) : (
					<span
						className={cn(
							'ml-2',
							watch('isCompleted') && 'italic line-through opacity-50'
						)}
					>
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
				{members && role && members.length > 0 && (
					<div className='flex flex-col my-3'>
						<div className='text-xs text-white/60 dark:text-white ml-1.5 font-medium'>
							Executors:
						</div>
						<Controller
							control={control}
							name='executors'
							render={({ field: { value, onChange } }) => (
								<MultipleSelect
									members={members}
									role={role}
									executors={value}
									onChange={onChange}
								/>
							)}
						/>
					</div>
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
							onChange={role && role == 'head' ? onChange : () => {}}
							value={value || ''}
							disabled={role != 'head'}
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
				{role == 'head' && (
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
				)}
			</div>
		</div>
	)
}
