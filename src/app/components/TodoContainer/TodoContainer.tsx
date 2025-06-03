"use client";

import { addItem } from "@/app/store/slices/todoSlice";
import Menu from "../Menu/Menu";
import TaskList from "../TaskList/TaskList";
import styles from "./TodoContainer.module.scss";
import { useAppDispatch } from "@/app/store/ReduxHooks";
import { useRef } from "react";

export const TodoContainer = () => {
	const dispatch = useAppDispatch();
	const inputRef = useRef<HTMLInputElement>(null);

	const onTodoSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (inputRef.current && inputRef.current.value) {
			dispatch(addItem(inputRef.current.value));
			inputRef.current.value = "";
		}
	};

	return (
		<div className={styles.todo_container}>
			<form onSubmit={(event: React.FormEvent) => onTodoSubmit(event)}>
				<input
					ref={inputRef}
					className={styles.todo_input_field}
					type="text"
					placeholder="What needs to be done?"></input>
			</form>
			<TaskList />
			<Menu />
		</div>
	);
};

export default TodoContainer;
