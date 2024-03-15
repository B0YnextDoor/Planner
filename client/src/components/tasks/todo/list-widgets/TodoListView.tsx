'use client'

import { DragDropContext } from '@hello-pangea/dnd'
import cn from 'clsx'

import { useTodoDnd } from '../hooks/useTodoDnD'
import { useTodoTasks } from '../hooks/useTodoTasks'
import { CATEGORIES } from '../utils/todo.data'

import styles from './List.module.css'
import { TodoTaskGroup } from './TodoTaskGroup'
import { OverduedGroup } from './overdue/OverdueGroup'

export function TodoListView() {
	const { items, setItems, overdued, setOverdued } = useTodoTasks()
	const { onDragEnd } = useTodoDnd()

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			{overdued && overdued.length > 0 && (
				<div className={cn(styles.table, styles.overdued)}>
					<div className={styles.header}>
						<div>Task name</div>
						<div>Time Overdued</div>
						<div>Priority</div>
						<div></div>
					</div>
					<div className={styles.parentsWrapper}>
						<OverduedGroup
							items={overdued}
							setOverdued={setOverdued}
						/>
					</div>
				</div>
			)}
			<div className={styles.table}>
				<div className={styles.header}>
					<div>Task name</div>
					<div>Due date</div>
					<div>Priority</div>
					<div></div>
				</div>

				<div className={styles.parentsWrapper}>
					{CATEGORIES.slice(1).map((column, index) => (
						<TodoTaskGroup
							items={items}
							label={column.label}
							value={column.id}
							setItems={setItems}
							key={index}
						/>
					))}
				</div>
			</div>
		</DragDropContext>
	)
}
