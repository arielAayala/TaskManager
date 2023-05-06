import { IEncargo } from "@/Types/IEncargo";
import getEncargoByID from "@/services/getEncargoByID";
import React from "react";
import style from "./idEncargo.module.css";

interface Params {
	params: { idEncargo: string };
}

export default async function EncargoID({ params: { idEncargo } }: Params) {
	const encargoData: Promise<IEncargo[]> = getEncargoByID(idEncargo);
	const [encargo] = await encargoData;

	return (
		<div className={style.container}>
			<h1>
				{encargo.idEncargo} - {}
				{encargo.tituloEncargo ? encargo.tituloEncargo : "Sin titulo"}
			</h1>
			<h3>{encargo.descripcionEncargo}</h3>
			<h3>archivo del encargo</h3>
			<h3>{encargo.nombreEstado}</h3>
			<h3>creado el: {encargo.fechaCreacionEncargo}</h3>
			<h3>
				{encargo.fechaCierre
					? `finalizado el: ${encargo.fechaCierreEncargo}`
					: null}
			</h3>
			<h3>{encargo.nombreCreador}</h3>
			<h3>{encargo.nombreResponsable}</h3>
			<h3>{encargo.nombreInstitucion}</h3>
		</div>
	);
}
