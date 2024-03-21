import {
	ChevronDown,
	ChevronUp,
	ClipboardPlus,
	FolderPlus,
	GripVertical,
	Trash
} from 'lucide-react'
import { Dispatch, FC, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'

import { TransparentInput } from '@/components/ui/input/TransparentInput'
import { Loader } from '@/components/ui/loader/Loader'

import {
	ICustomGroup,
	ICustomTask,
	TypeCustomGroup
} from '@/types/tasks/custom/custom.types'

import { CustomTask } from '../tasks/CustomTask'
import { AddCustomGroup } from '../utils/addCustomGroup'
import { addCustomTask } from '../utils/addCustomTask'

import styles from './CustomGroup.module.css'
import { useDeleteGroup } from './hooks/useDeleteGroup'
import { useGroupListener } from './hooks/useGroupListener'

const TREE_X_OFFSET = 22

interface ICustomGroupComponent {
	group: ICustomGroup
	depth: number
	isOpen: boolean
	groups: ICustomGroup[] | undefined
	tasks: ICustomTask[] | undefined
	onClick: (id: number | string) => void
	open: (id: number | string) => void
	close: (id: number | string) => void
	setGroups: Dispatch<SetStateAction<ICustomGroup[] | undefined>>
	setTasks: Dispatch<SetStateAction<ICustomTask[] | undefined>>
}

export const CustomGroup: FC<ICustomGroupComponent> = ({
	group,
	depth,
	isOpen,
	groups,
	tasks,
	onClick,
	open,
	close,
	setGroups,
	setTasks
}) => {
	const indent = depth * TREE_X_OFFSET

	const handleToggle = (e: any) => {
		e.stopPropagation()
		onClick(group.id)
	}

	const { register, watch } = useForm<TypeCustomGroup>({
		defaultValues: {
			id: group.id,
			parent: group.parent,
			text: group.text
		}
	})

	useGroupListener({ watch, id: Number(group.id) })

	const { deleteGroup, isDeletePending } = useDeleteGroup()

	return (
		<div
			key={group.id}
			className={styles.group}
			style={{ marginInlineStart: indent }}
		>
			<div className={styles.groupHeading}>
				<span className='inline-flex items-center gap-2.5 w-full'>
					<button aria-describedby='item'>
						<GripVertical className={styles.grip} />
					</button>
					<TransparentInput
						className='capitalize'
						{...register('text')}
					/>
				</span>
				<div className='flex'>
					<div className='flex items-center gap-2.5'>
						<button
							onClick={() => {
								if (group.id) {
									open(group.id)
									addCustomTask({
										tasks,
										group_id: Number(group.id),
										setTasks
									})
								}
							}}
						>
							<ClipboardPlus size={20} />
						</button>
						<button
							onClick={() => {
								if (group.id) {
									open(group.id)
									AddCustomGroup({
										groups,
										parent: Number(group.id),
										setGroups
									})
								}
							}}
						>
							<FolderPlus size={20} />
						</button>
						<button
							onClick={() => {
								if (group.id) {
									close(group.id)
									deleteGroup(Number(group.id))
								} else setGroups(prev => prev?.slice(0, -1))
							}}
						>
							{isDeletePending ? <Loader size={20} /> : <Trash size={20} />}
						</button>
					</div>
					<button
						className='pl-2.5 pr-4'
						onClick={handleToggle}
					>
						{isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
					</button>
				</div>
			</div>
			{tasks &&
				tasks.length > 0 &&
				tasks.map(
					(task, index) =>
						task.group_id == group.id && (
							<div
								key={index}
								className={!isOpen ? 'hidden' : ''}
							>
								<CustomTask
									task={task}
									setTasks={setTasks}
									key={index}
								/>
							</div>
						)
				)}
		</div>
	)
}
