"use client";
import { useContextLogin } from "@/context/contextLogin";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import style from "./formNewPsicopedagogo.module.css";
import insertNewPsicopedagogo from "@/services/insertNewPsicopedagogo";

function FormNewPsicopedagogo() {
	const { idUsuario } = useContextLogin();

	if (idUsuario != 1) {
		redirect("/login");
	}

	const [alert, setAlert] = useState({
		mensaje: "",
		color: "",
	});

	const [input, setInput] = useState({
		nombrePsicopedagogo: "",
		dniPsicopedagogo: "",
		nacimientoPsicopedagogo: "",
	});

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			const resData = await insertNewPsicopedagogo(
				input.nombrePsicopedagogo,
				input.dniPsicopedagogo,
				input.nacimientoPsicopedagogo
			);

			if (resData) {
				setAlert({
					mensaje: "Se cargo correctamente el psicopedagogo",
					color: "green",
				});
			} else {
				setAlert({
					mensaje: "Hubo un Error al cargar el psicopedagogo",
					color: "red",
				});
			}
		} catch (error) {
			setAlert({ mensaje: "Hubo un Error", color: "red" });
		}
	};

	const handleChange = (e: any) => {
		setInput({ ...input, [e.target.name]: e.target.value });
	};

	return (
		<div className={style.container}>
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
				<label>Nombres y apellidos completos </label>
				<input
					type="text"
					name="nombrePsicopedagogo"
					placeholder="Ingrese el Nombre del Psicopedagogo/a "
					required
					onChange={handleChange}
				/>
				<br />

				<label>Dni </label>
				<input
					type="text"
					name="dniPsicopedagogo"
					placeholder="Ingrese el dni del psicopedagogo/a"
					required
					onChange={handleChange}
				/>
				<br />
				<label>Fecha nacimiento </label>
				<input
					type="date"
					name="nacimientoPsicopedagogo"
					required
					onChange={handleChange}
				/>
				<br />

				<button type="submit">Crear Nuevo Encargo</button>
			</form>
		</div>
	);
}

export default FormNewPsicopedagogo;
