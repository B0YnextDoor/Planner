import { Draggable, Droppable } from '@hello-pangea/dnd'
import { Dispatch, SetStateAction } from 'react'

import { ITodoTask } from '@/types/tasks/todo/todo.types'

import styles from '../List.module.css'

import { OverdueTaskRow } from './OverdueTaskRow'

interface IOverduedGroup {
	items: ITodoTask[]
	setOverdued: Dispatch<SetStateAction<ITodoTask[] | undefined>>
}

export const OverduedGroup = ({ items, setOverdued }: IOverduedGroup) => {
	return (
		<Droppable
			key={'overdued'}
			droppableId={'overdued'}
		>
			{provided => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					<div className={styles.colHeading}>
						<div className='w-full'>Overdued</div>
					</div>
					{items.map((item, index) => (
						<Draggable
							key={item.task_id}
							draggableId={String(item.task_id)}
							index={index}
						>
							{provided => (
								<div
									ref={provided.innerRef}
									{...provided.draggableProps}
									{...provided.dragHandleProps}
								>
									<OverdueTaskRow
										item={item}
										setOverdue={setOverdued}
									/>
								</div>
							)}
						</Draggable>
					))}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	)
}
