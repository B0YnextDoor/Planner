import {
	IOrganisationStatistics,
	IUserStatistics
} from '@/types/statistics/statistics.types'

import { userApi } from '@/api/interceptors'

export const statService = {
	STAT_URL: '/statistics',
	async userStat() {
		const response = await userApi.post<IUserStatistics>(
			`${this.STAT_URL}/user`
		)
		if (response.status == 200) return response.data
	},
	async organisationStat() {
		const response = await userApi.post<IOrganisationStatistics>(
			`${this.STAT_URL}/organisation`
		)
		if (response.status == 200) return response.data
	}
}
