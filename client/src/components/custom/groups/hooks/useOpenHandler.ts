import { TreeMethods } from '@minoru/react-dnd-treeview'
import React from 'react'

export const useTreeOpenHandler = () => {
	const ref = React.useRef<TreeMethods | null>(null)

	const [openIds, setOpenIds] = React.useState<(string | number)[]>([])

	const open = (id: number | string) => {
		ref.current?.open(id)
		setOpenIds(p => {
			return p.includes(id) ? p : [...p, id]
		})
	}

	const close = (id: number | string) => {
		ref.current?.close(id)
		setOpenIds(p => {
			return [...p.filter(v => v !== id)]
		})
	}

	const toggle = (id: number | string) => {
		openIds.includes(id) ? close(id) : open(id)
	}

	return { ref, toggle, close, open }
}
