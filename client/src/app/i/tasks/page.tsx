import { Metadata } from 'next'

import { Tasks } from '@/components/tasks/Tasks'
import { Heading } from '@/components/ui/heading/Heading'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Tasks',
	...NO_INDEX_PAGE
}

export default function DashboardPage() {
	return (
		<div>
			<Heading title='Tasks' />
			<Tasks />
		</div>
	)
}
