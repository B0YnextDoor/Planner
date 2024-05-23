import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/buttons/Button'
import { Input } from '@/components/ui/input/Input'

import { TypeUserForm } from '@/types/user/user.types'

import styles from '../Members.module.css'
import { useInviteMember } from '../hooks/useInviteMember'

export const InviteMember = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<TypeUserForm>({
		mode: 'onChange',
		defaultValues: {
			email: ''
		}
	})

	const { inviteUser, isPending } = useInviteMember(reset)

	const onSubmit: SubmitHandler<TypeUserForm> = data => inviteUser(data)
	return (
		<div className={styles.form}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					id='name'
					label='User email: '
					placeholder='Enter user email'
					type='email'
					{...register('email', {
						required: 'Email is required!',
						pattern: /\S+@\S+\.\S+/
					})}
					extra='mb-4'
				/>
				{errors?.email?.type === 'required' && (
					<span>{errors.email?.message}</span>
				)}
				{errors?.email?.type === 'pattern' && <span>Wrong email!</span>}
				<Button
					type='submit'
					disabled={isPending}
					className='w-50p self-center'
				>
					Invite
				</Button>
			</form>
		</div>
	)
}
