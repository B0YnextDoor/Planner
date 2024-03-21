import { Loader as LoaderIcon } from 'lucide-react'

export const Loader = ({ size }: { size: number }) => {
	return (
		<div className='flex justify-center items-center'>
			<LoaderIcon
				className={`animate-spin text-white w-[${size}] h-[${size}]`}
			/>
		</div>
	)
}
