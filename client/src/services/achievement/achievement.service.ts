import { userApi } from '@/api/interceptors'

export const achievementService = {
	ACHIEVEMENTS_URL: '/achievement/',

	async load() {
		await userApi.get(`${this.ACHIEVEMENTS_URL}all`)
	},

	async add() {}
}
