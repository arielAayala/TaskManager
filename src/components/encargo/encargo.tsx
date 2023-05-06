"use client";

import React, { useState } from "react";
import style from "./encargo.module.css";
import { IEncargo } from "@/Types/IEncargo";
import Link from "next/link";

function Encargo(props: IEncargo) {
	const [ocultar, setOcultar] = useState(false);

	let color = "";
	if (props.nombreEstado == "pendiente") {
		color = "grey";
	} else if (props.nombreEstado == "en curso") {
		color = "green";
	} else if (props.nombreEstado == "demorado") {
		color = "yellow";
	} else if (props.nombreEstado == "terminado") {
		color = "red";
	}

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
				<div
					className={style.estado}
					style={{ backgroundColor: color }}
				></div>
			</h3>
			{ocultar ? ( // ?==if ocultar()
				<div className={style.infoEncargo}>
					<h4> {props.descripcionEncargo} </h4>
					<h4> {props.nombreCreador} </h4>
					<Link href={`Encargos/${props.idEncargo}`}>Ver detalles</Link>
				</div>
			) : null}
			{/* despues de los ":" va lo que pasa si la condicion es falsa */}
		</div>
	);
}

export default Encargo;
