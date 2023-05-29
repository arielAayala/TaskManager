"use client";

import React, { useState } from "react";
import style from "./encargo.module.css";
import { IEncargo } from "@/Types/IEncargo";
import Link from "next/link";
import Image from "next/image";
import fotoDefault from "../../../public/perfilDefautl.png";

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
			<div className={style.header}>
				<h3>
					ID: {props.idEncargo}
					{" - "}
					{props.tituloEncargo ? props.tituloEncargo : "Falta titulo"}
				</h3>
				<div
					className={style.estado}
					style={{ backgroundColor: color }}
				></div>
			</div>
			{ocultar ? ( // ?==if ocultar()
				<div className={style.containerEncargo}>
					<div className={style.infoEncargo}>
						<div className={style.responsable}>
							{props.fotoResponsable ? (
								<img
									className={style.fotoResponsable}
									src={props.fotoResponsable}
									alt="foto Responsable"
								/>
							) : (
								<Image
									className={style.fotoResponsable}
									alt="foto responsable"
									src={fotoDefault}
								></Image>
							)}
							<h4>
								{props.nombreResponsable
									? props.nombreResponsable.replace(
											/(^\w{1})|(\s+\w{1})/g,
											(letter: any) => letter.toUpperCase()
									  )
									: "Sin Responsable"}
							</h4>
						</div>
						<div className={style.descripcion}>
							<h4>{props.descripcionEncargo}</h4>
						</div>
					</div>
					<div className={style.containerDetalles}>
						<Link
							className={style.detalles}
							href={`Encargos/${props.idEncargo}`}
						>
							Ver detalles
						</Link>
					</div>
				</div>
			) : null}
			{/* despues de los ":" va lo que pasa si la condicion es falsa */}
		</div>
	);
}

export default Encargo;
