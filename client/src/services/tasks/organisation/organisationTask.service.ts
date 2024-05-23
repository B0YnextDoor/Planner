import { IResponse } from '@/types/response/response.type'
import {
	IOrganisationTask,
	TypeOrganisationTask
} from '@/types/tasks/organisation/organisationTask.types'

import { userApi } from '@/api/interceptors'

export const organisationTaskService = {
	ORGANISATION_TASK_URL: '/tasks/organisation/',

	async getOrganisationTasks() {
		const response = await userApi.get<IOrganisationTask[]>(
			`${this.ORGANISATION_TASK_URL}organisation-tasks`
		)
		if (response.status == 200) return response
	},

	async createOrganisationTask(data: TypeOrganisationTask) {
		const { task_id, isCompleted, time_created, time_spent, ...rest } = data
		return await userApi.post<IResponse>(
			`${this.ORGANISATION_TASK_URL}add`,
			rest
		)
	},

	async updateOrganisationTask(data: TypeOrganisationTask) {
		const { isCompleted, time_created, time_spent, ...rest } = data
		if (isCompleted) rest.category = 'done'
		else if (!isCompleted && rest.category == 'done')
			rest.category = 'in process'
		return await userApi.put<IResponse>(`${this.ORGANISATION_TASK_URL}upd`, {
			...rest
		})
	},

	async deleteOrganisationTask(id: number) {
		return await userApi.post<IResponse>(`${this.ORGANISATION_TASK_URL}del`, {
			task_id: id
		})
	}
}
