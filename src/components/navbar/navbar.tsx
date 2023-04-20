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
					<a href={"/detalle"} className={style.link}>
						Detalle
					</a>
				</li>
				<li>
					<a href={"/tareas"} className={style.link}>
						Tareas
					</a>
				</li>
				<li>
					<a href={"/login"} className={style.link + " " + style.ingresar}>
						Ingresar
					</a>
				</li>
			</ul>
		</header>
	);
}

export default Navbar;
