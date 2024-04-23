import { DragIndicator, Sync, Delete } from '@mui/icons-material'
import type { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'

import Checkbox from '@mui/material/Checkbox'
import { TransparentField } from '@/components/ui/task-edit/TransparentField'
import { SingleSelect } from '@/components/ui/task-edit/SingleSelect'
import { DatePicker } from '@/components/ui/task-edit/date-picker/DatePicker'

import type { ITaskResponse, TypeTaskFormState } from '@/types/task.types'

import { useDeleteTask } from '../hooks/useDeleteTask'
import { useTaskDebounce } from '../hooks/useTaskDebounce'

import styles from '../TasksView.module.css'

interface IListRow {
	item: ITaskResponse
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}


export function ListRow({ item, setItems }: IListRow) {
	const { register, control, watch } = useForm<TypeTaskFormState>({
		defaultValues: {
			name: item.name,
			isCompleted: item.isCompleted,
			createdAt: item.createdAt,
			priority: item.priority
		}
	})

	useTaskDebounce({ watch, itemId: item.id })

	const { deleteTask, isDeletePending } = useDeleteTask()

	const isCompletedClass = watch('isCompleted') ? styles.completed : '';

	return (
		<div
			className={`${styles.row} ${isCompletedClass} animation-opacity`}
		>
			<div>
				<span className={styles.itemRow}>
					<button aria-describedby='todo-item'>
						<DragIndicator className={styles.grip} />
					</button>

					<Controller
						control={control}
						name='isCompleted'
						render={({ field: { value, onChange } }) => (
							<Checkbox
								onChange={onChange}
								checked={value}
								sx={{ color: 'gray' }}
							/>
						)}
					/>

					<TransparentField {...register('name')} />
				</span>
			</div>
			<div>
				<Controller
					control={control}
					name='createdAt'
					render={({ field: { value, onChange } }) => (
						<DatePicker
							onChange={onChange}
							value={value || ''}
						/>
					)}
				/>
			</div>
			<div className='capitalize'>
				<Controller
					control={control}
					name='priority'
					render={({ field: { value, onChange } }) => (
						<SingleSelect
							data={['high', 'medium', 'low'].map(item => ({
								value: item,
								label: item
							}))}
							onChange={onChange}
							value={value || ''}
						/>
					)}
				/>
			</div>
			<div>
				<button
					onClick={() =>
						item.id ? deleteTask(item.id) : setItems(prev => prev?.slice(0, -1))
					}
					className={styles.deleteButton}
				>
					{isDeletePending ? <Sync /> : <Delete />}
				</button>
			</div>
		</div>
	)
}
