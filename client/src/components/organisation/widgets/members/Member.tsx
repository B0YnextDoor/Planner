import { Trash } from 'lucide-react'

import { Loader } from '@/components/ui/loader/Loader'

import { IOrganisationMember } from '@/types/organisation/organisation.types'
import { IUserProfile } from '@/types/user/user.types'

import styles from './Members.module.css'
import { useDeleteMember } from './hooks/useDeleteMember'

interface IGroupMember {
	member: IOrganisationMember
	user: IUserProfile | undefined
	style: string
}

export const Member = ({ member, user, style }: IGroupMember) => {
	const { deleteMember, isDeletePending } = useDeleteMember()
	return (
		<div className={styles.member}>
			{member?.role == 'head' && (
				<div className='absolute top-0 right-3 text-xs text-primary'>head</div>
			)}
			<div className='flex flex-col gap-1'>
				<div className={style}>{member.name}</div>
				<div className={style}>{member.email}</div>
			</div>
			{user?.organisation_role == 'head' && member.email != user?.email && (
				<button
					className='opacity-50 transition-opacity hover:opacity-100'
					onClick={() => deleteMember(member.id)}
				>
					{isDeletePending ? <Loader size={15} /> : <Trash size={15} />}
				</button>
			)}
		</div>
	)
}
