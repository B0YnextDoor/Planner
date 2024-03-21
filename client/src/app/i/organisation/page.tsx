import { Metadata } from 'next'

import { OrganisationPageDashboard } from '@/components/organisation/OrganisationPage'
import { Heading } from '@/components/ui/heading/Heading'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Organisation',
	...NO_INDEX_PAGE
}

export default function OrganisationPage() {
	return (
		<div>
			<Heading title='Organisation' />
			<OrganisationPageDashboard />
		</div>
	)
}
