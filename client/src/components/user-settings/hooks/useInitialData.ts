import { useEffect } from 'react'
import { UseFormReset } from 'react-hook-form'

import { IUserSettings } from '@/types/settings/settings.types'

import { useProfile } from '@/hooks/useProfile'

import { useTimerSettings } from '../../timer/hooks/useTimerSettings'

export const useInitialData = (reset: UseFormReset<IUserSettings>) => {
	const { work_interval, rest_interval, laps_ammount, settingsSuccess } =
		useTimerSettings()
	const { data, isSuccess, isLoading } = useProfile()
	useEffect(() => {
		if (settingsSuccess && isSuccess && data) {
			reset({
				name: data.name,
				email: data.email,
				password: '',
				work_interval: work_interval,
				rest_interval: rest_interval,
				laps_ammount: laps_ammount
			})
		}
	}, [isSuccess, settingsSuccess])
	return { isLoading }
}
