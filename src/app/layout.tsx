import Navbar from "@/components/navbar/navbar";
import "./global.css";
import Fotter from "@/components/footer/footer";

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
				<Fotter></Fotter>
			</body>
		</html>
	);
}
