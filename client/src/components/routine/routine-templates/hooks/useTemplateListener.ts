import debounce from 'lodash.debounce'
import { useCallback, useEffect } from 'react'
import { UseFormWatch } from 'react-hook-form'

import { IUpdateTemplateForm } from '@/types/routine/routine.types'

import { useUpdateTemplate } from './useUpdateTemplate'

interface IUseTemplateDebounce {
	watch: UseFormWatch<IUpdateTemplateForm>
	id: number
}

export const useTemplateListener = ({ watch, id }: IUseTemplateDebounce) => {
	const { updateTemplate } = useUpdateTemplate()

	const debouncedUpdateTask = useCallback(
		debounce((name: string) => {
			updateTemplate({ name: name, template_id: id })
		}, 1000),
		[id]
	)

	useEffect(() => {
		const { unsubscribe } = watch((data: IUpdateTemplateForm) => {
			if (data.name) {
				debouncedUpdateTask(data.name)
			}
		})

		return () => {
			unsubscribe()
		}
	}, [watch(), id])
}
