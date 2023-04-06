import Link from "next/link";
import React, { useState } from "react";
import style from "./navbar.module.css";
import Logo from "../../../public/Logo.png";
import Image from "next/image";

function Navbar() {
	return (
		<header className={style.container}>
			<Link
				className={style.logo}
				href={"/"}
			>
				<Image
					height={50}
					width={50}
					src={Logo}
					alt="logo"
				></Image>
			</Link>
			<Link
				className={style.link}
				href={"/detalle"}
			>
				Detalle
			</Link>
			<Link
				className={style.link}
				href={"/tareas"}
			>
				Tareas
			</Link>
			<Link
				className={style.link + " " + style.ingresar}
				href={"/login"}
			>
				Ingresar
			</Link>
		</header>
	);
}

export default Navbar;
