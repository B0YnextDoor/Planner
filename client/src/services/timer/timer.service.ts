import { IResponse } from '@/types/response/response.type'
import { IRoundInfo } from '@/types/timer/timer.types'

import { userApi } from '@/api/interceptors'

export const timerService = {
	TIMER_URL: '/timer/',

	async createSession() {
		return await userApi.post<IResponse>(`${this.TIMER_URL}new-session`)
	},

	async updateSession() {
		return await userApi.post<IResponse>(`${this.TIMER_URL}upd-session`, {
			is_completed: true
		})
	},

	async currentSession() {
		return await userApi.post<IRoundInfo>(`${this.TIMER_URL}current`)
	},

	async updateRound(data: IRoundInfo) {
		return await userApi.post(`${this.TIMER_URL}upd-round`, {
			...data,
			is_completed: false
		})
	}
}
