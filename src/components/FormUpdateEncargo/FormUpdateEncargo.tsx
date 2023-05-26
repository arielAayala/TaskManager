"use client";

import { IInstitucion } from "@/Types/IInstitucion";
import getAllInstituciones from "@/services/getAllInstituciones";
import updateEncargo from "@/services/updateEncargo";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

interface Props {
	tituloEncargo: string;
	descripcionEncargo: string;
	idEstado: number;
	idTipo: number;
	idInstitucion: number;
	idUsuarioResponsable: number;
	idEncargo: number;
}

const Estados = [
	{
		idEstado: 1,
		nombreEstado: "Pendiente",
	},
	{
		idEstado: 2,
		nombreEstado: "En curso",
	},
	{
		idEstado: 3,
		nombreEstado: "Demorado",
	},
	{
		idEstado: 4,
		nombreEstado: "Terminado",
	},
];

const Tipos = [
	{
		idTipo: 1,
		nombreTipo: "Notas Varias",
	},
	{
		idTipo: 2,
		nombreTipo: "Oficios",
	},
	{
		idTipo: 3,
		nombreTipo: "Expedientes",
	},
	{
		idTipo: 4,
		nombreTipo: "Resoluciones / disposiciones ministeriales",
	},
	{
		idTipo: 5,
		nombreTipo: "Informes varios",
	},
	{
		idTipo: 6,
		nombreTipo: "Llamados telefonicos de asesoramiento de urgencia",
	},
];

function FormUpdateEncargo({
	tituloEncargo,
	descripcionEncargo,
	idInstitucion,
	idEstado,
	idTipo,
	idUsuarioResponsable,
	idEncargo,
}: Props) {
	const [input, setInput] = useState({
		tituloEncargo: tituloEncargo,
		descripcionEncargo: descripcionEncargo,
		idInstitucion: idInstitucion,
		idEstado: idEstado,
		idTipo: idTipo,
	});

	const router = useRouter();

	const [instituciones, setInstituciones] = useState<IInstitucion[]>([]);

	const [hideForm, setHideForm] = useState(false);

	const handleHide = () => setHideForm(!hideForm);

	useEffect(() => {
		const fetch = async () => {
			try {
				const institucionesData = await getAllInstituciones();
				setInstituciones(institucionesData);
			} catch (error) {
				setInstituciones([]);
			}
		};
		fetch();
	}, []);

	const handleFormUpdate = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const resData = await updateEncargo(
			idEncargo,
			input.tituloEncargo,
			input.descripcionEncargo,
			input.idInstitucion,
			input.idEstado,
			input.idTipo,
			idUsuarioResponsable
		);
		const res = resData;
		if (res === 200) {
			console.log("actualizo :)");
			router.refresh();
		} else {
			console.log("no actualizo :(");
		}
	};

	const handleChange = (e: any) => {
		setInput({ ...input, [e.target.name]: e.target.value });
	};

	return (
		<div>
			<h3 onClick={handleHide}>⚙</h3>
			{hideForm ? (
				<div>
					<form onSubmit={handleFormUpdate}>
						<input
							defaultValue={tituloEncargo}
							type="text"
							name="tituloEncargo"
							onChange={handleChange}
							placeholder="Ingrese un titulo"
						/>
						<input
							type="text"
							defaultValue={descripcionEncargo}
							name="descripcionEncargo"
							onChange={handleChange}
							placeholder="Ingrese una descripcion"
						/>
						<select
							name="idInstitucion"
							onChange={handleChange}
							value={idInstitucion}
						>
							{instituciones.map((i) => {
								return (
									<option
										key={i.idInstitucion}
										value={i.idInstitucion}
									>
										{i.nombreInstitucion}
									</option>
								);
							})}
						</select>
						<select
							name="idEstado"
							value={idEstado}
							onChange={handleChange}
						>
							{Estados.map((i) => {
								return (
									<option
										value={i.idEstado}
										key={i.idEstado}
									>
										{i.nombreEstado}
									</option>
								);
							})}
						</select>
						<select
							name="idTipo"
							onChange={handleChange}
							value={idTipo}
						>
							{Tipos.map((i) => {
								return (
									<option
										value={i.idTipo}
										key={i.idTipo}
									>
										{i.nombreTipo}
									</option>
								);
							})}
						</select>
						<button type="submit">Actualizar</button>
					</form>
				</div>
			) : null}
		</div>
	);
}

export default FormUpdateEncargo;
