import { ICustomTask, TypeCustomTask } from '@/types/tasks/custom/custom.types'

import { userApi } from '@/api/interceptors'

export const customService = {
	CUSTOM_TASK_URL: `/tasks/groups/custom/`,

	async getCustomTasks() {
		const response = await userApi.get<ICustomTask[]>(
			`${this.CUSTOM_TASK_URL}user`
		)
		if (response.status == 200) return response
	},

	async addCustomTask(formData: TypeCustomTask) {
		const { isCompleted, id, ...rest } = formData
		return await userApi.post(`${this.CUSTOM_TASK_URL}add`, rest)
	},

	async updateCustomTask(formData: TypeCustomTask) {
		const { isCompleted, id, ...rest } = formData
		if (isCompleted) rest.category = 'finished'
		else if (!isCompleted && rest.category == 'finished')
			rest.category = 'active'
		return await userApi.put(`${this.CUSTOM_TASK_URL}upd`, {
			...rest,
			task_id: id
		})
	},

	async deleteCustomTask(group_id: number, task_id: number) {
		return await userApi.post(`${this.CUSTOM_TASK_URL}del`, {
			group_id: group_id,
			task_id: task_id
		})
	}
}
