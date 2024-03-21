import { Dispatch, SetStateAction } from 'react'

import { ICustomGroup } from '@/types/tasks/custom/custom.types'

interface IAddGroupInput {
	groups: ICustomGroup[] | undefined
	parent: number
	setGroups: Dispatch<SetStateAction<ICustomGroup[] | undefined>>
}

export const AddCustomGroup = ({
	groups,
	parent,
	setGroups
}: IAddGroupInput) => {
	if (groups?.find(group => !group.id)) return
	setGroups((prev: any) => {
		return [
			...prev,
			{
				id: null,
				parent: parent,
				text: '',
				droppable: true
			}
		]
	})
}
