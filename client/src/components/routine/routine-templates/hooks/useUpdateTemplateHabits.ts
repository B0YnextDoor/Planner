import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { IHabit } from '@/types/routine/routine.types'

import { templateService } from '@/services/routine/routine_templates.service'

interface IUpdateTemplateHabitsProps {
	items: IHabit[] | undefined
	time: number | undefined
}

export const useUpdateTemplateHabits = ({
	items,
	time
}: IUpdateTemplateHabitsProps) => {
	const queryClient = useQueryClient()
	const [ids, setIds] = useState<number[]>(items?.map(h => h.id) ?? [])
	const { mutate: updateTemplate, isPending: isUpdatePending } = useMutation({
		mutationKey: ['save-routine'],
		mutationFn: (id: number) =>
			templateService.updTemplateHabits({
				template_id: id,
				habits: ids,
				time: time ?? -1
			}),
		onSuccess() {
			if (time && ids.length) {
				queryClient.invalidateQueries({ queryKey: ['routine-templates'] })
				toast.success('Template updated!')
			} else {
				toast.error('Not enough data to update template!')
			}
		}
	})
	useEffect(() => {
		setIds(items?.map(h => h.id) ?? [])
	}, [time])
	return { updateTemplate, isUpdatePending }
}
