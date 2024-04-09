import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { HardDriveDownload, RefreshCcw } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

import { Loader } from '@/components/ui/loader/Loader'

import { IHabit } from '@/types/routine/routine.types'

import { useRefreshRoutine } from '../hooks/useRefreshRoutine'
import { useRoutineDnd } from '../hooks/useRoutineDnD'
import { useSaveRoutine } from '../hooks/useSaveRoutine'
import { formatTime } from '../utils/formatTime'

import { Habit } from './Habit'

interface IRoutineListProps {
	items: IHabit[] | undefined
	time: number | undefined
	setItems: Dispatch<SetStateAction<IHabit[] | undefined>>
}

export const RoutineList = ({ items, time, setItems }: IRoutineListProps) => {
	const { handleDragEnd, sensors } = useRoutineDnd(items, setItems)
	const { refreshRoutine, isPending } = useRefreshRoutine()
	const { createTemplate, isSaving } = useSaveRoutine({ items, time })

	if (isPending) return <Loader size={20} />
	return (
		<div>
			{items && items.length > 0 && !isSaving && (
				<div className='flex justify-end w-full mb-2'>
					<div className='flex justify-between w-10p'>
						<button
							onClick={(e: any) => {
								e.preventDefault()
								createTemplate()
							}}
							className='opacity-40 hover:opacity-90 transition-opacity'
							disabled={isSaving}
						>
							<HardDriveDownload size={20} />
						</button>
						<button
							onClick={(e: any) => {
								e.preventDefault()
								refreshRoutine()
							}}
							className='opacity-40 hover:opacity-90 transition-opacity'
							disabled={isPending}
						>
							<RefreshCcw size={20} />
						</button>
					</div>
				</div>
			)}
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<div>
					<SortableContext
						items={items || []}
						strategy={verticalListSortingStrategy}
					>
						{items && items.length ? (
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
			{items && items.length && (
				<div>
					{formatTime(time)}
					for rest
				</div>
			)}
		</div>
	)
}
