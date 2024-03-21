import { Loader } from '@/components/ui/loader/Loader'

import { Notification } from './Notification'
import { useNotifications } from './hooks/useNotifications'

export const Notifications = () => {
	const { notifications, isLoading } = useNotifications()
	if (isLoading)
		return (
			<div className='w-3/4 flex justify-center items-start'>
				<Loader size={20} />
			</div>
		)
	return (
		<div className='whitespace-nowrap relative flex flex-col items-center w-full'>
			<div className='text-xl font-mono mb-2'>Your notifications:</div>
			{notifications && notifications.length > 0 ? (
				notifications.map((note, index) => (
					<Notification
						note={note}
						key={index}
					/>
				))
			) : (
				<div>You have no invitations yet</div>
			)}
		</div>
	)
}
