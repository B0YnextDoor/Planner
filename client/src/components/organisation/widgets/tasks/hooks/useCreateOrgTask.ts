import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypeOrganisationTask } from '@/types/tasks/organisation/organisationTask.types'

import { organisationTaskService } from '@/services/tasks/organisation/organisationTask.service'

export const useCreateOrgTask = () => {
	const queryClient = useQueryClient()

	const { mutate: createTask } = useMutation({
		mutationKey: ['create-org-task'],
		mutationFn: (data: TypeOrganisationTask) =>
			organisationTaskService.createOrganisationTask(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['organisation-tasks']
			})
			toast.success('Task created!')
		}
	})

	return { createTask }
}
