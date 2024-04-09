import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { routineService } from '@/services/routine/routine.service'

export const useRefreshRoutine = () => {
	const queryClient = useQueryClient()

	const { mutate: refreshRoutine, isPending } = useMutation({
		mutationKey: ['clear-routine'],
		mutationFn: () => routineService.refreshRoutine(),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['habits']
			})
			toast.info('Daily routine refreshed!')
		}
	})

	return { refreshRoutine, isPending }
}
