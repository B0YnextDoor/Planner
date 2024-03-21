'use client'

import cn from 'clsx'
import { useEffect } from 'react'

import { useProfile } from '@/hooks/useProfile'

import { Loader } from '../ui/loader/Loader'

import { useOrganisation } from './hooks/useOrganisation'
import { MemberScreens } from './widgets/MemberScreens'
import { RecrutSrceen } from './widgets/RecrutScreen'

export const OrganisationPageDashboard = () => {
	const { data: userInfo, isLoading: profileLoading } = useProfile()
	const { organisation, isLoading } = useOrganisation()
	if (isLoading || profileLoading) return <Loader size={20} />
	return (
		<div className={cn(isLoading && 'justify-center')}>
			{organisation && userInfo && userInfo.organisation_role.length > 0 ? (
				<MemberScreens
					organisation={organisation}
					user={userInfo}
				/>
			) : (
				<RecrutSrceen />
			)}
		</div>
	)
}
