import { DropResult } from '@hello-pangea/dnd'

import { useUpdateOrgTask } from './useUpdateOrgTask'

export const useOrgTaskDnd = () => {
	const { updateTask } = useUpdateOrgTask()

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
				isCompleted: true,
				executors: null
			})
			return
		}

		updateTask({
			task_id: Number(result.draggableId) ?? null,
			category: destinationColumnId,
			description: null,
			priority: null,
			executors: null
		})
	}

	return { onDragEnd }
}
