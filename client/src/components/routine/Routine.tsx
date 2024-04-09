'use client'

import { FormProvider, useForm } from 'react-hook-form'

import { TypeHabitForm } from '@/types/routine/routine.types'

import { useLocalStorage } from '@/hooks/useLocalStorage'

import { Loader } from '../ui/loader/Loader'

import { TypeWidgetSwitcher, WidgetSwitcher } from './WidgetSwitcher'
import { HabitForm } from './form/HabitForm'
import { useRoutine } from './hooks/useRoutine'
import { RoutineTemplatesList } from './routine-templates/RoutineTemplatesList'
import { RoutineList } from './routine/RoutineList'

export const Routine = () => {
	const methods = useForm<TypeHabitForm>({ defaultValues: { duration: 0 } })
	const { items, time, setItems, isLoading: isItemsLoading } = useRoutine()
	const [type, setType, isLoading] = useLocalStorage<TypeWidgetSwitcher>({
		key: 'routine-view-type',
		defaultValue: 'routine'
	})
	// if (isLoading) return <Loader size={20} />
	return (
		<div>
			<WidgetSwitcher
				type={type}
				setType={setType}
			/>
			{type == 'routine' ? (
				<FormProvider {...methods}>
					<div className='grid grid-cols-2 gap-12'>
						<RoutineList
							items={items}
							time={time}
							setItems={setItems}
						/>
						<HabitForm />
					</div>
				</FormProvider>
			) : (
				<RoutineTemplatesList
					items={items}
					time={time}
					setType={setType}
				/>
			)}
		</div>
	)
}
