"use cliente";

import { IInstitucion } from "@/Types/IInstitucion";
import { IUsuarioResponsable } from "@/Types/IUsuario";
import { useContextLogin } from "@/context/contextLogin";
import getAllInstituciones from "@/services/getAllInstituciones";
import getAllUser from "@/services/getAllUser";
import insertNewEncargo from "@/services/insertNewEncargo";
import React, { FormEvent, useEffect, useState } from "react";
import style from "./formNewEncargo.module.css";
import getAllMotivos from "@/services/getAllMotivos";
import { IMotivo } from "@/Types/IMotivo";
import { redirect } from "next/navigation";
import insertNewEncargoAnexo from "@/services/insertNewEncargoAnexo";

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

function FormNewEncargo() {
	const { idUsuario } = useContextLogin();

	if (idUsuario <= 0) {
		redirect("/login");
	}

	const [alert, setAlert] = useState({
		hide: true,
		message: "",
	});

	const [lstInstituciones, setLstInstituciones] = useState<IInstitucion[]>([]);
	const [lstMotivos, setLstMotivos] = useState<IMotivo[]>([]);
	const [lstUsuarios, setLstUsuarios] = useState<IUsuarioResponsable[]>([]);
	const [input, setInput] = useState({
		tituloEncargo: "",
		idInstitucion: 0,
		idTipo: 0,
		idMotivo: 0,
		idUsuarioResponsable: null,
		descripcionEncargo: "",
	});

	const [file, setFile] = useState<FileList>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const usuariosData = await getAllUser();
				setLstUsuarios(usuariosData);
				const institucionesData = await getAllInstituciones();
				setLstInstituciones(institucionesData);
				const motivoData = await getAllMotivos();
				setLstMotivos(motivoData);
			} catch (error) {
				setLstUsuarios([]);
				setLstInstituciones([]);
				setLstMotivos([]);
			}
		};
		console.log("carga");

		fetchData();
	}, []);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const resData = insertNewEncargo(
				input.tituloEncargo,
				idUsuario,
				input.idInstitucion,
				input.idMotivo,
				input.idTipo,
				input.idUsuarioResponsable == 0 ? null : input.idUsuarioResponsable,
				input.descripcionEncargo
			);
			const res = await resData;
			console.log("esperando");

			if (res.idEncargo) {
				if (file?.length) {
					handleSubmitFile(res.idEncargo);
				}
				console.log("cargo :)");
				setAlert({
					hide: false,
					message: "Se agrego correctamente el encargo",
				});
			}
		} catch (error: any) {
			console.log("no cargo :(");
			setAlert({
				hide: false,
				message: error.message,
			});
		}
	};

	const handleChange = (e: any) => {
		setInput({ ...input, [e.target.name]: e.target.value });
	};

	const handleChangeFile = (e: any) => {
		setFile(e.target.files);
	};

	const handleSubmitFile = async (idEncargo: number) => {
		for (let i = 0; i < file.length; i++) {
			const res = await insertNewEncargoAnexo(idEncargo, file[i]);
			console.log(res);
		}
	};

	return (
		<div className={style.container}>
			<form
				className={style.form}
				onSubmit={handleSubmit}
			>
				<label>Titulo </label>
				<input
					type="text"
					name="tituloEncargo"
					placeholder="Escriba un titulo para el encargo"
					required
					onChange={handleChange}
				/>
				<br />
				<label htmlFor="institucion">Institución </label>
				<select
					name="idInstitucion"
					required
					defaultValue={"Default"}
					onChange={handleChange}
				>
					<option
						disabled
						value={"Default"}
					>
						Seleccione una institucion
					</option>
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

				<label htmlFor="Tipo">Tipo </label>
				<select
					name="idTipo"
					required
					onChange={handleChange}
					defaultValue={"Default"}
				>
					<option
						disabled
						value={"Default"}
					>
						Seleccione una Tipo de encargo
					</option>
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

				<label htmlFor="Motivo">Motivo</label>
				<select
					name="idMotivo"
					onChange={handleChange}
					defaultValue={"Default"}
				>
					<option
						disabled
						value={"Default"}
					>
						Seleccione un Motivo del encargo
					</option>
					{lstMotivos.map((i) => {
						return (
							<option
								key={i.idMotivo}
								value={i.idMotivo}
							>
								{i.nombreMotivo}
							</option>
						);
					})}
				</select>
				<br />

				<label htmlFor="UsuarioResponsable">Usuario Responsable </label>
				<select
					onChange={handleChange}
					name="idUsuarioResponsable"
					defaultValue={0}
				>
					<option value={0}>
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
				<label htmlFor="descripcionEncargo">Descripción</label>
				<textarea
					onChange={handleChange}
					name="descripcionEncargo"
					required
					placeholder="Escriba una descripcion del encargo"
				></textarea>
				<br />
				<label htmlFor="EncargosAnexos">Anexos</label>
				<input
					type="file"
					name="EncargosAnexos"
					multiple
					onChange={handleChangeFile}
				/>

				<div
					className={style.alert}
					style={alert.hide ? { display: "none" } : { display: "contents" }}
				>
					{alert.message}
				</div>
				<button type="submit">Crear Nuevo Encargo</button>
			</form>
		</div>
	);
}

export default FormNewEncargo;
