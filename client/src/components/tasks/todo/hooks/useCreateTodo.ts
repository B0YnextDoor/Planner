import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TypeTodoForm } from '@/types/tasks/todo/todo.types'

import { todoService } from '@/services/tasks/todo/todo.service'

export const useCreateTodo = () => {
	const queryClient = useQueryClient()

	const { mutate: createTask } = useMutation({
		mutationKey: ['create-todo-task'],
		mutationFn: (data: TypeTodoForm) => todoService.createTask(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['todo-tasks']
			})
		}
	})
	return { createTask }
}
