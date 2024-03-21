import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { ITodoTask } from '@/types/tasks/todo/todo.types'

import { filterTasks } from '../utils/todo.filter'

import { todoService } from '@/services/tasks/todo/todo.service'

export const useTodoTasks = () => {
	const { data, isSuccess, isLoading } = useQuery({
		queryKey: ['todo-tasks'],
		queryFn: () => todoService.getAll()
	})

	const [items, setItems] = useState<ITodoTask[] | undefined>(data?.data)
	const [overdued, setOverdued] = useState<ITodoTask[] | undefined>()

	useEffect(() => {
		if (isSuccess && data) {
			setItems(data.data)
			setOverdued(filterTasks(data.data, 'overdued'))
		}
	}, [data, data?.data, isSuccess, isLoading])

	return { items, setItems, overdued, setOverdued }
}
