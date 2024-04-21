import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import ClearIcon from '@mui/icons-material/Clear'
import { useState } from 'react'
import { DayPicker, type SelectSingleEventHandler } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

import { useOutside } from '@/hooks/useOutside'

import './DatePicker.css'

dayjs.extend(LocalizedFormat)

interface IDatePicker {
	onChange: (value: string) => void
	value: string
}

export function DatePicker({ onChange, value }: IDatePicker) {
	const [selected, setSelected] = useState<Date>()
	const { isShow, setIsShow, ref } = useOutside(false)

	const handleDaySelect: SelectSingleEventHandler = date => {
		const ISOdate = date?.toISOString()

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
					<ClearIcon />
				</button>
			)}
			{isShow && (
				<div
					className='absolute p-2.5 slide bg-sidebar z-10 shadow rounded-lg -left-4'
					style={{
						top: 'calc(100% + .7rem)'
					}}
				>
					<DayPicker
						fromYear={2023}
						toYear={2025}
						initialFocus={isShow}
						mode='single'
						defaultMonth={selected}
						selected={selected}
						onSelect={handleDaySelect}
						weekStartsOn={1}
					/>
				</div>
			)}
		</div>
	)
}
