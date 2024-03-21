import { useMutation, useQueryClient } from '@tanstack/react-query'

import { groupService } from '@/services/groups/group.service'

export const useDeleteGroup = () => {
	const queryClient = useQueryClient()
	const { mutate: deleteGroup, isPending: isDeletePending } = useMutation({
		mutationKey: ['create group'],
		mutationFn: (group_id: number) => groupService.deleteCustomGroup(group_id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['custom-groups']
			})
		}
	})

	return { deleteGroup, isDeletePending }
}
