import { IResponse } from '@/types/response/response.type'
import { IKanbanTask, TypeKanbanForm } from '@/types/tasks/kanban/kanban.types'

import { userApi } from '@/api/interceptors'

export const kanbanService = {
	TASKS_URL: '/tasks/kanban/',

	async getAll() {
		const response = await userApi.get<IKanbanTask[]>(`${this.TASKS_URL}user`)
		if (response.status == 200) return response
	},

	async createTask(data: TypeKanbanForm) {
		const { isCompleted, task_id, time_created, time_spent, ...rest } = data
		return await userApi.post<IResponse>(`${this.TASKS_URL}add`, rest)
	},

	async updateTask(data: TypeKanbanForm) {
		const { isCompleted, time_created, time_spent, ...rest } = data
		if (isCompleted) rest.category = 'done'
		else if (!isCompleted && rest.category == 'done')
			rest.category = 'in process'
		return await userApi.put<IResponse>(`${this.TASKS_URL}upd`, rest)
	},

	async deleteTask(id: number) {
		return await userApi.post<IResponse>(`${this.TASKS_URL}del`, {
			task_id: id
		})
	}
}
