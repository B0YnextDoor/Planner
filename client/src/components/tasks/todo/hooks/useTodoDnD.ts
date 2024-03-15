import { DropResult } from '@hello-pangea/dnd'

import { FILTERS } from '../utils/todo.data'

import { useUpdateTodo } from './useUpdateTodo'

export const useTodoDnd = () => {
	const { updateTask } = useUpdateTodo()

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return

		const destinationColumnId = result.destination.droppableId

		if (
			destinationColumnId === result.source.droppableId ||
			destinationColumnId == 'overdued'
		)
			return

		if (destinationColumnId === 'completed') {
			updateTask({
				task_id: Number(result.draggableId) ?? null,
				category: destinationColumnId
			})

			return
		}

		const newCreatedAt = FILTERS[destinationColumnId].format()
		updateTask({
			task_id: Number(result.draggableId) ?? null,
			category: destinationColumnId,
			due_date: newCreatedAt,
			description: null,
			priority: null
		})
	}

	return { onDragEnd }
}
