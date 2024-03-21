import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { IUserSettings } from '@/types/settings/settings.types'

import { settingsService } from '@/services/settings/settings.service'
import { userService } from '@/services/user/user.service'

export const useUpdateSettings = () => {
	const queryClient = useQueryClient()

	const handleMutation = async (data: IUserSettings) => {
		return await userService
			.updProfile({
				name: data.name,
				email: data.email,
				password: data.password
			})
			.then(response => {
				if (response.status == 200) {
					return settingsService.updTimerSettings({
						work_interval: data.work_interval,
						rest_interval: data.rest_interval,
						laps_ammount: data.laps_ammount
					})
				}
			})
	}

	const { mutate, isPending } = useMutation({
		mutationKey: ['update settings'],
		mutationFn: (data: IUserSettings) => handleMutation(data),
		onSuccess() {
			toast.success('Successfully update user settings!')
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			queryClient.invalidateQueries({ queryKey: ['timer settings'] })
		},
		onError(error: any) {
			toast.error(error?.response?.data?.detail)
		}
	})

	return { mutate, isPending }
}
