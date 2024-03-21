import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TypeTodoForm } from '@/types/tasks/todo/todo.types'

import { todoService } from '@/services/tasks/todo/todo.service'

export const useUpdateTodo = (id?: string) => {
	const queryClient = useQueryClient()

	const { mutate: updateTask } = useMutation({
		mutationKey: ['update-todo-task', id],
		mutationFn: (data: TypeTodoForm) => todoService.updateTask(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['todo-tasks']
			})
		}
	})

	return { updateTask }
}
