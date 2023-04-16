import { getPsicopedagogos } from "@/services/getPsicopedagogos";
import React from "react";

async function fetchPsicopedagogos() {
	return await getPsicopedagogos();
}

async function Detalle() {
	const psicopedagogos = await fetchPsicopedagogos();

	console.log(psicopedagogos);
	return (
		<div>
			<h1>Detalle</h1>
			{JSON.stringify(psicopedagogos)}
		</div>
	);
}

export default Detalle;
