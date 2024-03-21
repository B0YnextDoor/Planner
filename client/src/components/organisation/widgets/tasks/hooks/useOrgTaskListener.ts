import debounce from 'lodash.debounce'
import { useCallback, useEffect } from 'react'
import { UseFormWatch } from 'react-hook-form'

import { TypeOrganisationTask } from '@/types/tasks/organisation/organisationTask.types'

import { useCreateOrgTask } from './useCreateOrgTask'
import { useUpdateOrgTask } from './useUpdateOrgTask'

interface IUseOrgTaskDebounce {
	watch: UseFormWatch<TypeOrganisationTask>
	id: number | undefined
	categoty: string
}

export const useOrgTaskListener = ({
	watch,
	id,
	categoty
}: IUseOrgTaskDebounce) => {
	const { createTask } = useCreateOrgTask()
	const { updateTask } = useUpdateOrgTask()

	const debouncedCreateTask = useCallback(
		debounce((data: TypeOrganisationTask) => {
			createTask({ ...data, category: categoty })
		}, 1000),
		[id]
	)

	const debouncedUpdateTask = useCallback(
		debounce((data: TypeOrganisationTask) => {
			updateTask({ ...data, task_id: id })
		}, 1000),
		[id]
	)

	useEffect(() => {
		const { unsubscribe } = watch((data: TypeOrganisationTask) => {
			if (!data.executors) return
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
