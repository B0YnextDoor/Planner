import { Edit, GripVertical, Trash } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { Loader } from '@/components/ui/loader/Loader'

import { IHabit, TypeHabitForm } from '@/types/routine/routine.types'

import { useDeleteHabit } from '../hooks/useDeleteHabit'
import { useRoutineSortable } from '../hooks/useRoutineSortable'

import styles from './Routine.module.css'

export const Habit = ({ item }: { item: IHabit }) => {
	const { attributes, listeners, setNodeRef, style } = useRoutineSortable(
		item.id
	)
	const { reset } = useFormContext<TypeHabitForm>()
	const { deleteHabit, isDeletePending } = useDeleteHabit()

	return (
		<div
			ref={setNodeRef}
			style={style}
		>
			<div
				className={styles.block}
				style={{
					backgroundColor: item.color || 'lightgray',
					height: `${item.duration}px`
				}}
			>
				<div className='flex items-center'>
					<button
						{...attributes}
						{...listeners}
						aria-describedby='habit'
					>
						<GripVertical className={styles.grip} />
					</button>
					<div className='font-semibold'>
						{item.name}{' '}
						<i className='text-xs opacity-80 font-normal'>
							({item.duration} min.)
						</i>
					</div>
				</div>

				<div className={styles.actions}>
					<button
						onClick={() => {
							reset({
								id: item.id,
								color: item.color,
								duration: item.duration,
								name: item.name
							})
						}}
						className='opacity-70 transition-opacity hover:opacity-100 mr-2'
					>
						<Edit size={16} />
					</button>
					<button
						onClick={() => deleteHabit(item.id)}
						className='opacity-70 transition-opacity hover:opacity-100'
					>
						{isDeletePending ? <Loader size={16} /> : <Trash size={16} />}
					</button>
				</div>
			</div>
		</div>
	)
}
