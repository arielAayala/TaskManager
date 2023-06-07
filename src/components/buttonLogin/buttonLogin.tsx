"use client";
import { useEffect, useState } from "react";
import { useContextLogin } from "@/context/contextLogin";
import Image from "next/image";
import Link from "next/link";
import perfilDefault from "../../../public/perfilDefautl.png";
import style from "./buttonLogin.module.css";
import ButtonLogout from "../buttonLogout/buttonLogout";

export default function ButtonLogin() {
	const { idUsuario, idPsicopedagogo, fotoPsicopedagogo } = useContextLogin();

	const [hideDrop, setHideDrop] = useState(true);

	return (
		<div className={style.container}>
			{idUsuario < 1 ? (
				<li>
					<Link
						href={"/login"}
						className={style.link}
					>
						Ingresar
					</Link>
				</li>
			) : idUsuario == 1 ? (
				<li>
					<Link
						href={"/Admin/NuevoPsicopedagogo"}
						className={style.link}
					>
						Admin
					</Link>
				</li>
			) : (
				<button
					className={style.buttonFoto}
					onClick={() => {
						setHideDrop(!hideDrop);
					}}
				>
					{fotoPsicopedagogo ? (
						<img
							src={fotoPsicopedagogo}
							alt=""
							className={style.fotoPsicopedagogo}
						/>
					) : (
						<Image
							className={style.fotoPsicopedagogo}
							alt="perfil"
							width={50}
							height={50}
							src={perfilDefault}
						></Image>
					)}
				</button>
			)}
			{hideDrop || idUsuario <= 1 ? null : (
				<div className={style.dropbox}>
					<Link href={`/Profesionales/${idPsicopedagogo}`}>Ver perfil</Link>
					<ButtonLogout></ButtonLogout>
				</div>
			)}
		</div>
	);
}
