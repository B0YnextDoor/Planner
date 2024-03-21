import debounce from 'lodash.debounce'
import { useCallback, useEffect } from 'react'
import { UseFormWatch } from 'react-hook-form'

import { TypeCustomTask } from '@/types/tasks/custom/custom.types'

import { useCreateCustom } from './useCreateCustom'
import { useUpdateCustom } from './useUpdateCustom'

interface IUseCustomDebounce {
	watch: UseFormWatch<TypeCustomTask>
	id: number | undefined
}

export const useCustomListener = ({ watch, id }: IUseCustomDebounce) => {
	const { createTask } = useCreateCustom()
	const { updateTask } = useUpdateCustom(String(id))

	const debouncedCreateTask = useCallback(
		debounce((data: TypeCustomTask) => {
			createTask({ ...data, category: 'active' })
		}, 1000),
		[id]
	)

	const debouncedUpdateTask = useCallback(
		debounce((data: TypeCustomTask) => {
			updateTask({ ...data, id: id })
		}, 1000),
		[id]
	)

	useEffect(() => {
		const { unsubscribe } = watch((data: TypeCustomTask) => {
			if (id) {
				debouncedUpdateTask(data)
			} else {
				debouncedCreateTask(data)
			}
		})

		return () => {
			unsubscribe()
		}
	}, [watch(), debouncedUpdateTask, debouncedCreateTask, id])
}
