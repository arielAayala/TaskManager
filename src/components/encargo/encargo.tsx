import React from "react";
import { Encargo } from "./encargo.models";
import style from "./encargo.module.css";
import Popup from "../popups/popup";

function Encargo(props: Encargo) {
	const clickHandle = () => {
		console.log("estoy tilteadisimo");
	};

	return (
		<div
			className={style.container}
			onClick={clickHandle}
		>
			<h4> {props.descripcionEncargo} </h4>
			<h4> {props.idUsuarioCreador} </h4>
			<h4> {props.idEncargo} </h4>
			<Popup></Popup> ;
		</div>
	);
}

export default Encargo;
