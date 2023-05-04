import { Psicopedagogo } from "@/Types/Psicopedagogo";
import getPsicopedagogoById from "@/services/getPsicopedagogoById";
import Image from "next/image";
import React from "react";
import foto from "../../../../public/perfilDefautl.png";
import style from "./profesionalesID.module.css";
import getContacs from "@/services/getContacs";

type Params = {
	params: { idPsicopedagogo: string };
};

export default async function ProfesionalID({
	params: { idPsicopedagogo },
}: Params) {
	const psicopedagogoData = getPsicopedagogoById(idPsicopedagogo);
	const contactosData = getContacs(idPsicopedagogo);

	const [[psicopedagogo], contactos] = await Promise.all([
		psicopedagogoData,
		contactosData,
	]);

	return (
		<div className={style.container}>
			<div className={style.header}>
				<Image
					width={200}
					height={200}
					alt="fotografia"
					src={
						psicopedagogo.fotoPsicopedagogo
							? psicopedagogo.fotoPsicopedagogo
							: foto
					}
				></Image>
				<div className={style.nameHeader}>
					<h3>{psicopedagogo.nombrePsicopedagogo}</h3>
					<h4>
						Especialidad:{" "}
						{psicopedagogo.especialidadPsicopedagogo
							? psicopedagogo.especialidadPsicopedagogo
							: "No definida"}
					</h4>
				</div>
			</div>
			<div className={style.info}>
				<h5>Edad: {psicopedagogo.edadPsicopedagogo}</h5>
				<h5>Nacimiento: {psicopedagogo.nacimientoPsicopedagogo} </h5>
				<h5>Contactos: </h5>
				{contactos.map((i: any) => {
					return (
						<h5
							className={style.contacs}
							key={i.idContacto}
						>
							{i.numeroContacto}
						</h5>
					);
				})}
			</div>
		</div>
	);
}
