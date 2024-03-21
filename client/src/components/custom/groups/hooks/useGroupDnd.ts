import { getDescendants } from '@minoru/react-dnd-treeview'
import { DropOptions } from '@minoru/react-dnd-treeview/dist/types'
import { Dispatch, SetStateAction } from 'react'

import { ICustomGroup, ICustomTask } from '@/types/tasks/custom/custom.types'

import { useUpdateGroup } from './useUpdateGroup'

const reorderArray = (
	array: ICustomGroup[],
	sourceIndex: number,
	targetIndex: number
) => {
	const newArray = [...array]
	const element = newArray.splice(sourceIndex, 1)[0]
	newArray.splice(targetIndex, 0, element)
	return newArray
}

interface IUseGroupDnd {
	groups: ICustomGroup[] | undefined
	setGroups: Dispatch<SetStateAction<ICustomGroup[] | undefined>>
}

export const useGroupDnd = ({ groups, setGroups }: IUseGroupDnd) => {
	const { updateGroup } = useUpdateGroup()

	const handleDrop = ({
		dragSourceId,
		dropTargetId,
		destinationIndex
	}: DropOptions<ICustomTask>) => {
		if (
			typeof dragSourceId === 'undefined' ||
			typeof dropTargetId === 'undefined' ||
			dropTargetId == dragSourceId
		)
			return

		const start = groups?.find(v => v.id === dragSourceId)
		const end = groups?.find(v => v.id === dropTargetId)

		if (!groups || !start || typeof destinationIndex !== 'number') return

		//sort inside
		if (start.parent === dropTargetId && groups.indexOf(start)) {
			setGroups((prev: any) =>
				reorderArray(prev, prev.indexOf(start), destinationIndex)
			)
		}

		if (start.parent !== dropTargetId) {
			if (
				getDescendants(groups, dragSourceId).find(
					el => el.id === dropTargetId
				) ||
				(end && !end.droppable)
			)
				return
			updateGroup({ id: dragSourceId, parent: dropTargetId, text: undefined })
		}
	}
	return { handleDrop }
}
