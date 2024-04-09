'use client'

import cn from 'clsx'
import { SubmitHandler, useForm } from 'react-hook-form'

import { IUserSettings } from '@/types/settings/settings.types'

import { BuyProModal } from '../routine/pro-widgets/BuyProModal'
import { Button } from '../ui/buttons/Button'
import { Input } from '../ui/input/Input'
import { Loader } from '../ui/loader/Loader'

import styles from './UserSettings.module.css'
import { useInitialData } from './hooks/useInitialData'
import { useUpdateSettings } from './hooks/useUpdateSettings'

export const UserSettings = () => {
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<IUserSettings>({
		mode: 'onChange'
	})

	const { isLoading, isPro } = useInitialData(reset)

	const { isPending, mutate } = useUpdateSettings()

	const onSubmit: SubmitHandler<IUserSettings> = data => {
		const { password, ...rest } = data
		mutate({
			...rest,
			password: password ? password : null
		})
	}

	return (
		<div className={cn(styles.container, isLoading && 'justify-center')}>
			{isLoading ? (
				<Loader size={20} />
			) : (
				<div>
					<form
						className='w-1/2'
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className='grid grid-cols-2 gap-10'>
							<div>
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
									id='email'
									label='Email: '
									placeholder='Enter email'
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
								{errors?.email?.type === 'pattern' && (
									<span>Wrong email pattern</span>
								)}
								<Input
									id='password'
									label='Password: '
									placeholder='Enter password'
									type='password'
									{...register('password', {
										minLength: 8,
										pattern: /^(?=.*[A-Z])(?=.*\d).+$/
									})}
									extra={errors?.password ? 'mb-4' : 'mb-10'}
								/>
								{errors?.password?.type === 'minLength' && (
									<span>Min password length is 8!</span>
								)}
								{errors?.password?.type === 'pattern' && (
									<div className='flex flex-col gap-1 mb-2'>
										{!/\d/.test(watch('password') ?? '') && (
											<span>Password must contain at least 1 digit</span>
										)}
										{!/[A-Z]/.test(watch('password') ?? '') && (
											<span>Password must contain at least 1 upper letter</span>
										)}
									</div>
								)}
							</div>

							<div>
								<Input
									id='workInterval'
									label='Work interval (min.): '
									placeholder='Enter work interval'
									isNumber
									{...register('work_interval', {
										required: 'Enter the number!',
										min: 30,
										max: 480,
										valueAsNumber: true
									})}
									extra='mb-4'
								/>
								{errors?.work_interval?.type === 'required' && (
									<span>{errors.work_interval?.message}</span>
								)}
								{errors?.work_interval?.type === 'max' && (
									<span>Max value is 480 minutes!</span>
								)}
								{errors?.work_interval?.type === 'min' && (
									<span>Min value is 30 minutes!</span>
								)}
								<Input
									id='restInterval'
									label='Rest interval (min.): '
									placeholder='Enter rest interval'
									isNumber
									{...register('rest_interval', {
										required: 'Enter the number!',
										min: 8,
										max: 60,
										valueAsNumber: true
									})}
									extra='mb-4'
								/>
								{errors?.rest_interval?.type === 'required' && (
									<span>{errors.rest_interval?.message}</span>
								)}
								{errors?.rest_interval?.type === 'max' && (
									<span>Max value is 60 minutes!</span>
								)}
								{errors?.rest_interval?.type === 'min' && (
									<span>Min value is 8 minutes!</span>
								)}
								<Input
									id='lapsCount'
									label='Laps ammount (max 10): '
									placeholder='Enter laps ammount'
									isNumber
									{...register('laps_ammount', {
										required: 'Enter the number!',
										min: 1,
										max: 10,
										valueAsNumber: true
									})}
									extra='mb-6'
								/>
								{errors?.laps_ammount?.type === 'required' && (
									<span>{errors.laps_ammount?.message}</span>
								)}
								{errors?.laps_ammount?.type === 'max' && (
									<span>Max value is 10 laps!</span>
								)}
								{errors?.laps_ammount?.type === 'min' && (
									<span>Min value is 1 lap!</span>
								)}
							</div>
						</div>

						<Button
							type='submit'
							disabled={isPending}
						>
							Save
						</Button>
					</form>
					{!isPro && <BuyProModal />}
				</div>
			)}
		</div>
	)
}
