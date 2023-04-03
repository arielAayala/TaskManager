import Navbar from "@/components/navbar/navbar";
import "./global.css";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Navbar></Navbar>
				{children}
			</body>
		</html>
	);
}
