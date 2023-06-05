"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import style from "./formNewInstitucion.module.css";
import { IInstitucion } from "@/Types/IInstitucion";
import insertNewInstitucion from "@/services/insertNewInstitucion";
import getAllInstituciones from "@/services/getAllInstituciones";

interface Props {
	setHideFormInstitucion: Dispatch<SetStateAction<boolean>>;
	setLstInstituciones: Dispatch<SetStateAction<IInstitucion[]>>;
}

function FormNewInstitucion({
	setHideFormInstitucion,
	setLstInstituciones,
}: Props) {
	const [input, setInput] = useState({
		nombreInstitucion: "",
		idLocalidad: "",
		responsableInstitucion: "",
		domicilioInstitucion: "",
	});
	const [alert, setAlert] = useState({
		mensaje: "",
		color: "",
	});

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			const resData = await insertNewInstitucion(
				input.nombreInstitucion,
				input.idLocalidad,
				input.responsableInstitucion,
				input.domicilioInstitucion
			);
			const res = resData;
			if (res === 200) {
				console.log("actualizo :)");
				const dataInstitucion = await getAllInstituciones();
				setLstInstituciones(dataInstitucion);
				setAlert({
					mensaje: "Se cargo correctamente la institución",
					color: "green",
				});
			}
		} catch (error) {
			setAlert({ mensaje: "Ocurrio un error", color: "red" });
		}
	};

	const handleChange = (e: any) => {
		setInput({ ...input, [e.target.name]: e.target.value });
	};

	return (
		<div className={style.background}>
			<form
				onSubmit={handleSubmit}
				className={style.container}
			>
				<div
					className={style.alert}
					style={{ background: alert.color }}
				>
					{alert.mensaje}
				</div>
				<div className={style.header}>
					<label className={style.titulo}>Agregar Institucion</label>
					<button
						onClick={() => {
							setHideFormInstitucion(true);
						}}
					>
						Cerrar
					</button>
				</div>
				<label>Nombre de la institución</label>
				<input
					type="text"
					name="nombreInstitucion"
					placeholder="Ingrese Nombre de la institución"
					required
					onChange={handleChange}
				/>
				<label>Responsable de la institución</label>
				<input
					type="text"
					placeholder="Ingrese Nombre del Responsable de la institución"
					onChange={handleChange}
					name="responsableInstitucion"
					required
				/>
				<label>Localidad </label>
				<select
					name="idLocalidad"
					required
					onChange={handleChange}
					defaultValue={"null"}
				>
					<option
						disabled
						value="null"
					>
						Seleccione la localidad de la institución
					</option>
					<option value={1}>Formosa</option>
					<option value={2}>Pirané</option>
				</select>
				<label>Domicilio de la institución</label>
				<input
					type="text"
					required
					onChange={handleChange}
					name="domicilioInstitucion"
					placeholder="Ingrese el domicilio de la institución"
				/>
				<button>Confirmar</button>
			</form>
		</div>
	);
}

export default FormNewInstitucion;
