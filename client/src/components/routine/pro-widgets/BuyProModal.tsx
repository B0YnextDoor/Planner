import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/buttons/Button'
import { Input } from '@/components/ui/input/Input'

import { IBuyPro } from '@/types/routine/routine.types'

import { useBuyPro } from '../hooks/useBuyPro'

export const BuyProModal = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<IBuyPro>({
		mode: 'onChange'
	})

	const { buyPro, isPending } = useBuyPro()

	const onSubmit: SubmitHandler<IBuyPro> = data => {
		buyPro(data)
		reset({ pro_code: '' })
	}

	return (
		<div className='flex w-1/2 justify-center'>
			<form
				className='flex flex-col w-2/4'
				onSubmit={handleSubmit(onSubmit)}
			>
				<Input
					id='pro code'
					label='Get PRO status: '
					placeholder='Enter PRO code'
					type='text'
					{...register('pro_code', {
						required: 'Code is required!'
					})}
					extra='mb-4'
				/>
				{errors?.pro_code?.type === 'required' && (
					<span className='mb-3'>{errors.pro_code?.message}</span>
				)}
				<Button
					type='submit'
					disabled={isPending}
				>
					Get PRO
				</Button>
			</form>
		</div>
	)
}
