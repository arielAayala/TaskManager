"use client";

import { IInstitucion } from "@/Types/IInstitucion";
import getAllInstituciones from "@/services/getAllInstituciones";
import updateEncargo from "@/services/updateEncargo";
import { useRouter } from "next/navigation";
import React, {
	Dispatch,
	FormEvent,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import style from "./formUpdateEncargo.module.css";
import { IEncargo } from "@/Types/IEncargo";
import getEncargoByID from "@/services/getEncargoByID";
import { IMotivo } from "@/Types/IMotivo";
import getAllMotivos from "@/services/getAllMotivos";
import { INotas } from "@/Types/INotas";
import getAllNotasByIdEncargo from "@/services/getAllNotasByIdEncargo";

interface Props {
	tituloEncargo: string;
	descripcionEncargo: string;
	idEstado: number;
	idTipo: number;
	idInstitucion: number;
	idUsuarioResponsable: number;
	idEncargo: number;
	idMotivo: number;
	setEncargo: Dispatch<SetStateAction<IEncargo>>;
	setNotas: Dispatch<SetStateAction<INotas[]>>;
	setConfiguracion: Dispatch<SetStateAction<boolean>>;
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
	idMotivo,
	setEncargo,
	setNotas,
	setConfiguracion,
}: Props) {
	const [input, setInput] = useState({
		tituloEncargo: tituloEncargo,
		descripcionEncargo: descripcionEncargo,
		idInstitucion: idInstitucion,
		idEstado: idEstado,
		idTipo: idTipo,
		idMotivo: idMotivo,
	});

	const [instituciones, setInstituciones] = useState<IInstitucion[]>([]);
	const [motivos, setMotivos] = useState<IMotivo[]>([]);

	const [alert, setAlert] = useState({
		mensaje: "",
		color: "",
	});

	useEffect(() => {
		const fetch = async () => {
			try {
				const institucionesData = await getAllInstituciones();
				const motivosData = await getAllMotivos();
				setMotivos(motivosData);
				setInstituciones(institucionesData);
			} catch (error) {
				setInstituciones([]);
				setMotivos([]);
			}
		};
		fetch();
	}, []);

	const handleFormUpdate = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const resData = await updateEncargo(
				idEncargo,
				input.tituloEncargo,
				input.descripcionEncargo,
				input.idInstitucion,
				input.idEstado,
				input.idTipo,
				idUsuarioResponsable,
				input.idMotivo
			);
			const res = resData;
			if (res === 200) {
				console.log("actualizo :)");
				const [encargoData] = await getEncargoByID(idEncargo);
				setEncargo(encargoData);
				const notasData = await getAllNotasByIdEncargo(idEncargo);
				setNotas(notasData);
				setAlert({
					mensaje: "Se cargo correctamente la institución",
					color: "green",
				});
			}
		} catch (error) {
			console.log("no actualizo :(");
			setAlert({ mensaje: "Ocurrio un error", color: "red" });
		}
	};

	const handleChange = (e: any) => {
		setInput({ ...input, [e.target.name]: e.target.value });
	};

	return (
		<div className={style.background}>
			<form
				className={style.container}
				onSubmit={handleFormUpdate}
			>
				<div
					className={style.alert}
					style={{ background: alert.color }}
				>
					{alert.mensaje}
				</div>
				<div className={style.header}>
					<label className={style.titulo}>Actualizar</label>
					<button onClick={() => setConfiguracion(true)}>Cerrar</button>
				</div>
				<label>Titulo Encargo</label>
				<input
					defaultValue={tituloEncargo}
					type="text"
					name="tituloEncargo"
					onChange={handleChange}
					placeholder="Ingrese un titulo"
				/>
				<label>Descripción Encargo</label>
				<input
					type="text"
					defaultValue={descripcionEncargo}
					name="descripcionEncargo"
					onChange={handleChange}
					placeholder="Ingrese una descripcion"
				/>
				<label>Institución</label>
				<select
					name="idInstitucion"
					onChange={handleChange}
					defaultValue={idInstitucion}
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
				<label>Estado</label>
				<select
					name="idEstado"
					defaultValue={idEstado}
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
				<label>Tipo</label>
				<select
					name="idTipo"
					onChange={handleChange}
					defaultValue={idTipo}
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
				<label>Motivos</label>
				<select
					name="idMotivo"
					onChange={handleChange}
					defaultValue={idMotivo}
				>
					{motivos.map((i) => {
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
				<button type="submit">Actualizar</button>
			</form>
		</div>
	);
}

export default FormUpdateEncargo;
