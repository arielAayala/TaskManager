import "./global.css";
import Link from 'next/link';
import Head from 'next/head';
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
				<Head>
				<title> Setic </title>
				<meta name="description" content="Generate by create next app"></meta>
				<Link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
				</Head>
			<body>
				<Navbar></Navbar>
				<div className="containerChildrens">{children}</div>
				<Footer></Footer>
			</body>
		</html>
	);
}
