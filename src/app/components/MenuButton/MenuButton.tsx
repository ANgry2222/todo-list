"use client";

import styles from "./MenuButton.module.scss";

export interface IMenuButtonProps {
	text: string;
	style?: React.CSSProperties;
	onClick?: () => void;
	isActive?: boolean;
	onFilterClick?: (buttonNumber: number) => void;
}

export const MenuButton = (props: IMenuButtonProps) => {
	return (
		<button
			onClick={props.onClick}
			style={props.style}
			className={`${styles.menu_button}${
				props.isActive ? " " + styles.active_state : ""
			}`}>
			{props.text}
		</button>
	);
};

export default MenuButton;
