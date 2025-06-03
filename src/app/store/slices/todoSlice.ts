"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ITodoTask } from "@/app/components/TodoTask/TodoTask";
import { nanoid } from "nanoid";

export interface TodoSlice {
	items: Array<ITodoTask>;
}

export const todoInitialState: TodoSlice = {
	items: Array<ITodoTask>(),
};

export const TodoSlice = createSlice({
	name: "todos",
	initialState: todoInitialState,
	reducers: {
		addItem: (state, action: PayloadAction<string>) => {
			state.items.push({
				text: action.payload,
				isCompleted: false,
				id: nanoid(),
			});
		},
		changeItemStatus: (state, action: PayloadAction<string>) => {
			const item = state.items.find((item) => item.id === action.payload);
			if (!item) {
				return;
			}
			item.isCompleted = !item.isCompleted;
		},
		clearCompletedTasks: (state) => {
			state.items = state.items.filter((item) => !item.isCompleted);
		},
	},
});

export const { addItem, changeItemStatus, clearCompletedTasks } =
	TodoSlice.actions;
export const selectItems = (state: RootState) => state.todos.items;
export default TodoSlice.reducer;
