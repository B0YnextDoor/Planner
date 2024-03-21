import { Loader } from '@/components/ui/loader/Loader'

import { IUserProfile } from '@/types/user/user.types'

import { useGroupMembers } from '../../hooks/useGroupMembers'

import { Member } from './Member'
import { InviteMember } from './form/InviteMember'

export const OrganisationMembers = ({
	user
}: {
	user: IUserProfile | undefined
}) => {
	const { members, isLoading } = useGroupMembers()
	if (isLoading) return <Loader size={20} />
	return (
		<div className='flex p-3 gap-2.5 w-full'>
			{members && members.length > 0 && (
				<div className='flex flex-col gap-2.5 w-1/2'>
					{members.map((member, index) => (
						<Member
							key={index}
							member={member}
							user={user}
							style={user?.email == member.email ? 'text-primary' : ''}
						/>
					))}
				</div>
			)}
			{user && user.organisation_role == 'head' && <InviteMember />}
		</div>
	)
}
