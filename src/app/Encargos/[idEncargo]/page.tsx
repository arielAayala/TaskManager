import { IEncargo } from "@/Types/IEncargo";
import getEncargoByID from "@/services/getEncargoByID";
import React from "react";

interface Params {
	params: { idEncargo: string };
}

export default async function EncargoID({ params: { idEncargo } }: Params) {
	const encargoData: Promise<IEncargo[]> = getEncargoByID(idEncargo);
	const [encargo] = await encargoData;

	return (
		<div>
			<h1>
				{encargo.idEncargo} - {}
				{encargo.tituloEncargo ? encargo.tituloEncargo : "Sin titulo"}
			</h1>
			<h3>{encargo.descripcionEncargo}</h3>
		</div>
	);
}
