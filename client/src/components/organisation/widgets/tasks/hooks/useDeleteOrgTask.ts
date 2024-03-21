import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { organisationTaskService } from '@/services/tasks/organisation/organisationTask.service'

export const useDeleteOrgTask = () => {
	const queryClient = useQueryClient()

	const { mutate: deleteTask, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete-org-task'],
		mutationFn: (id: number) =>
			organisationTaskService.deleteOrganisationTask(id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['organisation-tasks']
			})
			toast.success('Task deleted!')
		}
	})

	return { deleteTask, isDeletePending }
}
