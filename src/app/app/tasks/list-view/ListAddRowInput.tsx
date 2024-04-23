import { type Dispatch, type SetStateAction } from 'react'

import { ITaskResponse } from '@/types/task.types'

import styles from '../TasksView.module.css'

interface IListAddRowInput {
	filterDate?: string
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export function ListAddRowInput({ setItems, filterDate }: IListAddRowInput) {
	const addRow = () => {
		setItems(prev => {
			if (!prev) return

			return [
				...prev,
				{
					id: '',
					name: '',
					isCompleted: false,
					createdAt: filterDate
				}
			]
		})
	}

	return (
		<div className={styles.addRow}>
			<button
				onClick={addRow}
				className={styles.addButton}
			>
				Add task...
			</button>
		</div>
	)
}
