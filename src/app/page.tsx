"use client";

import { useEffect, useState } from "react";
import TodoContainer from "./components/TodoContainer/TodoContainer";
import styles from "./page.module.scss";
import { useAppSelector } from "./store/ReduxHooks";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

export default function Home() {
	const todoData = useAppSelector((state) => state.todos.items);
	const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
	console.log(todoData);

	useEffect(() => {
		setIsDataLoaded(true);
	}, []);

	return (
		<>
			<div className={styles.root}>
				<h1 className={styles.header}>todos</h1>
				{isDataLoaded ? (
					<TodoContainer />
				) : (
					<div className={styles.loading_data_placeholder}>
						<LoadingSpinner />
						<p>Loading data</p>
					</div>
				)}
			</div>
		</>
	);
}
