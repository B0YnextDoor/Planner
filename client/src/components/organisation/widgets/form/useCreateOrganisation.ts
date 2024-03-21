import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypeOrganisationForm } from '@/types/organisation/organisation.types'

import { organisationService } from '@/services/organisation/organisation.service'

export const useCreateOrganisation = () => {
	const queryClient = useQueryClient()

	const { mutate: createOrganisation, isPending } = useMutation({
		mutationKey: ['create organisation'],
		mutationFn: (data: TypeOrganisationForm) =>
			organisationService.createOrganisation(data),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			queryClient.invalidateQueries({ queryKey: ['organisation'] })
			toast.success('Organisation created!')
		},
		onError(error: any) {
			if (error?.response?.status == 422)
				toast.error(error?.response?.data?.detail)
		}
	})

	return { createOrganisation, isPending }
}
