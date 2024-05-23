'use client'

import { CirclePlus } from 'lucide-react'

import { Button } from '../ui/buttons/Button'

import { CustomGroups } from './groups/CustomGroups'
import { useCustomGroups } from './groups/hooks/useCustomGroups'
import { AddCustomGroup } from './utils/addCustomGroup'

export const CustomTasks = () => {
	const { groups, isLoading, setGroups } = useCustomGroups()
	return (
		<div className='w-full relative'>
			<CustomGroups
				groups={groups}
				isLoading={isLoading}
				setGroups={setGroups}
			/>
			<div
				className='absolute top-0 right-0'
				onClick={(e: any) => {
					e.preventDefault()
					AddCustomGroup({ groups, parent: -1, setGroups })
				}}
			>
				<Button className='flex gap-2 items-center justify-center'>
					<CirclePlus size={25} />
					Add Group
				</Button>
			</div>
		</div>
	)
}
