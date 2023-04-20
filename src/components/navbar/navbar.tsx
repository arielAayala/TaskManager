import Link from "next/link";
import React, { useState } from "react";
import style from "./navbar.module.css";
import Logo from "../../../public/Logo.png";
import Image from "next/image";

function Navbar() {
	return (
		<header className={style.container}>
			<a href="/" className={style.logo}>
				<Image height={50} width={50} src={Logo} alt="logo"></Image>
			</a>
			<ul>
				<li>
					<Link href={"/detalle"} className={style.link}>
						Detalle
					</Link>
				</li>
				<li>
					<Link href={"/tareas"} className={style.link}>
						Tareas
					</Link>
				</li>
				<li>
					<Link href={"/login"} className={style.link + " " + style.ingresar}>
						Ingresar
					</Link>
				</li>
			</ul>
		</header>
	);
}

export default Navbar;
