import { IUserAchievement } from '@/types/achievement/achievement.types'
import { IResponse } from '@/types/response/response.type'
import { IUpdUserProfile, IUserProfile } from '@/types/user/user.types'

import { userApi } from '@/api/interceptors'

export const userService = {
	USER_URL: '/user/',

	async getProfile() {
		const response = await userApi.get<IUserProfile>(`${this.USER_URL}profile`)
		if (response.status == 200) return response.data
	},

	async updProfile(data: IUpdUserProfile) {
		return await userApi.put<IResponse>(`${this.USER_URL}upd-profile`, data)
	},

	async getAchievements() {
		const response = await userApi.get<IUserAchievement[]>(
			`${this.USER_URL}achievements`
		)
		if (response.status == 200) return response.data
	}
}
