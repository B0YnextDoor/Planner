import { useQuery } from '@tanstack/react-query'

import { settingsService } from '@/services/settings/settings.service'

export const useTimerSettings = () => {
	const { data: settings, isSuccess: settingsSuccess } = useQuery({
		queryKey: ['timer settings'],
		queryFn: () => settingsService.getTimerSettings()
	})
	const work_interval = settings?.work_interval ?? 30
	const rest_interval = settings?.rest_interval ?? 10
	const laps_ammount = settings?.laps_ammount ?? 7
	return { work_interval, rest_interval, laps_ammount, settingsSuccess }
}
