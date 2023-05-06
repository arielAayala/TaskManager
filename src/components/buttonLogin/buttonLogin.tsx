"use client";
import { useState } from "react";
import { useContextLogin } from "@/context/contextLogin";
import Image from "next/image";
import Link from "next/link";
import perfilDefault from "../../../public/perfilDefautl.png";
import style from "./buttonLogin.module.css";

export default function ButtonLogin() {
	const { idUsuario, idPsicopedagogo, fotoPsicopedagogo } = useContextLogin();

	return (
		<div className={style.container}>
			{idUsuario == -1 ? (
				<li>
					<Link
						href={"/login"}
						className={style.link}
					>
						Ingresar
					</Link>
				</li>
			) : (
				<Link
					className={style.link}
					href={`/Profesionales/${idPsicopedagogo}`}
				>
					<Image
						className={style.fotoPsicopedagogo}
						alt="perfil"
						width={50}
						height={50}
						src={/* fotoPsicopedagogo ? fotoPsicopedagogo :  */ perfilDefault}
					></Image>
				</Link>
			)}
		</div>
	);
}
