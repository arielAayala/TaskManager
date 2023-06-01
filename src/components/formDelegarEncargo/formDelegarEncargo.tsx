import { IUsuario } from "@/Types/IUsuario";
import getAllUser from "@/services/getAllUser";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import style from "./formDelegarEncargo.module.css";
import { IEncargo } from "@/Types/IEncargo";
import updateEncargo from "@/services/updateEncargo";
import getEncargoByID from "@/services/getEncargoByID";
import getAllNotasByIdEncargo from "@/services/getAllNotasByIdEncargo";
import { INotas } from "@/Types/INotas";

interface Props {
	idUsuario: number;
	tituloEncargo: string;
	descripcionEncargo: string;
	idEstado: number;
	idTipo: number;
	idInstitucion: number;
	idEncargo: number;
	idMotivo: number;
	setEncargo: Dispatch<SetStateAction<IEncargo>>;
	setDelegar: Dispatch<SetStateAction<boolean>>;
	setNotas: Dispatch<SetStateAction<INotas[]>>;
}

function FormDelegarEncargo({
	idUsuario,
	tituloEncargo,
	descripcionEncargo,
	idInstitucion,
	idEstado,
	idTipo,
	idEncargo,
	idMotivo,
	setEncargo,
	setDelegar,
	setNotas,
}: Props) {
	const [usuario, setUsuario] = useState<IUsuario[]>([]);

	const [nuevoResponsable, setNuevoResponsable] = useState();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const resData = await updateEncargo(
			idEncargo,
			tituloEncargo,
			descripcionEncargo,
			idInstitucion,
			idEstado,
			idTipo,
			nuevoResponsable,
			idMotivo
		);
		const res = resData;
		if (res === 200) {
			console.log("actualizo :)");
			const [encargoData] = await getEncargoByID(idEncargo);
			const notasData = await getAllNotasByIdEncargo(idEncargo);
			setNotas(notasData);
			setEncargo(encargoData);
			setDelegar(true);
		} else {
			console.log("no actualizo :(");
		}
	};

	const handleChange = (e: any) => {
		setNuevoResponsable(e.target.value);
	};

	useEffect(() => {
		const fetch = async () => {
			try {
				const usuarioData = await getAllUser();
				setUsuario(usuarioData);
			} catch (error) {
				setUsuario([]);
			}
		};
		fetch();
		console.log("hola cargue");
	}, []);

	return (
		<div>
			<form
				onSubmit={handleSubmit}
				className={style.container}
			>
				<label className={style.titulo}>Delegar</label>
				<label>Delegar a:</label>
				<select
					name="idUsuarioResponsable"
					onChange={handleChange}
					defaultValue={"null"}
				>
					<option
						value="null"
						disabled
					>
						Seleccionar nuevo Responsable
					</option>
					{usuario.map((i) => {
						if (i.idUsuario == idUsuario) {
							return null;
						}
						return (
							<option
								value={i.idUsuario}
								key={i.idUsuario}
							>
								{i.nombrePsicopedagogo}
							</option>
						);
					})}
				</select>
				<button>Confirmar </button>
			</form>
		</div>
	);
}

export default FormDelegarEncargo;
