"use client";

import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import menuButtonReducer from "./slices/menuButtonSlice";

const loadState = () => {
	if (typeof window !== "undefined") {
		try {
			const serializedState = localStorage.getItem("todoData");
			if (serializedState === null) {
				return { items: [] };
			}
			const savedState = JSON.parse(serializedState);
			return savedState.todos || { items: [] };
		} catch (err) {
			console.error("Failed to load state:", err);
			return { items: [] };
		}
	}
};

const store = configureStore({
	reducer: {
		todos: todoReducer,
		menuButton: menuButtonReducer,
	},
	preloadedState: {
		todos: loadState(),
		menuButton: { activeButton: 1 },
	},
});

store.subscribe(() => {
	if (typeof window !== "undefined") {
		try {
			const state = store.getState();
			localStorage.setItem(
				"todoData",
				JSON.stringify({
					todos: state.todos,
					menuButton: state.menuButton,
				})
			);
		} catch (err) {
			console.error("Failed to save state:", err);
		}
	}
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
