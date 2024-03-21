'use client'

import { FormProvider, useForm } from 'react-hook-form'

import { TypeHabitForm } from '@/types/routine/routine.types'

import { HabitForm } from './form/HabitForm'
import { RoutineList } from './routine/RoutineList'

export const Routine = () => {
	const methods = useForm<TypeHabitForm>()

	return (
		<FormProvider {...methods}>
			<div className='grid grid-cols-2 gap-12'>
				<RoutineList />
				<HabitForm />
			</div>
		</FormProvider>
	)
}
