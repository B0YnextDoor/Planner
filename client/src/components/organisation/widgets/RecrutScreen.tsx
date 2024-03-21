import { CreateOrganisationsForm } from './form/CreateOrganisationForm'
import { Notifications } from './notifications/Notifications'

export const RecrutSrceen = () => {
	return (
		<div className='flex flex-row gap-2.5'>
			<CreateOrganisationsForm />
			<Notifications />
		</div>
	)
}
