import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypeHabitForm } from '@/types/routine/routine.types'

import { routineService } from '@/services/routine/routine.service'

export const useUpdateHabit = () => {
	const queryClient = useQueryClient()

	const { mutate: updateHabit } = useMutation({
		mutationKey: ['update habit'],
		mutationFn: (data: TypeHabitForm) => routineService.updateHabit(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['habits']
			})
			toast.success('Successfully updated!')
		},
		onError(error: any) {
			if (error?.response?.status == 422)
				toast.error('Not enougn day time to add this habbit')
		}
	})

	return { updateHabit }
}
