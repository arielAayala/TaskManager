"use client";
import { IPsicopedagogo } from "@/Types/IPsicopedagogo";
import getPsicopedagogos from "@/services/getPsicopedagogos";
import Image from "next/image";
import React, { useState } from "react";
import foto from "../../../public/perfilDefautl.png";
import Link from "next/link";
import style from "./profesionales.module.css";

function Profesionales() {
	const [psicopedagogos, setPsicopedagogos] = useState<IPsicopedagogo[]>([]);

	try {
		const fetch = async () => {
			const psicopedagogosData = await getPsicopedagogos();
			setPsicopedagogos(psicopedagogosData);
		};
		fetch();
	} catch (error) {
		setPsicopedagogos([]);
	}

	return (
		<div className={style.container}>
			<h1>Profesionales</h1>
			<div className={style.rowCard}>
				{psicopedagogos.length > 0 ? (
					psicopedagogos.map((i) => {
						return (
							<div
								className={style.card}
								key={i.idPsicopedagogo}
							>
								{i.fotoPsicopedagogo ? (
									<img
										src={i.fotoPsicopedagogo}
										className={style.image}
										alt="Profesional"
									/>
								) : (
									<Image
										className={style.image}
										width={200}
										height={200}
										alt="fotografia"
										src={foto}
									></Image>
								)}

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
										: "No definida"}
								</h4>
								<Link
									className={style.link}
									href={`/Profesionales/${i.idPsicopedagogo}`}
								>
									Ver Perfil
								</Link>
							</div>
						);
					})
				) : (
					<div>
						<h2>No hay datos cargados</h2>
					</div>
				)}
			</div>
		</div>
	);
}

export default Profesionales;
