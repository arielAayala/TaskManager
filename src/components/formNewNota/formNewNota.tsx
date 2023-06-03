"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import style from "./formNewNota.module.css";
import insertNewNota from "@/services/insertNewNota";
import insertNotasAnexoByIdNota from "@/services/insertNotasAnexoByIdNota";
import getAllNotasByIdEncargo from "@/services/getAllNotasByIdEncargo";

interface Props {
	idUsuario: number;
	idEncargo: number;
	setNota: Dispatch<SetStateAction<boolean>>;
	setNotas: Dispatch<SetStateAction<any>>;
}

function FormNewNota({ idEncargo, idUsuario, setNota, setNotas }: Props) {
	const [input, setInput] = useState({
		comentarioNota: "",
	});
	const [file, setFile] = useState();
	const [alert, setAlert] = useState({
		mensaje: "",
		color: "",
	});

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			const res = await insertNewNota(
				idEncargo,
				idUsuario,
				input.comentarioNota
			);
			console.log(res.idNota);

			if (res.idNota) {
				if (file?.length) {
					const resFile = await handleSubmitFile(res.idNota);
					if (resFile) {
						setAlert({ mensaje: "Se cargo correctamente", color: "green" });
						const notasData = await getAllNotasByIdEncargo(idEncargo);
						setNotas(notasData);
					} else {
						setAlert({
							mensaje: "Hubo un Error al cargar los archivos",
							color: "red",
						});
					}
				} else {
					setAlert({ mensaje: "Se cargo correctamente", color: "green" });
					const notasData = await getAllNotasByIdEncargo(idEncargo);
					setNotas(notasData);
				}
			} else {
				setAlert({ mensaje: "Hubo un Error", color: "red" });
			}
		} catch (error) {
			setAlert({ mensaje: "Hubo un Error", color: "red" });
		}
	};

	const handleSubmitFile = async (idNota: number) => {
		let lstRes: [] = [];
		for (let i = 0; i < file.length; i++) {
			const res = await insertNotasAnexoByIdNota(idNota, file[i]);
			lstRes.push(res);
		}
		return lstRes.every((i) => i === 200);
	};

	const handleChange = (e: any) => {
		setInput({ ...input, [e.target.name]: e.target.value });
	};

	const handleChangeFile = (e: any) => {
		setFile(e.target.files);
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
					<label className={style.titulo}>Agregar Nota</label>
					<button onClick={() => setNota(true)}>Cerrar</button>
				</div>
				<textarea
					name="comentarioNota"
					placeholder="Comentario"
					required
					onChange={handleChange}
				></textarea>
				<input
					type="file"
					onChange={handleChangeFile}
					name="file"
					multiple
				/>
				<button>Confirmar</button>
			</form>
		</div>
	);
}

export default FormNewNota;
