"use cliente";

import { useContextLogin } from "@/context/contextLogin";
import getAllInstituciones from "@/services/getAllInstituciones";
import getAllUser from "@/services/getAllUser";
import insertNewEncargo from "@/services/insertNewEncargo";
import React, { FormEvent, useState } from "react";

interface Institucion {
	idInstitucion: number;
	nombreInstitucion: string;
}

interface UsuarioResponsable {
	idUsuario: number;
	nombrePsicopedagogo: string;
}

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

	const [lstInstituciones, setLstInstituciones] = useState<Institucion[]>([]);
	const [lstUsuarios, setLstUsuarios] = useState<UsuarioResponsable[]>([]);
	const [input, setInput] = useState({
		tituloEncargo: "",
		idInstitucion: 0,
		idTipo: 0,
		idEstado: 0,
		idUsuarioResponsable: 0,
		descripcionEncargo: "",
	});

	useState(async () => {
		const getDataUsuarios = async () => {
			const usuariosData: Promise<UsuarioResponsable[]> = getAllUser();
			const usuarios = await usuariosData;
			return usuarios;
		};
		const getDataInstituciones = async () => {
			const institucionesData: Promise<Institucion[]> = getAllInstituciones();
			const instituciones = await institucionesData;
			return instituciones;
		};
		try {
			setLstInstituciones(await getDataInstituciones());
			setLstUsuarios(await getDataUsuarios());
		} catch (error) {
			setLstInstituciones([]);
			setLstUsuarios([]);
		}
		console.log("carga");
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
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="tituloEncargo"
					placeholder="Titulo para el encargo"
					required
					onChange={handleChange}
				/>
				<label htmlFor="institucion">Institucion</label>
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

				<label htmlFor="Tipo">Tipo</label>
				<select
					name="idTipo"
					id="Tipo"
					onChange={handleChange}
				>
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

				<label htmlFor="Estado">Estado</label>
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

				<label htmlFor="UsuarioResponsable">UsuarioResponsable</label>
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
				<textarea
					onChange={handleChange}
					name="descripcionEncargo"
					placeholder="Escriba una pequeña descripcion del encargo"
				></textarea>
				<button type="submit">Crear nuevo Encargo</button>
			</form>
		</div>
	);
}

export default FormNewEncargo;
