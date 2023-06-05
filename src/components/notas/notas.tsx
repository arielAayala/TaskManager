import React from "react";
import style from "./notas.module.css";
import Image from "next/image";
import foto from "../../../public/perfilDefautl.png";
import Anexos from "../anexos/anexos";

interface Anexo {
	nombreNotaAnexo: string;
	idNotaAnexo: number;
	urlNotaAnexo: string;
}

interface Props {
	comentarioNota: string;
	fechaCreacionNota: string;
	idUsuarioCreador: string;
	nombreCreador: string;
	fotoCreador: string;
	idNuevoResponsable: string;
	nombreNuevoResponsable: string;
	fotoNuevoResponsable: string;
	notasAnexo: Anexo[];
}

function Notas({
	comentarioNota,
	fechaCreacionNota,
	idUsuarioCreador,
	nombreCreador,
	fotoCreador,
	idNuevoResponsable,
	nombreNuevoResponsable,
	fotoNuevoResponsable,
	notasAnexo,
}: Props) {
	return (
		<div className={style.container}>
			<h3>Fecha creación: </h3>
			<h4>{fechaCreacionNota}</h4>
			<h3>Comentario:</h3>
			<h4>{comentarioNota}</h4>
			{notasAnexo ? (
				<div>
					<h3>Anexos: </h3>
					<div className={style.notasAnexo}>
						{notasAnexo.map((i) => {
							return (
								<Anexos
									key={i.idNotaAnexo}
									urlEncargoAnexo={i.urlNotaAnexo}
									nombreEncargoAnexo={i.nombreNotaAnexo}
								></Anexos>
							);
						})}
					</div>
				</div>
			) : null}
			<div className={style.header}>
				<h3>Creador de la nota: </h3>
				{fotoCreador ? (
					<img
						className={style.foto}
						src={fotoCreador}
						alt={nombreCreador}
						title={nombreCreador}
					/>
				) : (
					<Image
						src={foto}
						alt={nombreCreador}
						title={nombreCreador}
						className={style.foto}
					></Image>
				)}
			</div>

			{idNuevoResponsable ? (
				<div>
					<h3>Nuevo responsable del Encargo:</h3>
					{fotoNuevoResponsable ? (
						<img
							src={fotoNuevoResponsable}
							alt={nombreNuevoResponsable}
							title={nombreNuevoResponsable}
							className={style.foto}
						/>
					) : (
						<Image
							src={foto}
							title={nombreNuevoResponsable}
							alt={nombreNuevoResponsable}
							className={style.foto}
						></Image>
					)}
				</div>
			) : null}
		</div>
	);
}

export default Notas;
