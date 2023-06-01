"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import style from "./formNewNota.module.css";

interface Props {
	idUsuario: number;
	idEncargo: number;
	setNota: Dispatch<SetStateAction<boolean>>;
}

function FormNewNota({ idEncargo, idUsuario, setNota }: Props) {
	const [input, setInput] = useState({
		comentarioNota: "",
	});

	const handleSubmit = async (e: any) => {};

	const handleChange = (e: any) => {};

	return (
		<div className={style.background}>
			<form
				onSubmit={handleSubmit}
				className={style.container}
			>
				<div className={style.header}>
					<label className={style.titulo}>Agregar Nota</label>
					<button onClick={() => setNota(true)}>Cerrar</button>
				</div>
				<textarea
					name="comentarioNota"
					placeholder="Comentario"
				></textarea>
				<input
					type="file"
					name="file"
					multiple
				/>
				<button>Confirmar</button>
			</form>
		</div>
	);
}

export default FormNewNota;
