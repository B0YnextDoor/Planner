import { useMutation, useQueryClient } from '@tanstack/react-query'

import { notificationService } from '@/services/notification/notification.service'

export const useDeleteNotification = () => {
	const queryClient = useQueryClient()

	const { mutate: deleteNote, isPending: isPendingDelete } = useMutation({
		mutationKey: ['delete note'],
		mutationFn: (id: number) => notificationService.deleteNotification(id),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['notifications'] })
		}
	})

	return { deleteNote, isPendingDelete }
}
