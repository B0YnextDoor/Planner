import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypeKanbanForm } from '@/types/tasks/kanban/kanban.types'

import { kanbanService } from '@/services/tasks/kanban/kanban.service'

export const useUpdateKanban = () => {
	const queryClient = useQueryClient()

	const { mutate: updateTask } = useMutation({
		mutationKey: ['update-kanban-task'],
		mutationFn: (data: TypeKanbanForm) => kanbanService.updateTask(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['kanban-tasks']
			})
			toast.success('Task updated!')
		}
	})

	return { updateTask }
}
