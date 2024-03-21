'use client'

import {
	MultiBackend,
	Tree,
	getBackendOptions
} from '@minoru/react-dnd-treeview'
import { Dispatch, SetStateAction } from 'react'
import { DndProvider } from 'react-dnd'

import { Loader } from '@/components/ui/loader/Loader'

import { ICustomGroup } from '@/types/tasks/custom/custom.types'

import { useCustomTasks } from '../tasks/hooks/useCustomTasks'

import { CustomGroup } from './CustomGroup'
import { useGroupDnd } from './hooks/useGroupDnd'
import { useTreeOpenHandler } from './hooks/useOpenHandler'

interface ICustomGroupsComponent {
	groups: ICustomGroup[] | undefined
	setGroups: Dispatch<SetStateAction<ICustomGroup[] | undefined>>
	isLoading: boolean
}

export const CustomGroups = ({
	groups,
	setGroups,
	isLoading
}: ICustomGroupsComponent) => {
	const { tasks, setTasks, tasksLoading } = useCustomTasks()
	const { ref, toggle, close, open } = useTreeOpenHandler()
	const { handleDrop } = useGroupDnd({ groups, setGroups })
	if (isLoading || tasksLoading) return <Loader size={20} />
	return (
		<DndProvider
			backend={MultiBackend}
			options={getBackendOptions()}
		>
			<div className='w-full p-5'>
				{groups && groups.length > 0 ? (
					<DndProvider
						backend={MultiBackend}
						options={getBackendOptions()}
					>
						<Tree
							ref={ref}
							tree={groups}
							rootId={-1}
							sort={false}
							insertDroppableFirst={false}
							enableAnimateExpand={true}
							onDragStart={(node, _) => {
								if (node.id) close(node.id)
							}}
							onDrop={(_, e: any) => handleDrop(e)}
							canDrop={() => true}
							dropTargetOffset={5}
							render={(node, { depth, isOpen }) => (
								<CustomGroup
									group={node}
									depth={depth}
									isOpen={isOpen}
									groups={groups}
									tasks={tasks}
									onClick={() => {
										if (node.droppable) {
											toggle(node.id)
										}
									}}
									open={open}
									close={close}
									setGroups={setGroups}
									setTasks={setTasks}
									key={node.id}
								/>
							)}
							initialOpen={true}
						/>
					</DndProvider>
				) : (
					<div>Add some custom groups</div>
				)}
			</div>
		</DndProvider>
	)
}
