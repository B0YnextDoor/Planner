import cn from 'clsx'
import { GripVertical, Loader, Trash } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

import { Badge } from '@/components/ui/select/Badge'

import { ITodoTask } from '@/types/tasks/todo/todo.types'

import { useDeleteTodo } from '../../hooks/useDeleteTodo'
import styles from '../List.module.css'

interface IOverdueTask {
	item: ITodoTask
	setOverdue: Dispatch<SetStateAction<ITodoTask[] | undefined>>
}

export const OverdueTaskRow = ({ item, setOverdue }: IOverdueTask) => {
	const { deleteTask, isDeletePending } = useDeleteTodo()
	return (
		<div className={cn(styles.row, styles.overdued, 'animation-opacity')}>
			<div>
				<span className='inline-flex items-center gap-2.5 w-full'>
					<button aria-describedby='todo-item'>
						<GripVertical className={styles.grip} />
					</button>

					<span>{item.description}</span>
				</span>
			</div>
			<div>
				<span className='text-red-600 font-semibold'>
					{(item.time_overdue / 3600).toFixed(0)} hours
				</span>
			</div>
			<div className='capitalize'>
				<Badge variant={item.priority}>{item.priority}</Badge>
			</div>
			<div>
				<button
					onClick={() => {
						deleteTask(item.task_id)
						setOverdue((prev: any) => prev?.slice(0, -1))
					}}
					className='opacity-50 transition-opacity hover:opacity-100'
				>
					{isDeletePending ? <Loader size={15} /> : <Trash size={15} />}
				</button>
			</div>
		</div>
	)
}
