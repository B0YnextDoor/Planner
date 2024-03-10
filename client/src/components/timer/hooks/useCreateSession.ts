import { useMutation, useQueryClient } from '@tanstack/react-query'

import { timerService } from '@/services/timer/timer.service'

export const useCreateSession = () => {
	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['create new session'],
		mutationFn: () => timerService.createSession(),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['current session']
			})
		}
	})

	return { mutate, isPending }
}
