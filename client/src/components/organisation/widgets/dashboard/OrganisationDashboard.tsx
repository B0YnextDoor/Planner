import { LogOut, Trash } from 'lucide-react'
import { useCallback, useEffect } from 'react'

import { Button } from '@/components/ui/buttons/Button'

import { IOrganisationPage } from '@/types/organisation/organisation.types'

import { useOrganisationTasks } from '../../hooks/useOrganisationTasks'
import { Notifications } from '../notifications/Notifications'

import { useDeleteOrganisation } from './hooks/useDeleteOrganisation'
import { useLeaveOrganisation } from './hooks/useLeaveOrganisation'
import { OrganisationInfo } from './info/OrganisationInfo'
import { OrganisationStatistics } from './statistics/OrganisationStatistics'

export const OrganisationDashboard = ({
	organisation,
	user
}: IOrganisationPage) => {
	const { leaveOrganisation, isPending } = useLeaveOrganisation()
	const { mutate, isDeletePending } = useDeleteOrganisation()
	useOrganisationTasks()
	return (
		<div className='grid grid-cols-2 gap-3 w-full'>
			<div className='flex flex-col w-full px-3 gap-10 relative'>
				<div className='flex flex-col gap-10 w-full'>
					<OrganisationInfo
						organisation={organisation}
						user={user}
					/>
					<OrganisationStatistics />
				</div>
				<div className='flex items-center gap-5'>
					<Button
						className='flex items-center gap-2.5 text-nowrap hover:bg-primary/40 border-2 active:border-brand-700'
						onClick={() => leaveOrganisation()}
						disabled={isPending}
					>
						<LogOut size={25} />
						Leave Organisation
					</Button>
					{user && user.organisation_role === 'head' && (
						<Button
							className='flex items-center gap-2.5 text-nowrap border-red-500 hover:bg-red-900/60 border-2 active:border-red-600'
							onClick={() => mutate()}
							disabled={isDeletePending}
						>
							<Trash size={25} />
							Delete Organisation
						</Button>
					)}
				</div>
			</div>
			<Notifications />
		</div>
	)
}
