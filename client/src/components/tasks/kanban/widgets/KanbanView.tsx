import { DragDropContext } from '@hello-pangea/dnd'

import { Loader } from '@/components/ui/loader/Loader'

import { useKanbanDnd } from '../hooks/useKanbanDnD'
import { useKanbanTasks } from '../hooks/useKanbanTasks'
import { BOARDS } from '../utils/kanban.data'

import styles from './Kanban.module.css'
import { KanbanCard } from './KanbanCard'

export const KanbanView = () => {
	const { items, setItems, isLoading } = useKanbanTasks()
	const { onDragEnd } = useKanbanDnd()
	if (isLoading) return <Loader size={20} />
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className={styles.board}>
				{BOARDS.map(card => (
					<KanbanCard
						key={card.id}
						value={card.id}
						label={card.label}
						items={items}
						setItems={setItems}
					/>
				))}
			</div>
		</DragDropContext>
	)
}
