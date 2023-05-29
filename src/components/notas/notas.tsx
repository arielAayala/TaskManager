import React from "react";
import style from "./notas.module.css";
function Notas({
	idNota,
	comentarioNota,
	fechaCreacionNota,
	idUsuarioCreador,
}) {
	return (
		<div className={style.container}>
			<h4>{comentarioNota}</h4>
			<h4>fecha: {fechaCreacionNota}</h4>
			<h4>Publicado por: {idUsuarioCreador} </h4>
		</div>
	);
}

export default Notas;
