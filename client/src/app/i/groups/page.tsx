import { Metadata } from 'next'

import { Heading } from '@/components/ui/heading/Heading'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Task Groups',
	...NO_INDEX_PAGE
}

export default function DashboardPage() {
	return (
		<div>
			<Heading title='Task Groups' />
		</div>
	)
}
