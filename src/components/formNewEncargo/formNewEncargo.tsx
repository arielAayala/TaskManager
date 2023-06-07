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
import FormNewInstitucion from "../formNewInstitucion/formNewInstitucion";

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
		mensaje: "",
		color: "",
	});

	const [hideFormNewInstitucion, setHideFormNewInstitucion] = useState(true);

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

	const handleSubmit = async (e: any) => {
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

			if (res.idEncargo) {
				if (file?.length) {
					const resFile = await handleSubmitFile(res.idEncargo);
					if (resFile) {
						setAlert({ mensaje: "Se cargo correctamente", color: "green" });
					} else {
						setAlert({
							mensaje: "Hubo un Error al cargar los archivos",
							color: "red",
						});
					}
				} else {
					setAlert({ mensaje: "Se cargo correctamente", color: "green" });
				}
			} else {
				setAlert({ mensaje: "Hubo un Error", color: "red" });
			}
		} catch (error) {
			setAlert({ mensaje: "Hubo un Error", color: "red" });
		}
	};

	const handleChange = (e: any) => {
		setInput({ ...input, [e.target.name]: e.target.value });
	};

	const handleChangeFile = (e: any) => {
		setFile(e.target.files);
	};

	const handleSubmitFile = async (idEncargo: number) => {
		let lstRes: [] = [];
		for (let i = 0; i < file.length; i++) {
			const res = await insertNewEncargoAnexo(idEncargo, file[i]);
			lstRes.push(res);
		}
		return lstRes.every((i) => i === 200);
	};

	return (
		<div className={style.container}>
			{hideFormNewInstitucion ? null : (
				<FormNewInstitucion
					setHideFormInstitucion={setHideFormNewInstitucion}
					setLstInstituciones={setLstInstituciones}
				></FormNewInstitucion>
			)}

			<form
				className={style.form}
				onSubmit={handleSubmit}
			>
				<div
					className={style.alert}
					style={{ background: alert.color }}
				>
					{alert.mensaje}
				</div>
				<label>Titulo </label>
				<input
					type="text"
					name="tituloEncargo"
					placeholder="Escriba un titulo para el encargo"
					required
					onChange={handleChange}
				/>
				<br />

				<label htmlFor="descripcionEncargo">Descripción</label>
				<textarea
					onChange={handleChange}
					name="descripcionEncargo"
					required
					placeholder="Escriba una descripcion del encargo"
				></textarea>
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
				<div className={style.agregarForm}>
					<p>
						Si no existe la institución que desea ingresar, puede agregar una
						nueva
					</p>
					<button
						onClick={() => setHideFormNewInstitucion(false)}
						type="button"
					>
						➕
					</button>
				</div>
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

				<label htmlFor="EncargosAnexos">Anexos</label>
				<input
					type="file"
					name="EncargosAnexos"
					multiple
					onChange={handleChangeFile}
				/>
				<button type="submit">Crear Nuevo Encargo</button>
			</form>
		</div>
	);
}

export default FormNewEncargo;
