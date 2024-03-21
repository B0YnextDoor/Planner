import { useForm } from 'react-hook-form'

import { TransparentInput } from '@/components/ui/input/TransparentInput'

import {
	IOrganisationPage,
	TypeOrganisationForm
} from '@/types/organisation/organisation.types'

import styles from '../../Organisation.module.css'
import { useOrganisationListener } from '../hooks/useOrganisationListener'

export const OrganisationInfo = ({ organisation, user }: IOrganisationPage) => {
	const { register, watch } = useForm<TypeOrganisationForm>({
		defaultValues: {
			name: organisation?.name,
			description: organisation?.description
		}
	})

	useOrganisationListener({ watch, name: organisation?.name })
	return (
		<div className={styles.info}>
			<div>
				<label>Name:</label>
				<TransparentInput
					className='p-2 max-w-[50%]'
					{...register('name')}
					disabled={user?.organisation_role == 'memb'}
				/>
			</div>
			<div>
				<label>Description:</label>
				<textarea
					className='text-xs bg-transparent border-none focus:outline-0 focus:shadow-transparent p-2 resize-none w-full'
					disabled={user?.organisation_role == 'memb'}
					rows={5}
					{...register('description')}
				/>
			</div>
		</div>
	)
}
