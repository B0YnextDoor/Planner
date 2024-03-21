import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { organisationService } from '@/services/organisation/organisation.service'

export const useLeaveOrganisation = () => {
	const queryClient = useQueryClient()

	const { mutate: leaveOrganisation, isPending } = useMutation({
		mutationKey: ['leave othanisation'],
		mutationFn: () => organisationService.leaveOrganisation(),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			queryClient.invalidateQueries({ queryKey: ['organisation'] })
			toast.info('You successfully leaved organisation')
		}
	})

	return { leaveOrganisation, isPending }
}
