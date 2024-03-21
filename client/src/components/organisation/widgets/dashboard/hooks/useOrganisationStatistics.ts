import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { IOrganisationStatistics } from '@/types/statistics/statistics.types'

import { statService } from '@/services/statistics/statistics.service'

export const useOrganisationStatistics = () => {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['orgstat'],
		queryFn: () => statService.organisationStat()
	})

	const [statistics, setStatistics] = useState<
		IOrganisationStatistics | undefined
	>(data)

	useEffect(() => {
		if (isSuccess && data) setStatistics(data)
	}, [isLoading, isSuccess, data])

	return { statistics, isLoading }
}
