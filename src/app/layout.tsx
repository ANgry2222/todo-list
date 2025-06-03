import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./providers/ReduxProvider";

const montserrat = Montserrat({
	subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
	title: "ToDo List",
	description: "",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={montserrat.className}>
				<ReduxProvider>{children}</ReduxProvider>
			</body>
		</html>
	);
}
