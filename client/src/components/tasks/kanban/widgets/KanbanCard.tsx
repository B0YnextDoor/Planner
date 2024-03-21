import { Draggable, Droppable } from '@hello-pangea/dnd'
import cn from 'clsx'
import { Dispatch, SetStateAction } from 'react'

import { IKanbanTask } from '@/types/tasks/kanban/kanban.types'

import { filterTasks } from '../utils/kanban.filter'

import { AddKanbanButton } from './AddKanbanButton'
import styles from './Kanban.module.css'
import { KanbanTask } from './KanbanTask'

interface IKanbanCard {
	value: string
	label: string
	items: IKanbanTask[] | undefined
	setItems: Dispatch<SetStateAction<IKanbanTask[] | undefined>>
}

export const KanbanCard = ({ value, label, items, setItems }: IKanbanCard) => {
	return (
		<Droppable droppableId={value}>
			{provided => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					<div className={styles.column}>
						<div
							className={cn(
								'text-center',
								'font-semibold',
								value == 'todo'
									? 'text-green-600'
									: value == 'done'
										? 'text-purple-500'
										: 'text-blue-600'
							)}
						>
							{label}
						</div>

						{filterTasks(items, value)?.map((item, index) => (
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
										<KanbanTask
											key={index}
											item={item}
											setItems={setItems}
										/>
									</div>
								)}
							</Draggable>
						))}

						{provided.placeholder}

						{value !== 'done' && !items?.some(item => !item.task_id) && (
							<AddKanbanButton
								setItems={setItems}
								category={value}
							/>
						)}
					</div>
				</div>
			)}
		</Droppable>
	)
}
