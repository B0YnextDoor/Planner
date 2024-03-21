import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { IOrganisationMember } from '@/types/organisation/organisation.types'

import { organisationService } from '@/services/organisation/organisation.service'

export const useGroupMembers = () => {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['members'],
		queryFn: () => organisationService.getOrganisationMembers()
	})

	const [members, setMembers] = useState<IOrganisationMember[] | undefined>(
		data?.data
	)

	useEffect(() => {
		if (data && isSuccess) setMembers(data.data)
	}, [data?.data, isLoading, isSuccess])

	return { members, isLoading }
}
