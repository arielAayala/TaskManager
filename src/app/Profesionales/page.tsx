import { Psicopedagogo } from "@/Types/Psicopedagogo";
import getPsicopedagogos from "@/services/getPsicopedagogos";
import Image from "next/image";
import React from "react";
import foto from "../../../public/perfilDefautl.png";
import Link from "next/link";
import style from "./profesionales.module.css";

async function Profesionales() {
	const psicopedagogosData = getPsicopedagogos();

	const psicopedagogos: Psicopedagogo[] = await psicopedagogosData;

	return (
		<div className={style.container}>
			<h1>Profesionales</h1>
			<div className={style.rowCard}>
				{psicopedagogos.map((i) => {
					return (
						<div
							className={style.card}
							key={i.idPsicopedagogo}
						>
							<Image
								className={style.image}
								width={200}
								height={200}
								alt="fotografia"
								src={i.fotoPsicopedagogo ? i.fotoPsicopedagogo : foto}
							></Image>
							<h3>
								{i.nombrePsicopedagogo.replace(
									/(^\w{1})|(\s+\w{1})/g,
									(letter: any) => letter.toUpperCase()
								)}
							</h3>
							<h4>
								Especialidad:{" "}
								{i.especialidadPsicopedagogo
									? i.especialidadPsicopedagogo
									: "No definidad"}
							</h4>
							<Link
								className={style.link}
								href={`/Profesionales/${i.idPsicopedagogo}`}
							>
								Ver Perfil
							</Link>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Profesionales;
