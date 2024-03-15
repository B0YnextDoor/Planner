import { SubmitHandler, useForm } from 'react-hook-form'

import { ISignInForm } from '@/types/auth/auth.types'

export const SignIn: React.FC<any> = ({ mutate, setLogin }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<ISignInForm>({
		mode: 'onChange'
	})
	const onSubmit: SubmitHandler<ISignInForm> = async data => {
		await mutate(data)
		reset()
	}
	return (
		<div className='form-container sign-in'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h1>Sign In</h1>
				<input
					type='email'
					placeholder='Email'
					{...register('email', {
						required: 'Email is required!',
						pattern: /\S+@\S+\.\S+/
					})}
				/>
				{errors?.email?.type === 'required' && (
					<span className='self-start'>{errors.email?.message}</span>
				)}
				<input
					type='password'
					placeholder='Password'
					{...register('password', {
						required: 'Password is required!',
						minLength: 8
					})}
				/>
				{errors?.password?.type === 'required' && (
					<span className='self-start'>{errors.password?.message}</span>
				)}
				<button
					onClick={() => {
						setLogin(true)
					}}
				>
					Sign In
				</button>
			</form>
		</div>
	)
}
