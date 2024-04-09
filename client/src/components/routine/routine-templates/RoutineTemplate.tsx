import { UseMutateFunction } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { HardDriveDownload, HardDriveUpload, Trash } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'

import { TransparentInput } from '@/components/ui/input/TransparentInput'
import { Loader } from '@/components/ui/loader/Loader'

import { IResponse } from '@/types/response/response.type'
import {
	IRoutineTemplate,
	IUpdateTemplateForm
} from '@/types/routine/routine.types'

import { TypeWidgetSwitcher } from '../WidgetSwitcher'

import styles from './RoutineTemplate.module.css'
import { useDeleteTemplate } from './hooks/useDeleteTemplate'
import { useLoadTemplate } from './hooks/useLoadTemplate'
import { useTemplateListener } from './hooks/useTemplateListener'

interface IRoutineTemplateProps extends IRoutineTemplate {
	setType: Dispatch<SetStateAction<TypeWidgetSwitcher>>
	updateTemplate: UseMutateFunction<
		AxiosResponse<IResponse, any> | undefined,
		Error,
		number,
		unknown
	>
	isUpdatePending: boolean
}

export const RoutineTemplate = ({
	template_id,
	name,
	time,
	setType,
	updateTemplate,
	isUpdatePending
}: IRoutineTemplateProps) => {
	const { register, watch } = useForm<IUpdateTemplateForm>({
		defaultValues: {
			name: name
		}
	})
	const { deleteTemplate, isDeletePending } = useDeleteTemplate()
	const { loadTemplate, isLoading } = useLoadTemplate(setType)
	useTemplateListener({ watch, id: template_id })
	return (
		<div className={styles.template}>
			<div className='flex flex-col gap-2'>
				<div>
					<label>Name:</label>
					<TransparentInput
						{...register('name')}
						className='p-2'
					/>
				</div>
				<div>
					<label>Spare-time:</label>
					<div>{time}</div>
				</div>
			</div>
			<div className='flex mr-4'>
				{!isDeletePending && !isLoading ? (
					<div className='flex items-center gap-2.5'>
						<button
							onClick={(e: any) => {
								e.preventDefault()
								loadTemplate(template_id)
							}}
							disabled={isLoading}
						>
							<HardDriveUpload size={20} />
						</button>
						<button
							onClick={(e: any) => {
								e.preventDefault()
								updateTemplate(template_id)
							}}
							disabled={isUpdatePending}
						>
							<HardDriveDownload size={20} />
						</button>
						<button
							onClick={(e: any) => {
								e.preventDefault()
								deleteTemplate(template_id)
							}}
							disabled={isDeletePending}
						>
							<Trash size={20} />
						</button>
					</div>
				) : (
					<Loader size={20} />
				)}
			</div>
		</div>
	)
}
