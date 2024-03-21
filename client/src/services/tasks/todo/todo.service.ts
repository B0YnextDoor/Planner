import { FILTERS } from '@/components/tasks/todo/utils/todo.data'

import { IResponse } from '@/types/response/response.type'
import { ITodoTask, TypeTodoForm } from '@/types/tasks/todo/todo.types'

import { userApi } from '@/api/interceptors'

export const todoService = {
	TASKS_URL: '/tasks/todo/',

	async getAll() {
		const response = await userApi.post<ITodoTask[]>(`${this.TASKS_URL}user`)
		if (response.status == 200) return response
	},

	async createTask(data: TypeTodoForm) {
		const { isCompleted, task_id, ...rest } = data
		return await userApi.post<IResponse>(`${this.TASKS_URL}add`, rest)
	},

	async updateTask(data: TypeTodoForm) {
		const { isCompleted, ...rest } = data
		if (isCompleted) rest.category = 'finished'
		else if (!isCompleted && rest.category == 'finished') {
			rest.category = 'active'
			rest.due_date = FILTERS['today'].format()
		}
		return await userApi.post<IResponse>(`${this.TASKS_URL}upd`, rest)
	},

	async deleteTask(id: number) {
		return await userApi.post<IResponse>(`${this.TASKS_URL}del`, {
			task_id: id
		})
	}
}
