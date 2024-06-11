import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { organisationService } from '@/services/organisation/organisation.service'

export const useDeleteMember = () => {
	const queryClient = useQueryClient()

	const { mutate: deleteMember, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete member'],
		mutationFn: (id: number) => organisationService.deleteUser(id),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['members'] })
			queryClient.invalidateQueries({ queryKey: ['organisation-tasks'] })
			toast.success('Member deleted!')
		}
	})

	return { deleteMember, isDeletePending }
}
