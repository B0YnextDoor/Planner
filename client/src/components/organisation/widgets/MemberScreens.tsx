import { Loader } from '@/components/ui/loader/Loader'

import { IOrganisationPage } from '@/types/organisation/organisation.types'

import { useLocalStorage } from '@/hooks/useLocalStorage'

import { TypeWidgetSwitcher, WidgetSwitcher } from './WidgetSwitcher'
import { OrganisationDashboard } from './dashboard/OrganisationDashboard'
import { OrganisationMembers } from './members/OrganisationMembers'
import { OrganisationTasksView } from './tasks/widgets/OrganisationTasksView'

export const MemberScreens = ({ organisation, user }: IOrganisationPage) => {
	const [type, setType, isLoading] = useLocalStorage<TypeWidgetSwitcher>({
		key: 'org-view-type',
		defaultValue: 'board'
	})
	if (isLoading) return <Loader size={20} />
	return (
		<div>
			<WidgetSwitcher
				type={type}
				setType={setType}
			/>
			{type == 'board' ? (
				<OrganisationDashboard
					organisation={organisation}
					user={user}
				/>
			) : type == 'membs' ? (
				<OrganisationMembers user={user} />
			) : (
				<OrganisationTasksView user={user} />
			)}
		</div>
	)
}
