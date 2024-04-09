import {
	Avatar,
	Box,
	Chip,
	Input,
	MenuItem,
	OutlinedInput
} from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import { IOrganisationMember } from '@/types/organisation/organisation.types'

interface IMultipleSelect {
	members: IOrganisationMember[]
	role: string
	executors: string | null | undefined
	onChange: (...event: any[]) => void
}

export const MultipleSelect = ({
	members,
	role,
	executors,
	onChange
}: IMultipleSelect) => {
	function handleChange({ target }: SelectChangeEvent<string[]>) {
		onChange(target.value.toString())
	}
	return (
		<Select
			sx={{
				padding: '10px',
				backgroundColor: '#212224',
				minWidth: '14rem',
				borderRadius: 1,
				'& .css-1vqw1p-MuiSelect-select-MuiInputBase-input-MuiInput-input.Mui-disabled':
					{
						opacity: 1,
						'-webkit-text-fill-color': 'rgba(255, 255, 255)'
					}
			}}
			disabled={role != 'head'}
			multiple={true}
			value={executors ? executors.split(',') : []}
			onChange={handleChange}
			input={
				<Input
					id='multiple-select'
					size='small'
				/>
			}
			renderValue={selected => (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						flexWrap: 'wrap',
						gap: 1
					}}
				>
					{selected.map(value => (
						<Chip
							key={value}
							label={
								<div className='flex flex-col'>
									<div>{members.filter(m => m.email == value)[0].name}</div>
									<div className='font-mono'>{value}</div>
								</div>
							}
							avatar={
								<Avatar>
									{members
										.filter(m => m.email == value)[0]
										.name.charAt(0)
										.toUpperCase() ?? 'A'}
								</Avatar>
							}
							color='secondary'
							sx={{
								display: 'flex',
								justifyContent: 'start',
								width: 'max-content',
								paddingY: 3
							}}
						/>
					))}
				</Box>
			)}
		>
			{members.map(member => (
				<MenuItem
					key={member.id}
					value={member.email}
					className='font-mono'
				>
					{member.email}
				</MenuItem>
			))}
		</Select>
	)
}
