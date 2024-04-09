import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { templateService } from '@/services/routine/routine_templates.service'

export const useDeleteTemplate = () => {
	const queryClient = useQueryClient()
	const { mutate: deleteTemplate, isPending: isDeletePending } = useMutation({
		mutationKey: ['del-template'],
		mutationFn: (id: number) => templateService.delTemplate(id),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['routine-templates'] })
			toast.info('Template deleted')
		}
	})
	return { deleteTemplate, isDeletePending }
}
