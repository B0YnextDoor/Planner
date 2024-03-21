import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypeOrganisationForm } from '@/types/organisation/organisation.types'

import { organisationService } from '@/services/organisation/organisation.service'

export const useUpdateOrganisation = () => {
	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['update organisation'],
		mutationFn: (data: TypeOrganisationForm) =>
			organisationService.updateOrganisation(data),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['organisation'] })
			toast.success('Info updated!')
		},
		onError(error: any) {
			if (error?.response?.status == 422)
				toast.error(error?.response?.data?.detail)
		}
	})

	return { mutate, isPending }
}
