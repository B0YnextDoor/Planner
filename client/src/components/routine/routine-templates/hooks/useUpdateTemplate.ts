import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { IUpdateTemplate } from '@/types/routine/routine.types'

import { templateService } from '@/services/routine/routine_templates.service'

export const useUpdateTemplate = () => {
	const queryClient = useQueryClient()
	const { mutate: updateTemplate, isPending: isUpdatePending } = useMutation({
		mutationKey: ['upd-template'],
		mutationFn: (data: IUpdateTemplate) => templateService.updTemplate(data),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['routine-templates'] })
			toast.success('Template updated!')
		}
	})
	return { updateTemplate, isUpdatePending }
}
