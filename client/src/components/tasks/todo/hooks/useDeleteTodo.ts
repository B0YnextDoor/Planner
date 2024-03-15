import { useMutation, useQueryClient } from '@tanstack/react-query'

import { todoService } from '@/services/tasks/todo/todo.service'

export const useDeleteTodo = () => {
	const queryClient = useQueryClient()

	const { mutate: deleteTask, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete-todo-task'],
		mutationFn: (id: number) => todoService.deleteTask(id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['todo-tasks']
			})
		}
	})

	return { deleteTask, isDeletePending }
}
