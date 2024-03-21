import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypeOrganisationTask } from '@/types/tasks/organisation/organisationTask.types'

import { organisationTaskService } from '@/services/tasks/organisation/organisationTask.service'

export const useUpdateOrgTask = () => {
	const queryClient = useQueryClient()

	const { mutate: updateTask } = useMutation({
		mutationKey: ['update-org-task'],
		mutationFn: (data: TypeOrganisationTask) =>
			organisationTaskService.updateOrganisationTask(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['organisation-tasks']
			})
			toast.success('Task updated!')
		}
	})

	return { updateTask }
}
