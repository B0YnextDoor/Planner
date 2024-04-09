import cn from 'clsx'
import { Dispatch, SetStateAction } from 'react'

import { Loader } from '@/components/ui/loader/Loader'

import { IHabit } from '@/types/routine/routine.types'

import { TypeWidgetSwitcher } from '../WidgetSwitcher'

import { RoutineTemplate } from './RoutineTemplate'
import { useRoutineTemplates } from './hooks/useRoutineTemplates'
import { useUpdateTemplateHabits } from './hooks/useUpdateTemplateHabits'

interface ITemplateProps {
	items: IHabit[] | undefined
	time: number | undefined
	setType: Dispatch<SetStateAction<TypeWidgetSwitcher>>
}

export const RoutineTemplatesList = ({
	items,
	time,
	setType
}: ITemplateProps) => {
	const { templates, isLoading } = useRoutineTemplates()
	const { updateTemplate, isUpdatePending } = useUpdateTemplateHabits({
		items,
		time
	})
	if (isLoading) return <Loader size={20} />
	return (
		<div
			className={cn(
				'flex flex-col-reverse gap-2.5',
				!templates && 'items-center'
			)}
		>
			{templates && templates.length ? (
				templates.map((temp, key) => (
					<RoutineTemplate
						key={key}
						template_id={temp.template_id}
						name={temp.name}
						time={temp.time}
						setType={setType}
						updateTemplate={updateTemplate}
						isUpdatePending={isUpdatePending}
					/>
				))
			) : (
				<div>You haven't saved templates yet.</div>
			)}
		</div>
	)
}
