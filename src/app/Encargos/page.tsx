import React from "react";
import Encargo from "../../components/encargo/encargo";
import style from "./tareas.module.css";
import getEncargos from "@/services/getEncargos";
import { IEncargo } from "@/Types/IEncargo";

async function Tareas() {
	const encargosData: Promise<IEncargo[]> = getEncargos();
	const encargos = await encargosData;

	return (
		<div className={style.container}>
			<div>
				<h1> Encargos </h1>
				<div>
					{encargos.map((i) => {
						return (
							<Encargo
								key={i.idEncargo}
								idEncargo={i.idEncargo}
								tituloEncargo={i.tituloEncargo}
								nombreEstado={i.nombreEstado}
								nombreResponsable={i.nombreResponsable}
								fotoResponsable={i.fotoResponsable}
								fechaCreacionEncargo={i.fechaCreacionEncargo}
							></Encargo>
						);
					})}
				</div>
			</div>
		</div>
	);
}
export default Tareas;
