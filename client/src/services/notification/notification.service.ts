import { INotificationBase } from '@/types/notification/notification.types'
import { IResponse } from '@/types/response/response.type'

import { userApi } from '@/api/interceptors'

export const notificationService = {
	NOTIFICATION_URL: '/notification/',

	async getUserNotifications() {
		const response = await userApi.get<INotificationBase[]>(
			`${this.NOTIFICATION_URL}user`
		)
		if (response.status == 200) return response
	},

	async deleteNotification(id: number) {
		return await userApi.post<IResponse>(`${this.NOTIFICATION_URL}del`, {
			id: id
		})
	}
}
