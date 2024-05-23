import { IResponse } from '@/types/response/response.type'
import { IBuyPro, IRoutine, TypeHabitForm } from '@/types/routine/routine.types'

import { userApi } from '@/api/interceptors'

export const routineService = {
	ROUTINE_URL: '/routine/',

	async buyPro(code: IBuyPro) {
		return await userApi.post<IResponse>(`/user-pro/buy-pro`, code)
	},

	async getRoutine() {
		return await userApi.get<IRoutine>(`${this.ROUTINE_URL}user-habits`)
	},

	async refreshRoutine() {
		return await userApi.delete<IResponse>(`${this.ROUTINE_URL}clear-routine`)
	},

	async createHabit(data: TypeHabitForm) {
		const { id, ...rest } = data
		return await userApi.post<IResponse>(
			`${this.ROUTINE_URL}create-user-habit`,
			rest
		)
	},

	async updateHabit(data: TypeHabitForm) {
		return await userApi.put<IResponse>(
			`${this.ROUTINE_URL}upd-user-habit`,
			data
		)
	},

	async updateOrder(ids: number[]) {
		return await userApi.put<IResponse>(`${this.ROUTINE_URL}upd-habits-order`, {
			order: ids
		})
	},

	async deleteHabit(id: number) {
		return await userApi.post<IResponse>(`${this.ROUTINE_URL}del-user-habit`, {
			id: id
		})
	}
}
