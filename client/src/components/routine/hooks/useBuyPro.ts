import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { IBuyPro } from '@/types/routine/routine.types'

import { routineService } from '@/services/routine/routine.service'

export const useBuyPro = () => {
	const queryClient = useQueryClient()

	const { mutate: buyPro, isPending } = useMutation({
		mutationKey: ['buy pro'],
		mutationFn: (code: IBuyPro) => routineService.buyPro(code),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			queryClient.invalidateQueries({
				queryKey: ['habits']
			})
			toast.success('Congratulations!')
		},
		onError(error: any) {
			if (error?.response?.status == 422) toast.error('Wrong code!')
		}
	})

	return { buyPro, isPending }
}
