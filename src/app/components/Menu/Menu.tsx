"use client";

import { useAppDispatch, useAppSelector } from "@/app/store/ReduxHooks";
import MenuButton from "../MenuButton/MenuButton";
import styles from "./Menu.module.scss";
import { clearCompletedTasks } from "@/app/store/slices/todoSlice";
import { setActiveButton } from "@/app/store/slices/menuButtonSlice";

export const Menu = () => {
	const todoData = useAppSelector((state) => state.todos.items);
	const activeButton = useAppSelector(
		(state) => state.menuButton.activeButton
	);
	const dispatch = useAppDispatch();
	const uncompletedItemsCount = todoData.filter(
		(item) => !item.isCompleted
	).length;

	const handleClearCompletedClick = () => {
		dispatch(clearCompletedTasks());
	};

	return (
		<div className={styles.menu_container}>
			<p className={styles.remaining_tasks_text}>
				{uncompletedItemsCount} item
				{`${uncompletedItemsCount === 1 ? "" : "s"}`} left
			</p>
			<div className={styles.nav_buttons_container}>
				<MenuButton
					onClick={() => dispatch(setActiveButton(1))}
					isActive={activeButton === 1}
					text="All"
				/>
				<MenuButton
					onClick={() => dispatch(setActiveButton(2))}
					isActive={activeButton === 2}
					text="Active"
				/>
				<MenuButton
					onClick={() => dispatch(setActiveButton(3))}
					isActive={activeButton === 3}
					text="Completed"
				/>
			</div>
			<div className={styles.clear_button__container}>
				<MenuButton
					style={{ marginLeft: "40px", height: "100%" }}
					text="Clear completed"
					onClick={handleClearCompletedClick}
				/>
			</div>
		</div>
	);
};

export default Menu;
