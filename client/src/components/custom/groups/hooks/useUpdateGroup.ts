import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
	ICustomGroup,
	TypeCustomGroup
} from '@/types/tasks/custom/custom.types'

import { groupService } from '@/services/groups/group.service'

export const useUpdateGroup = () => {
	const queryClient = useQueryClient()
	const { mutate: updateGroup, isPending } = useMutation({
		mutationKey: ['create group'],
		mutationFn: (data: TypeCustomGroup) => groupService.updateCustomGroup(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['custom-groups']
			})
			toast.success('Task group updated!')
		}
	})

	return { updateGroup, isPending }
}
