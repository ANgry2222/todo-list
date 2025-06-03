import { useAppDispatch } from "@/app/store/ReduxHooks";
import CheckMark from "../svg/CheckMark";
import styles from "./TodoTask.module.scss";
import { changeItemStatus } from "@/app/store/slices/todoSlice";

export interface ITodoTask {
	text: string;
	isCompleted: boolean;
	id: string;
}

export const TodoTask = (props: ITodoTask) => {
	const dispatch = useAppDispatch();

	const handleCheckClick = () => {
		dispatch(changeItemStatus(props.id));
	};

	return (
		<div
			className={`${styles.task_container}${
				props.isCompleted ? " " + styles.completed_task : ""
			}`}>
			<div
				onClick={handleCheckClick}
				className={styles.check_mark_circle}>
				<CheckMark display={props.isCompleted} />
			</div>
			<p className={styles.task_text}>{props.text}</p>
		</div>
	);
};

export default TodoTask;
