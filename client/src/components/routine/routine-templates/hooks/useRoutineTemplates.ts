import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { IRoutineTemplate } from '@/types/routine/routine.types'

import { templateService } from '@/services/routine/routine_templates.service'

export const useRoutineTemplates = () => {
	const { data, isSuccess, isLoading, isError } = useQuery({
		queryKey: ['routine-templates'],
		queryFn: () => templateService.getTemplates()
	})

	const [templates, setTemplates] = useState<IRoutineTemplate[] | undefined>(
		data?.data
	)

	useEffect(() => {
		if (isError) {
			setTemplates(undefined)
			return
		}
		setTemplates(data?.data)
	}, [data, data?.data, isSuccess, isLoading, isError])

	return { templates, isLoading }
}
