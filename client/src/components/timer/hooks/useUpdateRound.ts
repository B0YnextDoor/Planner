import { useMutation, useQueryClient } from '@tanstack/react-query'

import { IRoundInfo } from '@/types/timer/timer.types'

import { timerService } from '@/services/timer/timer.service'

export const useUpdateRound = (onUpdSucces: () => void) => {
	const queryClient = useQueryClient()

	const { mutate: updateRound, isPending: isUpdateRoundPending } = useMutation({
		mutationKey: ['update round'],
		mutationFn: (data: IRoundInfo) => timerService.updateRound(data),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['current session'] })
			onUpdSucces()
		}
	})

	return { updateRound, isUpdateRoundPending }
}
