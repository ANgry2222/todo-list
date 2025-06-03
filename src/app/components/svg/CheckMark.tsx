export interface ICheckMarkProps {
	display: boolean;
}

export const CheckMark = ({ display }: { display: boolean }) => {
	if (display)
		return (
			<svg
				data-testid={"check-mark"}
				style={{ marginLeft: "4px", marginTop: "5px" }}
				width="15"
				height="12"
				viewBox="0 0 15 12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M5.56525 12H5.55074C5.34077 11.9958 5.1424 11.8925 5.00694 11.7183L0.168816 5.45741C-0.0885721 5.12558 -0.0469641 4.63202 0.261708 4.3555C0.569412 4.07897 1.02613 4.1228 1.28449 4.45567L5.58557 10.0216L13.7339 0.25881C14.0029 -0.0625805 14.4616 -0.0876242 14.7596 0.200375C15.0576 0.489418 15.0818 0.984025 14.8138 1.30646L6.10519 11.7412C5.96682 11.9061 5.77136 12 5.56525 12Z"
					fill="#0FAD51"
				/>
			</svg>
		);

	return null;
};

export default CheckMark;
