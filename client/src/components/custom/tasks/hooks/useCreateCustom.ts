import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TypeCustomTask } from '@/types/tasks/custom/custom.types'

import { customService } from '@/services/tasks/custom/custom.service'

export const useCreateCustom = () => {
	const queryClient = useQueryClient()

	const { mutate: createTask } = useMutation({
		mutationKey: ['create-custom-task'],
		mutationFn: (data: TypeCustomTask) => customService.addCustomTask(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['custom-tasks']
			})
		}
	})

	return { createTask }
}
