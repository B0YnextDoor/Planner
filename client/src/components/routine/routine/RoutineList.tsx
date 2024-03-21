import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { Loader } from '@/components/ui/loader/Loader'

import { useRoutine } from '../hooks/useRoutine'
import { useRoutineDnd } from '../hooks/useRoutineDnD'
import { formatTime } from '../utils/formatTime'

import { Habit } from './Habit'
import styles from './Routine.module.css'

export const RoutineList = () => {
	const { items, time, setItems, isLoading } = useRoutine()
	const { handleDragEnd, sensors } = useRoutineDnd(items, setItems)

	if (isLoading) return <Loader size={20} />

	return (
		<div>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<div className={styles.list}>
					<SortableContext
						items={items || []}
						strategy={verticalListSortingStrategy}
					>
						{items?.length ? (
							items?.map(item => (
								<Habit
									key={item.id}
									item={item}
								/>
							))
						) : (
							<div>Add the first habit on the right form</div>
						)}
					</SortableContext>
				</div>
			</DndContext>
			{items?.length && (
				<div>
					{formatTime(time)}
					for sleep
				</div>
			)}
		</div>
	)
}
