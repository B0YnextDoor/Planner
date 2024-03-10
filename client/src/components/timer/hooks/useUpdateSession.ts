import { useMutation, useQueryClient } from '@tanstack/react-query'

import { timerService } from '@/services/timer/timer.service'

export const useUpdateSession = (onUpdSuccess: () => void) => {
	const queryClient = useQueryClient()

	const { mutate: mutateUpd, isPending: isUpdPending } = useMutation({
		mutationKey: ['update session'],
		mutationFn: () => timerService.updateSession(),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['current session']
			})
			onUpdSuccess()
		}
	})

	return { mutateUpd, isUpdPending }
}
