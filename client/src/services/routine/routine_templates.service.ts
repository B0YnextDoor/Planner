import { IResponse } from '@/types/response/response.type'
import type {
	ICreateTemplate,
	IRoutineTemplate,
	IUpdateTemplate,
	IUpdateTemplateHabits
} from '@/types/routine/routine.types'

import { userApi } from '@/api/interceptors'

export const templateService = {
	ROUTINE_URL: '/routine/templates/',

	async getTemplates() {
		const response = await userApi.post<IRoutineTemplate[]>(
			`${this.ROUTINE_URL}all`
		)
		if (response.status == 200) return response
	},

	async addTemplate(data: ICreateTemplate) {
		if (data.time < 0 || !data.habits.length) return
		return await userApi.post<IResponse>(`${this.ROUTINE_URL}add`, data)
	},

	async updTemplate(data: IUpdateTemplate) {
		return await userApi.post<IResponse>(`${this.ROUTINE_URL}upd`, data)
	},

	async updTemplateHabits(data: IUpdateTemplateHabits) {
		if (data.time < 0 || !data.habits.length) return
		return await userApi.post<IResponse>(`${this.ROUTINE_URL}upd-habits`, data)
	},

	async delTemplate(id: number) {
		return await userApi.post<IResponse>(`${this.ROUTINE_URL}del`, {
			template_id: id
		})
	},

	async loadTemplate(id: number) {
		return await userApi.post<IResponse>(`${this.ROUTINE_URL}load`, {
			template_id: id
		})
	}
}
