"use client";

import { useAppSelector } from "@/app/store/ReduxHooks";
import styles from "./TaskList.module.scss";
import TodoTask from "../TodoTask/TodoTask";

export const TaskList = () => {
	const todoData = useAppSelector((state) => state.todos.items);
	const activeButton = useAppSelector((state) => {
		return state.menuButton.activeButton;
	});

	const filteredTodos = todoData.filter((item) => {
		switch (activeButton) {
			case 1:
				return true;
			case 2:
				return !item.isCompleted;
			case 3:
				return item.isCompleted;
			default:
				return true;
		}
	});

	if (todoData.length === 0) {
		return (
			<div
				data-testid={"task-list-placeholder"}
				className={styles.empty_list_placeholder}>
				No tasks added yet
			</div>
		);
	} else {
		return (
			<div data-testid={"task-list"} className={styles.list_container}>
				{filteredTodos.map((item, index) => (
					<TodoTask key={index} {...item} />
				))}
			</div>
		);
	}
};

export default TaskList;
