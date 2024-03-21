import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { organisationService } from '@/services/organisation/organisation.service'

export const useJoinOrganisation = () => {
	const queryClient = useQueryClient()

	const { mutate: joinOrganisation, isPending: isPendingJoin } = useMutation({
		mutationKey: ['create organisation'],
		mutationFn: (code: string) => organisationService.joinOrganisation(code),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			queryClient.invalidateQueries({ queryKey: ['organisation'] })
			toast.success('Welcome to organisation!')
		},
		onError(error: any) {
			if (error?.response?.status == 422)
				toast.error(error?.response?.data?.detail)
		}
	})

	return { joinOrganisation, isPendingJoin }
}
