import { ITimerSettings } from '@/types/settings/settings.types'

import { userApi } from '@/api/interceptors'

export const settingsService = {
	TIMER_URL: '/timer/',

	async getTimerSettings() {
		const response = await userApi.get<ITimerSettings>(
			`${this.TIMER_URL}settings`
		)
		if (response.status == 200) return response.data
	},

	async updTimerSettings(data: ITimerSettings) {
		return await userApi.put(`${this.TIMER_URL}upd-settings`, data)
	}
}
