import debounce from 'lodash.debounce'
import { useCallback, useEffect } from 'react'
import { UseFormWatch } from 'react-hook-form'

import { TypeTodoForm } from '@/types/tasks/todo/todo.types'

import { useCreateTodo } from './useCreateTodo'
import { useUpdateTodo } from './useUpdateTodo'

interface IUseTaskDebounce {
	watch: UseFormWatch<TypeTodoForm>
	id: number | undefined
	category: string
}

export const useTodoListener = ({ watch, id, category }: IUseTaskDebounce) => {
	const { createTask } = useCreateTodo()
	const { updateTask } = useUpdateTodo()

	const debouncedCreateTask = useCallback(
		debounce((data: TypeTodoForm) => {
			createTask({ ...data, category: category })
		}, 1000),
		[id]
	)

	const debouncedUpdateTask = useCallback(
		debounce((data: TypeTodoForm) => {
			updateTask({ ...data, task_id: id })
		}, 1000),
		[id]
	)

	useEffect(() => {
		const { unsubscribe } = watch((data: TypeTodoForm) => {
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
