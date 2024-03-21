import { DropResult } from '@hello-pangea/dnd'

import { useUpdateKanban } from './useUpdateKanban'

export const useKanbanDnd = () => {
	const { updateTask } = useUpdateKanban()

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return

		const destinationColumnId = result.destination.droppableId

		if (destinationColumnId === result.source.droppableId) return

		if (destinationColumnId == 'done') {
			updateTask({
				task_id: Number(result.draggableId) ?? null,
				category: destinationColumnId,
				description: null,
				priority: null,
				isCompleted: true
			})
			return
		}

		updateTask({
			task_id: Number(result.draggableId) ?? null,
			category: destinationColumnId,
			description: null,
			priority: null
		})
	}

	return { onDragEnd }
}
