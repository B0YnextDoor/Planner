'use client'

import { Crown } from 'lucide-react'

import { LogoutButton } from '@/components/ui/buttons/LogoutButton'
import { Loader } from '@/components/ui/loader/Loader'

import { useProfile } from '@/hooks/useProfile'

export const Header = () => {
	const { data, isLoading } = useProfile()

	return (
		<header>
			<div className='absolute top-big-layout right-big-layout'>
				{isLoading ? (
					<Loader size={20} />
				) : (
					<div className='flex items-center'>
						{data?.is_pro && <Crown color='gold' />}
						<div className='text-right mr-3 ml-3'>
							<p className='font-bold -mb-1'>{data?.name}</p>
							<p className='text-sm opacity-40'>{data?.email}</p>
						</div>

						<div className='w-10 h-10 flex justify-center items-center text-2xl text-white bg-white/20 rounded uppercase'>
							{data?.name.charAt(0) || 'A'}
						</div>
						<LogoutButton />
					</div>
				)}
			</div>
		</header>
	)
}
