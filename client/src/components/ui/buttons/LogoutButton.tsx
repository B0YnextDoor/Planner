'use client'

import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { authService } from '@/services/auth/auth.service'

export function LogoutButton() {
	const router = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => router.push('/')
	})

	return (
		<div className='ml-1.5'>
			<button
				className='opacity-50 hover:opacity-100 transition-opacity duration-300'
				onClick={() => mutate()}
			>
				<LogOut size={20} />
			</button>
		</div>
	)
}
