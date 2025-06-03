"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface MenuButtonSlice {
	activeButton: number;
}

export const menuButtonInitialState: MenuButtonSlice = {
	activeButton: 1,
};

export const MenuButtonSlice = createSlice({
	name: "menuButton",
	initialState: menuButtonInitialState,
	reducers: {
		setActiveButton: (state, action: PayloadAction<number>) => {
			state.activeButton = action.payload;
		},
	},
});

export const { setActiveButton } = MenuButtonSlice.actions;
export const selectItems = (state: RootState) => state.menuButton;
export default MenuButtonSlice.reducer;
