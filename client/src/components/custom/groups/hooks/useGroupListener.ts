import debounce from 'lodash.debounce'
import { useCallback, useEffect } from 'react'
import { UseFormWatch } from 'react-hook-form'

import { TypeCustomGroup } from '@/types/tasks/custom/custom.types'

import { useCreateGroup } from './useCreateGroup'
import { useUpdateGroup } from './useUpdateGroup'

interface IUseGroupDebounce {
	watch: UseFormWatch<TypeCustomGroup>
	id: number | undefined
}

export const useGroupListener = ({ watch, id }: IUseGroupDebounce) => {
	const { createGroup } = useCreateGroup()
	const { updateGroup } = useUpdateGroup()

	const debouncedCreateGroup = useCallback(
		debounce((data: TypeCustomGroup) => {
			createGroup(data)
		}, 1000),
		[id]
	)

	const debouncedUpdateGroup = useCallback(
		debounce((data: TypeCustomGroup) => {
			updateGroup({ ...data, id: id })
		}, 1000),
		[id]
	)

	useEffect(() => {
		const { unsubscribe } = watch((data: TypeCustomGroup) => {
			if (id) {
				debouncedUpdateGroup(data)
			} else {
				debouncedCreateGroup(data)
			}
		})

		return () => {
			unsubscribe()
		}
	}, [watch(), debouncedUpdateGroup, debouncedCreateGroup, id])
}
