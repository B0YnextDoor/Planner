import { Controller, SubmitHandler, useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/buttons/Button'
import { Input } from '@/components/ui/input/Input'
import { Select } from '@/components/ui/select/Select'

import { TypeHabitForm } from '@/types/routine/routine.types'

import { useCreateHabit } from '../hooks/useCreateHabit'
import { useUpdateHabit } from '../hooks/useUpdateHabit'

import styles from './HabitForm.module.css'
import { COLORS } from './form.data'

export const HabitForm = () => {
	const {
		register,
		control,
		watch,
		reset,
		handleSubmit,
		formState: { errors }
	} = useFormContext<TypeHabitForm>()

	const { updateHabit } = useUpdateHabit()
	const { createHabit, isPending } = useCreateHabit()

	const onSubmit: SubmitHandler<TypeHabitForm> = data => {
		const { id, color, ...rest } = data

		if (id) {
			updateHabit({
				id: id,
				...rest,
				color: color?.length ? color : COLORS[COLORS.length - 1]
			})
		} else {
			createHabit({
				...rest,
				color: color?.length ? color : COLORS[COLORS.length - 1]
			})
		}

		reset({
			color: COLORS[COLORS.length - 1],
			duration: 0,
			name: '',
			id: undefined
		})
	}

	return (
		<form
			className={styles.form}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Input
				{...register('name', {
					required: 'Description is required!'
				})}
				id='name'
				label='Description: '
				placeholder='Enter description:'
				extra='mb-4'
			/>
			{errors?.name?.type === 'required' && <span>{errors.name?.message}</span>}
			<Input
				{...register('duration', {
					required: 'Enter the number!',
					valueAsNumber: true,
					min: 5,
					max: 1440
				})}
				id='duration'
				label='Duration (min.):'
				placeholder='Enter duration:'
				isNumber
				extra='mb-4'
			/>
			{errors?.duration?.type === 'required' && (
				<span>{errors.duration.message}</span>
			)}
			{errors?.duration?.type === 'min' && <span>Min value is 5 minutes!</span>}
			{errors?.duration?.type === 'max' && (
				<span>Max value is 1440 minutes!</span>
			)}
			<div>
				<span className='inline-block mb-1.5 '>Color:</span>
				<Controller
					control={control}
					name='color'
					render={({ field: { value, onChange } }) => (
						<Select
							data={COLORS.map(item => ({
								value: item,
								label: item
							}))}
							onChange={onChange}
							value={value || COLORS[COLORS.length - 1]}
							isColorSelect={true}
						/>
					)}
				/>
			</div>

			<Button
				type='submit'
				disabled={isPending}
				className='mt-6'
			>
				{watch('id') ? 'Update' : 'Create'}
			</Button>
		</form>
	)
}
