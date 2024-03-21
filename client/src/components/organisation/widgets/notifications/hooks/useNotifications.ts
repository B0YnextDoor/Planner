import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { INotificationBase } from '@/types/notification/notification.types'

import { notificationService } from '@/services/notification/notification.service'

export const useNotifications = () => {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['notifications'],
		queryFn: () => notificationService.getUserNotifications()
	})

	const [notifications, setNotifications] = useState<
		INotificationBase[] | undefined
	>(data?.data)

	useEffect(() => {
		if (data && isSuccess) setNotifications(data.data)
	}, [data?.data, isLoading, isSuccess])

	return { notifications, isLoading }
}
