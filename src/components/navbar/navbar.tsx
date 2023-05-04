import Link from "next/link";
import React from "react";
import style from "./navbar.module.css";
import Logo from "../../../public/Logo.png";
import Image from "next/image";
import ButtonLogin from "../buttonLogin/buttonLogin";

function Navbar() {
	return (
		<header className={style.container}>
			<Link
				href="/"
				className={style.logo}
			>
				<Image
					height={50}
					width={50}
					src={Logo}
					alt="logo"
				></Image>
			</Link>
			<ul>
				<li>
					<Link
						href={"/Profesionales"}
						className={style.link}
					>
						Profesionales
					</Link>
				</li>
				<li>
					<Link
						href={"/tareas"}
						className={style.link}
					>
						Tareas
					</Link>
				</li>
				<ButtonLogin></ButtonLogin>
			</ul>
		</header>
	);
}

export default Navbar;
