import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/buttons/Button'
import { Input } from '@/components/ui/input/Input'

import { TypeOrganisationForm } from '@/types/organisation/organisation.types'

import styles from './OrganisationForm.module.css'
import { useCreateOrganisation } from './useCreateOrganisation'

export const CreateOrganisationsForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<TypeOrganisationForm>({
		mode: 'onChange',
		defaultValues: {
			name: '',
			description: ''
		}
	})

	const { createOrganisation, isPending } = useCreateOrganisation()

	const onSubmit: SubmitHandler<TypeOrganisationForm> = data =>
		createOrganisation(data)

	return (
		<div className={styles.form}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					id='name'
					label='Name: '
					placeholder='Enter name'
					type='text'
					{...register('name', {
						required: 'Name is required!'
					})}
					extra='mb-4'
				/>
				{errors?.name?.type === 'required' && (
					<span>{errors.name?.message}</span>
				)}
				<Input
					{...register('description')}
					id='name'
					label='Description (optional): '
					placeholder='Enter description:'
					extra='mb-4'
				/>
				<Button
					type='submit'
					className='self-center w-50p'
					disabled={isPending}
				>
					Create
				</Button>
			</form>
		</div>
	)
}
