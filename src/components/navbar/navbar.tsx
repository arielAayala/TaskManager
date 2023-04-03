import Link from "next/link";
import React from "react";
import style from "./navbar.module.css";
import Logo from "../../../public/Logo.png";
import Image from "next/image";

function Navbar() {
	return (
		<div className={style.container}>
			<Link
				className={style.link}
				href={"/"}
			>
				<Image
					className={style.image}
					src={Logo}
					alt="logo"
					width={100}
					height={100}
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
		</div>
	);
}

export default Navbar;
