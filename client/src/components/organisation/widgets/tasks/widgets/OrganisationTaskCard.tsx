import { Draggable, Droppable } from '@hello-pangea/dnd'
import cn from 'clsx'
import { Dispatch, SetStateAction } from 'react'

import { IOrganisationMember } from '@/types/organisation/organisation.types'
import { IOrganisationTask } from '@/types/tasks/organisation/organisationTask.types'
import { IUserProfile } from '@/types/user/user.types'

import { filterTasks } from '../utils/kanban.filter'

import { AddOrgTaskButton } from './AddOrgTaskButton'
import styles from './Kanban.module.css'
import { OrganisationTask } from './OrganisationTask'

interface IOrganisationTaskCard {
	value: string
	label: string
	items: IOrganisationTask[] | undefined
	user: IUserProfile | undefined
	members: IOrganisationMember[] | undefined
	setItems: Dispatch<SetStateAction<IOrganisationTask[] | undefined>>
}

export const OrganisationTaskCard = ({
	value,
	label,
	items,
	user,
	members,
	setItems
}: IOrganisationTaskCard) => {
	return (
		<Droppable droppableId={value}>
			{provided => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					<div className={styles.column}>
						<div
							className={cn(
								'text-center',
								'font-semibold',
								value == 'todo'
									? 'text-green-600'
									: value == 'done'
										? 'text-purple-500'
										: 'text-blue-600'
							)}
						>
							{label}
						</div>

						{filterTasks(items, value)?.map((item, index) => (
							<Draggable
								key={item.task_id}
								draggableId={String(item.task_id)}
								index={index}
							>
								{provided => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
									>
										<OrganisationTask
											key={index}
											item={item}
											role={user?.organisation_role}
											members={members}
											setItems={setItems}
										/>
									</div>
								)}
							</Draggable>
						))}

						{provided.placeholder}

						{value !== 'done' &&
							!items?.some(item => !item.task_id) &&
							user &&
							user.organisation_role == 'head' && (
								<AddOrgTaskButton
									setItems={setItems}
									category={value}
								/>
							)}
					</div>
				</div>
			)}
		</Droppable>
	)
}
