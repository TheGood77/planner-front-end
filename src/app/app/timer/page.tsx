import Typography from '@mui/material/Typography'
import { Pomodoro } from './Pomodoro'

export default function PomodoroPage() {
	return (
		<div>
            <Typography variant='h3'>
                Pomodoro
            </Typography>
			<Pomodoro />
		</div>
	)
}