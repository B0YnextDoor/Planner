import { SubmitHandler, useForm } from 'react-hook-form'

import { ISignUpForm } from '@/types/auth/auth.types'

export const SignUp: React.FC<any> = ({ mutate, setLogin }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<ISignUpForm>({
		mode: 'onChange'
	})
	const onSubmit: SubmitHandler<ISignUpForm> = async data => {
		await mutate(data)
		reset()
	}
	return (
		<div className='form-container sign-up'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h1>Create Account</h1>
				<input
					type='text'
					placeholder='Name'
					{...register('name', {
						required: 'Name is required!'
					})}
				/>
				{errors?.name?.type === 'required' && (
					<span className='self-start'>{errors.name?.message}</span>
				)}
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
				<button onClick={() => setLogin(false)}>Sign Up</button>
			</form>
		</div>
	)
}
