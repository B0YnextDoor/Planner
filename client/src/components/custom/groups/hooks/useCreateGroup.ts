import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypeCustomGroup } from '@/types/tasks/custom/custom.types'

import { groupService } from '@/services/groups/group.service'

export const useCreateGroup = () => {
	const queryClient = useQueryClient()
	const { mutate: createGroup } = useMutation({
		mutationKey: ['create group'],
		mutationFn: (data: TypeCustomGroup) => groupService.addCustomGroup(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['custom-groups']
			})
			toast.success('Task group created!')
		}
	})

	return { createGroup }
}
