import { Draggable, Droppable } from '@hello-pangea/dnd'
import { type Dispatch, type SetStateAction } from 'react'

import { ITodoTask } from '@/types/tasks/todo/todo.types'

import { FILTERS } from '../utils/todo.data'
import { filterTasks } from '../utils/todo.filter'

import { AddTodoButton } from './AddTodoButton'
import styles from './List.module.css'
import { TodoTaskRow } from './TodoTaskRow'

interface IListGroup {
	value: string
	label: string
	items: ITodoTask[] | undefined
	setItems: Dispatch<SetStateAction<ITodoTask[] | undefined>>
}

export const TodoTaskGroup = ({
	value,
	items,
	label,
	setItems
}: IListGroup) => {
	return (
		<Droppable
			key={value}
			droppableId={value}
		>
			{provided => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					<div className={styles.colHeading}>
						<div className='w-full'>{label}</div>
					</div>

					{filterTasks(items, value).map(item => (
						<Draggable
							key={String(item.task_id)}
							draggableId={String(item.task_id)}
							index={item.task_id}
						>
							{provided => (
								<div
									ref={provided.innerRef}
									{...provided.draggableProps}
									{...provided.dragHandleProps}
								>
									<TodoTaskRow
										key={String(item.task_id)}
										item={item}
										setItems={setItems}
									/>
								</div>
							)}
						</Draggable>
					))}

					{provided.placeholder}

					{value !== 'finished' && !items?.some(item => !item.task_id) && (
						<AddTodoButton
							setItems={setItems}
							filterDate={FILTERS[value] ? FILTERS[value].format() : undefined}
						/>
					)}
				</div>
			)}
		</Droppable>
	)
}
