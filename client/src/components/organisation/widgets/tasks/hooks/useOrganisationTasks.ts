import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { IOrganisationTask } from '@/types/tasks/organisation/organisationTask.types'

import { organisationTaskService } from '@/services/tasks/organisation/organisationTask.service'

export const useOrganisationTasks = () => {
	const { data, isSuccess, isLoading } = useQuery({
		queryKey: ['organisation-tasks'],
		queryFn: () => organisationTaskService.getOrganisationTasks()
	})

	const [items, setItems] = useState<IOrganisationTask[] | undefined>(
		data?.data
	)

	useEffect(() => {
		setItems(data?.data)
	}, [data?.data, isSuccess, isLoading])

	return { items, setItems, isLoading }
}
