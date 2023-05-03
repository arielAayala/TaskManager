"use client";

import React, { useState } from "react";
import { Encargo } from "./encargo.models";
import style from "./encargo.module.css";

function Encargo(props: Encargo) {
	const [ocultar, setOcultar] = useState(false);

	const clickHandle = () => {
		setOcultar(!ocultar);
	};
	return (
		<div className={style.container} onClick={clickHandle}>
			<h4> {props.tituloEncargo} </h4>
			{ocultar ? ( // ?==if ocultar()
				<div>
					<h4> {props.descripcionEncargo} </h4>
					<h4> {props.idUsuarioCreador} </h4>
					<h4> {props.idEncargo} </h4>
				</div>
			) : null}
			{/* despues de los ":" va lo que pasa si la condicion es falsa */}
		</div>
	);
}

export default Encargo;
