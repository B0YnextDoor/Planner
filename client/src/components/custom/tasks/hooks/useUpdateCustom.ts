import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TypeCustomTask } from '@/types/tasks/custom/custom.types'

import { customService } from '@/services/tasks/custom/custom.service'

export const useUpdateCustom = (id?: string) => {
	const queryClient = useQueryClient()

	const { mutate: updateTask } = useMutation({
		mutationKey: ['update-custom-task', id],
		mutationFn: (data: TypeCustomTask) => customService.updateCustomTask(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['custom-tasks']
			})
		}
	})

	return { updateTask }
}
