import { DragDropContext } from '@hello-pangea/dnd'

import { useGroupMembers } from '@/components/organisation/hooks/useGroupMembers'
import { Loader } from '@/components/ui/loader/Loader'

import { IUserProfile } from '@/types/user/user.types'

import { useOrgTaskDnd } from '../hooks/useOrgTaskDnD'
import { useOrganisationTasks } from '../hooks/useOrganisationTasks'
import { BOARDS } from '../utils/kanban.data'

import styles from './Kanban.module.css'
import { OrganisationTaskCard } from './OrganisationTaskCard'

export const OrganisationTasksView = ({
	user
}: {
	user: IUserProfile | undefined
}) => {
	const { members, isLoading: memberLoading } = useGroupMembers()
	const { items, setItems, isLoading } = useOrganisationTasks()
	const { onDragEnd } = useOrgTaskDnd()
	if (isLoading || memberLoading) return <Loader size={20} />
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className={styles.board}>
				{BOARDS.map(card => (
					<OrganisationTaskCard
						key={card.id}
						value={card.id}
						label={card.label}
						items={items}
						user={user}
						members={members}
						setItems={setItems}
					/>
				))}
			</div>
		</DragDropContext>
	)
}
