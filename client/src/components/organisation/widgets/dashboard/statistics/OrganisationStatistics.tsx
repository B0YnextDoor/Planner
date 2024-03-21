import { Loader } from '@/components/ui/loader/Loader'

import { useOrganisationStatistics } from '../hooks/useOrganisationStatistics'

export const OrganisationStatistics = () => {
	const { statistics, isLoading } = useOrganisationStatistics()
	return isLoading ? (
		<Loader size={20} />
	) : (
		<div className='w-full grid grid-cols-2 gap-4 justify-center'>
			{statistics ? (
				statLabels.map(statistic => (
					<div
						className='bg-border/10 rounded p-layout text-center hover:-translate-y-3 transition-transform duration-500'
						key={statistic}
					>
						<div className='text-xl'>{statistic}</div>
						<div className='text-3xl font-semibold'>
							{statistic == 'Active Tasks'
								? statistics.ammount_of_tasks
								: statistics.finished_tasks}
						</div>
					</div>
				))
			) : (
				<div>Statistics not loaded!</div>
			)}
		</div>
	)
}

const statLabels = ['Active Tasks', 'Finished Tasks']
