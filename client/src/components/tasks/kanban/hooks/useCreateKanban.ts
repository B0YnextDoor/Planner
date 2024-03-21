import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TypeKanbanForm } from '@/types/tasks/kanban/kanban.types'

import { kanbanService } from '@/services/tasks/kanban/kanban.service'

export const useCreateKanban = () => {
	const queryClient = useQueryClient()

	const { mutate: createTask } = useMutation({
		mutationKey: ['create-kanban-task'],
		mutationFn: (data: TypeKanbanForm) => kanbanService.createTask(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['kanban-tasks']
			})
		}
	})

	return { createTask }
}
