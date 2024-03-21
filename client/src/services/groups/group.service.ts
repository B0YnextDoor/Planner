import {
	ICustomGroup,
	TypeCustomGroup
} from '@/types/tasks/custom/custom.types'

import { userApi } from '@/api/interceptors'

export const groupService = {
	CUSTOM_GROUP_URL: '/tasks/groups/',

	async getCustomGroups(parent_id: number) {
		const response = await userApi.post<ICustomGroup[]>(
			`${this.CUSTOM_GROUP_URL}user-groups`,
			{ parent: parent_id }
		)
		if (response.status == 200) return response
	},

	async addCustomGroup(data: TypeCustomGroup) {
		const { id, text, droppable, ...rest } = data
		return await userApi.post(`${this.CUSTOM_GROUP_URL}add`, {
			...rest,
			group_name: text
		})
	},

	async updateCustomGroup(data: TypeCustomGroup) {
		const { id, text, droppable, ...rest } = data
		return await userApi.post(`${this.CUSTOM_GROUP_URL}upd`, {
			...rest,
			group_name: text ?? null,
			group_id: id
		})
	},

	async deleteCustomGroup(group_id: number) {
		return await userApi.post(`${this.CUSTOM_GROUP_URL}del`, {
			group_id: group_id
		})
	}
}
