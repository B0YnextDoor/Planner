import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { IHabit } from '@/types/routine/routine.types'

import { templateService } from '@/services/routine/routine_templates.service'

interface ISaveRoutineProps {
	items: IHabit[] | undefined
	time: number | undefined
}

export const useSaveRoutine = ({ items, time }: ISaveRoutineProps) => {
	const queryClient = useQueryClient()
	const [ids, setIds] = useState<number[]>(items?.map(h => h.id) ?? [])
	const { mutate: createTemplate, isPending: isSaving } = useMutation({
		mutationKey: ['save-routine'],
		mutationFn: () =>
			templateService.addTemplate({
				habits: ids,
				time: time ?? -1
			}),
		onSuccess() {
			if (time && ids.length) {
				queryClient.invalidateQueries({ queryKey: ['routine-templates'] })
				toast.info('Template created! You can change its name if you want.')
			} else {
				toast.error('Not enough data to create template!')
			}
		}
	})
	useEffect(() => {
		setIds(items?.map(h => h.id) ?? [])
	}, [time])
	return { createTemplate, isSaving }
}
