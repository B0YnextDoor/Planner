'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { ICustomGroup } from '@/types/tasks/custom/custom.types'

import { groupService } from '@/services/groups/group.service'

export const useCustomGroups = () => {
	const { data, isSuccess, isLoading } = useQuery({
		queryKey: ['custom-groups'],
		queryFn: () => groupService.getCustomGroups(),
		retry: 0
	})

	const [groups, setGroups] = useState<ICustomGroup[] | undefined>(data?.data)

	useEffect(() => {
		setGroups(data?.data)
	}, [data?.data, isSuccess, isLoading])

	return { groups, setGroups, isLoading }
}
