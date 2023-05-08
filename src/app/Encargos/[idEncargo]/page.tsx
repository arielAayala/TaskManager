import { IEncargo } from "@/Types/IEncargo";
import getEncargoByID from "@/services/getEncargoByID";
import React from "react";
import style from "./idEncargo.module.css";
import Image from "next/image";
import Link from "next/link";
import backrow from "../../../../public/atras.png";
import { IAnexo } from "@/Types/IAnexo";
import getAnexoByIDEncargo from "@/services/getAnexoByIDEncargo";

interface Params {
	params: { idEncargo: string };
}

export default async function EncargoID({ params: { idEncargo } }: Params) {
	const encargoData: Promise<IEncargo[]> = getEncargoByID(idEncargo);
	const anexoData: Promise<IAnexo[]> = getAnexoByIDEncargo(idEncargo);
	const [encargo, anexos] = await Promise.all([
		getEncargoByID,
		getAnexoByIDEncargo,
	]);

	return (
		<div>
			<Link
				href={"/Encargos"}
				className={style.link}
			>
				<Image
					className={style.image}
					width={30}
					height={30}
					alt="<-"
					src={backrow}
				></Image>{" "}
			</Link>
			<div className={style.container}>
				<h1>
					{encargo.idEncargo} - {}
					{encargo.tituloEncargo ? encargo.tituloEncargo : "Titulo de Ejemplo"}
				</h1>
				<h2>{encargo.descripcionEncargo}</h2>
				<h3>Archivo del encargo</h3>
				<h3>{encargo.nombreEstado}</h3>
				<h3>Institucion: {encargo.nombreInstitucion}</h3>
				<h3>Creado el: {encargo.fechaCreacionEncargo}</h3>
				<h3>Creado por {encargo.nombreCreador}</h3>
				<h3>Responsable actual: {encargo.nombreResponsable}</h3>
				<h3>
					{encargo.fechaCierreEncargo
						? `finalizado el: ${encargo.fechaCierreEncargo}`
						: null}
				</h3>
			</div>
		</div>
	);
}
