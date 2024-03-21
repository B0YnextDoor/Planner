import cn from 'clsx'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { X } from 'lucide-react'
import { useState } from 'react'
import { DayPicker, type SelectSingleEventHandler } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { toast } from 'sonner'

import { getCurrentDate } from '@/components/tasks/todo/utils/todo.find'

import { useOutside } from '@/hooks/useOutside'

import './DatePicker.module.css'
import { formatCaption } from './DatePickerCaption'

dayjs.extend(LocalizedFormat)

interface IDatePicker {
	onChange: (value: string) => void
	value: string
	position?: 'left' | 'right'
}

export const DatePicker = ({
	onChange,
	value,
	position = 'right'
}: IDatePicker) => {
	const [selected, setSelected] = useState<Date>()
	const { isShow, setIsShow, ref } = useOutside(false)

	const handleDaySelect: SelectSingleEventHandler = date => {
		const { currentDate } = getCurrentDate()
		if (dayjs(date) < currentDate) {
			toast.error("You can't add overdued task!")
			return
		}
		const ISOdate = dayjs(date).format()
		setSelected(date)
		if (ISOdate) {
			onChange(ISOdate)
			setIsShow(false)
		} else {
			onChange('')
		}
	}

	return (
		<div
			className='relative'
			ref={ref}
		>
			<button onClick={() => setIsShow(!isShow)}>
				{value ? dayjs(value).format('LL') : 'Click for select'}
			</button>
			{value && (
				<button
					className='absolute -top-2 -right-4 opacity-30 hover:opacity-100 transition-opacity'
					onClick={() => onChange('')}
				>
					<X size={14} />
				</button>
			)}
			{isShow && (
				<div
					className={cn(
						'absolute p-2.5 slide bg-sidebar z-10 shadow rounded-lg',
						position === 'left' ? '-left-4' : ' -right-4'
					)}
					style={{
						top: 'calc(100% + .7rem)'
					}}
				>
					<DayPicker
						fromYear={2024}
						toYear={2026}
						initialFocus={isShow}
						mode='single'
						defaultMonth={selected}
						selected={selected}
						onSelect={handleDaySelect}
						weekStartsOn={1}
						formatters={{ formatCaption }}
					/>
				</div>
			)}
		</div>
	)
}
