import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { kanbanService } from '@/services/tasks/kanban/kanban.service'

export const useDeleteKanban = () => {
	const queryClient = useQueryClient()

	const { mutate: deleteTask, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete-kanban-task'],
		mutationFn: (id: number) => kanbanService.deleteTask(id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['kanban-tasks']
			})
			toast.info('Task deleted!')
		}
	})

	return { deleteTask, isDeletePending }
}
