import debounce from 'lodash.debounce'
import { useCallback, useEffect } from 'react'
import { UseFormWatch } from 'react-hook-form'

import { TypeKanbanForm } from '@/types/tasks/kanban/kanban.types'

import { useCreateKanban } from './useCreateKanban'
import { useUpdateKanban } from './useUpdateKanban'

interface IUseKanbanDebounce {
	watch: UseFormWatch<TypeKanbanForm>
	id: number | undefined
	categoty: string
}

export const useKanbanListener = ({
	watch,
	id,
	categoty
}: IUseKanbanDebounce) => {
	const { createTask } = useCreateKanban()
	const { updateTask } = useUpdateKanban()

	const debouncedCreateTask = useCallback(
		debounce((data: TypeKanbanForm) => {
			createTask({ ...data, category: categoty })
		}, 1000),
		[id]
	)

	const debouncedUpdateTask = useCallback(
		debounce((data: TypeKanbanForm) => {
			updateTask({ ...data, task_id: id })
		}, 1000),
		[id]
	)

	useEffect(() => {
		const { unsubscribe } = watch((data: TypeKanbanForm) => {
			if (id) {
				debouncedUpdateTask(data)
			} else {
				debouncedCreateTask(data)
			}
		})

		return () => {
			unsubscribe()
		}
	}, [watch(), debouncedUpdateTask, debouncedCreateTask, id])
}
