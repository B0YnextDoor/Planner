import { useQuery } from '@tanstack/react-query'

import { Loader } from '@/components/ui/loader/Loader'

import { userService } from '@/services/user/user.service'

export const Achievements = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['achieves'],
		queryFn: () => userService.getAchievements()
	})
	return isLoading ? (
		<Loader />
	) : (
		<div className='flex flex-col px-4'>
			<div className='text-xl mb-4 text-center'>Achievements</div>
			<div className='flex'>
				{data?.length ? (
					data.map((achieve, id) => (
						<div
							key={id}
							className='flex flex-col w-auto text-xs mb-2 bg-horizonPurple-700 rounded-xl p-5 hover:-translate-y-2 transition-transform duration-500'
						>
							{achieve.title}
							<span className='text-xs opacity-50 font-normal italic'>
								{achieve.description}
							</span>
						</div>
					))
				) : (
					<div>Achievements not loaded!</div>
				)}
			</div>
		</div>
	)
}
