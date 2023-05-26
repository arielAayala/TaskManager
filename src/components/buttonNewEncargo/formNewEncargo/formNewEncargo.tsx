"use cliente";

import { IInstitucion } from "@/Types/IInstitucion";
import { IUsuarioResponsable } from "@/Types/IUsuario";
import { useContextLogin } from "@/context/contextLogin";
import getAllInstituciones from "@/services/getAllInstituciones";
import getAllUser from "@/services/getAllUser";
import insertNewEncargo from "@/services/insertNewEncargo";
import React, { FormEvent, useEffect, useState } from "react";
import style from "./formNewEncargo.module.css";

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

function FormNewEncargo() {
	const { idUsuario } = useContextLogin();

	const [lstInstituciones, setLstInstituciones] = useState<IInstitucion[]>([]);
	const [lstUsuarios, setLstUsuarios] = useState<IUsuarioResponsable[]>([]);
	const [input, setInput] = useState({
		tituloEncargo: "",
		idInstitucion: 0,
		idTipo: 0,
		idEstado: 0,
		idUsuarioResponsable: 0,
		descripcionEncargo: "",
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const usuariosData = await getAllUser();
				setLstUsuarios(usuariosData);
				const institucionesData = await getAllInstituciones();
				setLstInstituciones(institucionesData);
			} catch (error) {
				setLstUsuarios([]);
				setLstInstituciones([]);
			}
		};
		console.log("carga");

		fetchData();
	}, []);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(input);
		const resData = insertNewEncargo(
			input.tituloEncargo,
			idUsuario,
			input.idInstitucion,
			input.idEstado,
			input.idTipo,
			input.idUsuarioResponsable,
			input.descripcionEncargo
		);
		const res = await resData;
		if (res === 200) {
			console.log("cargo :)");
		} else {
			("no cargo :(");
		}
	};

	const handleChange = (e: any) => {
		setInput({ ...input, [e.target.name]: e.target.value });
	};

	return (
		<div className={style.container}>
			<h3>Nuevo Encargo: </h3>
			<form onSubmit={handleSubmit}>
				<label>Titulo: </label>
				<input
					type="text"
					name="tituloEncargo"
					placeholder="Titulo para el encargo"
					required
					onChange={handleChange}
				/>
				<br />
				<label htmlFor="institucion">Institucion: </label>
				<select
					name="idInstitucion"
					id="institucion"
					required
					defaultValue={"default"}
					onChange={handleChange}
				>
					<option value={"Default"}>Seleccione una institucion</option>
					{lstInstituciones.map((i) => {
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
				<br />

				<label htmlFor="Tipo">Tipo: </label>
				<select
					name="idTipo"
					id="Tipo"
					onChange={handleChange}
				>
					<br />
					<option value={"Default"}>Seleccione una Tipo de encargo</option>
					{Tipos.map((i) => {
						return (
							<option
								key={i.idTipo}
								value={i.idTipo}
							>
								{i.nombreTipo}
							</option>
						);
					})}
				</select>
				<br />

				<label htmlFor="Estado">Estado: </label>
				<select
					name="idEstado"
					id="Estado"
					onChange={handleChange}
				>
					<option value={"Default"}>Seleccione un Estado del encargo</option>
					{Estados.map((i) => {
						return (
							<option
								key={i.idEstado}
								value={i.idEstado}
							>
								{i.nombreEstado}
							</option>
						);
					})}
				</select>
				<br />
				<label htmlFor="UsuarioResponsable">Usuario Responsable: </label>
				<select
					onChange={handleChange}
					name="idUsuarioResponsable"
					id="UsuarioResponsable"
				>
					<option value={"Default"}>
						Seleccione un Usuario Responsable del encargo
					</option>
					{lstUsuarios.map((i) => {
						return (
							<option
								key={i.idUsuario}
								value={i.idUsuario}
							>
								{i.nombrePsicopedagogo}
							</option>
						);
					})}
				</select>
				<br />
				<label>Descripcion del encargo: </label>
				<br />
				<textarea
					onChange={handleChange}
					name="descripcionEncargo"
					placeholder="Escriba una pequeña descripcion del encargo"
				></textarea>
				<br />
				<button type="submit">Crear nuevo Encargo</button>
			</form>
		</div>
	);
}

export default FormNewEncargo;
