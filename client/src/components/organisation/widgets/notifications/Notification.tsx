import { Check, Loader, Trash } from 'lucide-react'

import { INotificationBase } from '@/types/notification/notification.types'

import styles from './Notifications.module.css'
import { useDeleteNotification } from './hooks/useDeleteNotification'
import { useJoinOrganisation } from './hooks/useJoinOrganisation'

export const Notification = ({ note }: { note: INotificationBase }) => {
	const { deleteNote, isPendingDelete } = useDeleteNotification()
	const { joinOrganisation, isPendingJoin } = useJoinOrganisation()
	return (
		<div className={styles.notification}>
			<span className='text-xs font-semibold'>{note.message}</span>
			{isPendingDelete || isPendingJoin ? (
				<Loader size={20} />
			) : (
				<div className='flex flex-col gap-2.5'>
					{note.payload.length > 0 && (
						<button
							onClick={() => {
								joinOrganisation(note.payload)
								deleteNote(note.id)
							}}
						>
							<Check size={15} />
						</button>
					)}
					<button onClick={() => deleteNote(note.id)}>
						<Trash size={15} />
					</button>
				</div>
			)}
		</div>
	)
}
