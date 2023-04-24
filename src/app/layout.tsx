import "./global.css";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Navbar></Navbar>
				<div className="containerChildrens">{children}</div>
				<Footer></Footer>
			</body>
		</html>
	);
}
