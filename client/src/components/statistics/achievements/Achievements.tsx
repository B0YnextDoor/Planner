import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { Loader } from '@/components/ui/loader/Loader'

import { IUserAchievement } from '@/types/achievement/achievement.types'

import { userService } from '@/services/user/user.service'

export const Achievements = () => {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['achieves'],
		queryFn: () => userService.getAchievements()
	})
	const [achievements, setAchievements] = useState<
		IUserAchievement[] | undefined
	>(data)
	useEffect(() => {
		setAchievements(data)
	}, [data, isLoading, isSuccess])
	return isLoading || !data ? (
		<Loader size={20} />
	) : (
		<div className='flex flex-col px-4'>
			<div className='text-xl mb-4 text-center'>Achievements</div>
			<div className='grid grid-cols-3'>
				{achievements ? (
					achievements.map((achieve, id) => (
						<div
							key={id}
							className='flex flex-col w-auto text-xs mb-2 mr-2 bg-horizonPurple-700 rounded-xl p-5 hover:-translate-y-1 transition-transform duration-500'
						>
							{achieve.title}
							<span className='text-xs opacity-50 font-normal italic'>
								{achieve.description}
							</span>
						</div>
					))
				) : (
					<div>You have no achievements yet</div>
				)}
			</div>
		</div>
	)
}
