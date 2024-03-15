import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { ITodoTask } from '@/types/tasks/todo/todo.types'

import { filterTasks } from '../utils/todo.filter'

import { todoService } from '@/services/tasks/todo/todo.service'

export const useTodoTasks = () => {
	const { data, isSuccess } = useQuery({
		queryKey: ['todo-tasks'],
		queryFn: () => todoService.getAll()
	})

	const [items, setItems] = useState<ITodoTask[] | undefined>(data?.data)
	const [overdued, setOverdued] = useState<ITodoTask[] | undefined>()

	useEffect(() => {
		setItems(data?.data)
		if (isSuccess && data) setOverdued(filterTasks(data.data, 'overdued'))
	}, [data?.data, isSuccess])

	return { items, setItems, overdued, setOverdued }
}
