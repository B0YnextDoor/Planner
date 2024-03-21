import { IResponse } from '@/types/response/response.type'
import { IBuyPro, IRoutine, TypeHabitForm } from '@/types/routine/routine.types'

import { userApi } from '@/api/interceptors'

export const routineService = {
	ROUTINE_URL: '/routine/',

	async buyPro(code: IBuyPro) {
		const response = await userApi.post<IResponse>(
			`${this.ROUTINE_URL}buy-pro`,
			code
		)
		if (response.status == 200) return response
		else if (response.status == 422) console.log('aboba')
	},

	async getRoutine() {
		const response = await userApi.post<IRoutine>(
			`${this.ROUTINE_URL}user-habits`
		)
		if (response.status == 200) return response
	},

	async createHabit(data: TypeHabitForm) {
		const { id, ...rest } = data
		return await userApi.post<IResponse>(
			`${this.ROUTINE_URL}create-user-habit`,
			rest
		)
	},

	async updateHabit(data: TypeHabitForm) {
		return await userApi.post<IResponse>(
			`${this.ROUTINE_URL}upd-user-habit`,
			data
		)
	},

	async updateOrder(ids: number[]) {
		return await userApi.post<IResponse>(
			`${this.ROUTINE_URL}upd_habits-order`,
			{
				order: ids
			}
		)
	},

	async deleteHabit(id: number) {
		return await userApi.post<IResponse>(`${this.ROUTINE_URL}del-user-habit`, {
			id: id
		})
	}
}
