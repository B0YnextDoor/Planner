import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { customService } from '@/services/tasks/custom/custom.service'

export const useDeleteCustom = () => {
	const queryClient = useQueryClient()

	const { mutate: deleteTask, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete-custom-task'],
		mutationFn: ({
			group_id,
			task_id
		}: {
			group_id: number
			task_id: number
		}) => customService.deleteCustomTask(group_id, task_id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['custom-tasks']
			})
			toast.info('Task deleted!')
		}
	})

	return { deleteTask, isDeletePending }
}
