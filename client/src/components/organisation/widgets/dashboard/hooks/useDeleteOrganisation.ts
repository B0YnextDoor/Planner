import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { organisationService } from '@/services/organisation/organisation.service'

export const useDeleteOrganisation = () => {
	const queryClient = useQueryClient()

	const { mutate, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete organisation'],
		mutationFn: () => organisationService.deleteOrganisation(),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			queryClient.invalidateQueries({ queryKey: ['organisation'] })
			toast.info('Organisation dissolved')
		}
	})

	return { mutate, isDeletePending }
}
