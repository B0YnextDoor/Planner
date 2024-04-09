import dayjs from 'dayjs'
import { toast } from 'sonner'

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
		const { data: response } = await userApi.post<any[]>(
			`${this.TASKS_URL}add`,
			rest
		)
		return this.displayInfo('created', response)
	},

	async updateTask(data: TypeTodoForm) {
		const { isCompleted, ...rest } = data
		if (isCompleted) rest.category = 'finished'
		else if (!isCompleted && rest.category == 'finished') {
			rest.category = 'active'
			rest.due_date = FILTERS['today'].format()
		}
		const { data: response } = await userApi.post<any[]>(
			`${this.TASKS_URL}upd`,
			rest
		)
		return this.displayInfo('updated', response)
	},

	async deleteTask(id: number) {
		return await userApi.post<IResponse>(`${this.TASKS_URL}del`, {
			task_id: id
		})
	},

	displayInfo(action: string, response: any[]) {
		if (!response[1] && !response[2]) {
			toast.success(`Task ${action}!`)
			return response
		}
		const infoMove = response[1]
			? `Recommended to move task on ${dayjs(response[1]).format('LL')}.`
			: ''
		const infoOverdued = response[2]
			? "Don't forget to finish overdued tasks!"
			: ''
		toast.info(`Task ${action}! ${infoMove} ${infoOverdued}`)
		return response
	}
}
