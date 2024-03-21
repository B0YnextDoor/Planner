import { useQuery } from '@tanstack/react-query'

import { Loader } from '@/components/ui/loader/Loader'

import { statService } from '@/services/statistics/statistics.service'

export const UserStatistics = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['userstat'],
		queryFn: () => statService.userStat()
	})
	return isLoading ? (
		<Loader size={20} />
	) : (
		<div className='grid grid-cols-2 grid-rows-2 gap-12 mt-7 px-4'>
			{data ? (
				statLabels.map(statistic => (
					<div
						className='bg-border/10 rounded p-layout text-center hover:-translate-y-3 transition-transform duration-500'
						key={statistic}
					>
						<div className='text-xl'>{statistic}</div>
						<div className='text-3xl font-semibold'>
							{statistic == 'Active Tasks'
								? data.ammount_of_tasks
								: statistic == 'Finished Tasks'
									? data.finished_tasks
									: data.overdued_tasks}
						</div>
					</div>
				))
			) : (
				<div>Statistics not loaded!</div>
			)}
		</div>
	)
}

const statLabels = ['Active Tasks', 'Finished Tasks', 'Overdued Tasks']
