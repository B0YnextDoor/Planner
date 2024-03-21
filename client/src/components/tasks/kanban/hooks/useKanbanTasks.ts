import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { IKanbanTask } from '@/types/tasks/kanban/kanban.types'

import { kanbanService } from '@/services/tasks/kanban/kanban.service'

export const useKanbanTasks = () => {
	const { data, isSuccess, isLoading } = useQuery({
		queryKey: ['kanban-tasks'],
		queryFn: () => kanbanService.getAll()
	})

	const [items, setItems] = useState<IKanbanTask[] | undefined>(data?.data)

	useEffect(() => {
		setItems(data?.data)
	}, [data?.data, isSuccess, isLoading])

	return { items, setItems, isLoading }
}
