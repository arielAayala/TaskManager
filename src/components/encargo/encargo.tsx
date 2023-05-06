"use client";

import React, { useState } from "react";
import style from "./encargo.module.css";
import { IEncargo } from "@/Types/IEncargo";

function Encargo(props: IEncargo) {
	const [ocultar, setOcultar] = useState(false);

	const { nombreEstado } = props;

	const clickHandle = () => {
		setOcultar(!ocultar);
	};
	return (
		<div
			className={style.container}
			onClick={clickHandle}
		>
			<h3>
				ID: {props.idEncargo}
				{" - "}
				{props.tituloEncargo ? props.tituloEncargo : "Falta TITULO"}
				<div className={style.curso}></div>
			</h3>
			{ocultar ? ( // ?==if ocultar()
				<div className={style.infoEncargo}>
					<h4> {props.descripcionEncargo} </h4>
					<h4> {props.nombreCreador} </h4>
				</div>
			) : null}
			{/* despues de los ":" va lo que pasa si la condicion es falsa */}
		</div>
	);
}

export default Encargo;
