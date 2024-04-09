import cn from 'clsx'
import { X } from 'lucide-react'

import { useOutside } from '@/hooks/useOutside'

import { Badge } from './Badge'

export interface IOption {
	label: string
	value: string
}

interface ISingleSelect {
	data: IOption[]
	onChange: (value: string) => void
	value: string
	view?: boolean
	isColorSelect?: boolean
	disabled?: boolean
}

export const Select = ({
	data,
	onChange,
	value,
	view,
	disabled,
	isColorSelect
}: ISingleSelect) => {
	const { isShow, setIsShow, ref } = useOutside(false)
	const getValue = () => data.find(item => item.value === value)?.value
	return (
		<div
			className={cn(
				'relative min-w-36',
				isColorSelect && 'w-40',
				disabled && 'cursor-default'
			)}
			ref={ref}
		>
			<button
				onClick={e => {
					e.preventDefault()
					if (!disabled) setIsShow(!isShow)
				}}
			>
				{getValue() ? (
					<Badge
						variant={value}
						className='capitalize'
						style={isColorSelect ? { backgroundColor: value } : {}}
					>
						{getValue()}
					</Badge>
				) : (
					<Badge>Click for select</Badge>
				)}
			</button>
			{isShow && (
				<div
					className={cn(
						'absolute left-0 slide bg-sidebar z-10 shadow rounded-lg',
						!view
							? 'w-full p-2.5 overflow-auto'
							: 'flex gap-1 items-center w-max p-2'
					)}
					style={{
						top: !view ? 'calc(100% + .5rem)' : '-30%'
					}}
				>
					{data.map(item => (
						<button
							key={item.value}
							onClick={e => {
								e.preventDefault()
								onChange(item.value)
								setIsShow(false)
							}}
							className={cn(
								'block last:mb-0 capitalize rounded-lg',
								!view && 'mb-4'
							)}
							style={
								isColorSelect
									? {
											backgroundColor: item.value
										}
									: {}
							}
						>
							<Badge variant={item.value}>{item.label}</Badge>
						</button>
					))}
				</div>
			)}
			{value && (
				<button
					className='absolute top-0 right-0 opacity-30 hover:opacity-100 transition-opacity'
					onClick={e => {
						e.preventDefault()
						onChange('')
					}}
				>
					<X size={14} />
				</button>
			)}
		</div>
	)
}
