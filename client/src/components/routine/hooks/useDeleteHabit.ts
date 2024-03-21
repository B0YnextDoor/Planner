import { useMutation, useQueryClient } from '@tanstack/react-query'

import { routineService } from '@/services/routine/routine.service'

export const useDeleteHabit = () => {
	const queryClient = useQueryClient()

	const { mutate: deleteHabit, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete habit'],
		mutationFn: (id: number) => routineService.deleteHabit(id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['habits']
			})
		}
	})

	return { deleteHabit, isDeletePending }
}
