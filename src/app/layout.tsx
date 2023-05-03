import "./global.css";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import ProviderContextLogin from "@/context/contextLogin";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<ProviderContextLogin>
				<body>
					<Navbar></Navbar>
					<div className="containerChildrens">{children}</div>
					<Footer></Footer>
				</body>
			</ProviderContextLogin>
		</html>
	);
}
