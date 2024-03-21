import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { ICustomTask } from '@/types/tasks/custom/custom.types'

import { customService } from '@/services/tasks/custom/custom.service'

export const useCustomTasks = () => {
	const {
		data,
		isSuccess: taskSuccess,
		isLoading: tasksLoading
	} = useQuery({
		queryKey: ['custom-tasks'],
		queryFn: () => customService.getCustomTasks(),
		retry: 0
	})
	const [tasks, setTasks] = useState<ICustomTask[] | undefined>(data?.data)

	useEffect(() => {
		setTasks(data?.data)
	}, [data?.data, taskSuccess])

	return { tasks, setTasks, tasksLoading }
}
