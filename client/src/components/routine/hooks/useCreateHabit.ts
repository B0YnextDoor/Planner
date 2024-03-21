import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypeHabitForm } from '@/types/routine/routine.types'

import { routineService } from '@/services/routine/routine.service'

export const useCreateHabit = () => {
	const queryClient = useQueryClient()

	const { mutate: createHabit, isPending } = useMutation({
		mutationKey: ['create habit'],
		mutationFn: (data: TypeHabitForm) => routineService.createHabit(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['habits']
			})
			toast.success('Successfully created!')
		},
		onError(error: any) {
			if (error?.response?.status == 422)
				toast.error('Not enougn day time to add this habbit')
		}
	})

	return {
		createHabit,
		isPending
	}
}
