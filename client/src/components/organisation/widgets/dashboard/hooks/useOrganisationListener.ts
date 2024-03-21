import debounce from 'lodash.debounce'
import { useCallback, useEffect } from 'react'
import { UseFormWatch } from 'react-hook-form'

import { TypeOrganisationForm } from '@/types/organisation/organisation.types'

import { useUpdateOrganisation } from './useUpdateOrganisation'

interface IOrganisationInfo {
	watch: UseFormWatch<TypeOrganisationForm>
	name: string | undefined
}

export const useOrganisationListener = ({ watch, name }: IOrganisationInfo) => {
	const { mutate } = useUpdateOrganisation()

	const debouncedUpdateTask = useCallback(
		debounce((data: TypeOrganisationForm) => {
			mutate(data)
		}, 1000),
		[name]
	)

	useEffect(() => {
		const { unsubscribe } = watch((data: TypeOrganisationForm) => {
			if (!name) return
			debouncedUpdateTask(data)
		})

		return () => {
			unsubscribe()
		}
	}, [watch(), debouncedUpdateTask, name])
}
