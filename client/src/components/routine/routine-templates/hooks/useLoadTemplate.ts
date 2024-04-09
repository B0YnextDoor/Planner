import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'

import { TypeWidgetSwitcher } from '../../WidgetSwitcher'

import { templateService } from '@/services/routine/routine_templates.service'

export const useLoadTemplate = (
	setType: Dispatch<SetStateAction<TypeWidgetSwitcher>>
) => {
	const queryClient = useQueryClient()
	const { mutate: loadTemplate, isPending: isLoading } = useMutation({
		mutationKey: ['load-template'],
		mutationFn: (id: number) => templateService.loadTemplate(id),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['habits'] })
			setType('routine')
			toast.info('Template loaded')
		}
	})

	return { loadTemplate, isLoading }
}
