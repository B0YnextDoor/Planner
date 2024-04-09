import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import type { IHabit } from '@/types/routine/routine.types'

import { routineService } from '@/services/routine/routine.service'

export const useRoutine = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['habits'],
		queryFn: () => routineService.getRoutine(),
		retry: 0
	})

	const [items, setItems] = useState<IHabit[] | undefined>(data?.data?.habits)
	const [time, setTime] = useState<number | undefined>(data?.data?.time)

	useEffect(() => {
		if (isError) {
			setItems(undefined)
			return
		}
		setItems(data?.data?.habits)
		setTime(data?.data?.time)
	}, [data?.data, isLoading, isError])

	return { items, time, setItems, isLoading }
}
