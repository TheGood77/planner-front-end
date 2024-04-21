import Typography from "@mui/material/Typography";
import { TasksView } from "./TasksView";

export default function TasksPage() {
    return (
		<div>
            <Typography variant='h3'>
                Tasks
            </Typography>
			<TasksView />
		</div>
	)
}