import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { IOrganisationBase } from '@/types/organisation/organisation.types'

import { organisationService } from '@/services/organisation/organisation.service'

export const useOrganisation = () => {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['organisation'],
		queryFn: () => organisationService.getUserOrganisation(),
		retry: 0
	})

	const [organisation, setOrganisation] = useState<
		IOrganisationBase | undefined
	>(data?.data)

	useEffect(() => {
		setOrganisation(data?.data)
	}, [isLoading, isSuccess, data?.data])

	return { organisation, isLoading }
}
