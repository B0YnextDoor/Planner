import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypeUserForm } from '@/types/user/user.types'

import { organisationService } from '@/services/organisation/organisation.service'

export const useInviteMember = () => {
	const { mutate: inviteUser, isPending } = useMutation({
		mutationKey: ['invite member'],
		mutationFn: (data: TypeUserForm) => organisationService.inviteUser(data),
		onSuccess() {
			toast.success('Invitation sent!')
		},
		onError(error: any) {
			if (error?.response?.status == 422)
				toast.error(error?.response?.data?.detail)
		}
	})

	return { inviteUser, isPending }
}
