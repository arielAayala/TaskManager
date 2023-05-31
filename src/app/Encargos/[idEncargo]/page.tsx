"use client";
import { IEncargo } from "@/Types/IEncargo";
import getEncargoByID from "@/services/getEncargoByID";
import React, { useEffect, useState } from "react";
import style from "./idEncargo.module.css";
import Image from "next/image";
import Link from "next/link";
import backrow from "../../../../public/atras.png";
import { IEncargoAnexo } from "@/Types/IEncargoAnexo";
import getEncargosAnexosByIDEncargo from "@/services/getEncargosAnexoByIDEncargo";
import { useContextLogin } from "@/context/contextLogin";
import { redirect } from "next/navigation";
import FormUpdateEncargo from "@/components/FormUpdateEncargo/FormUpdateEncargo";
import newResponsable from "@/services/newResponsable";
import { IUsuario } from "@/Types/IUsuario";
import getAllUser from "@/services/getAllUser";
import getAllNotasByIdEncargo from "@/services/getAllNotasByIdEncargo";
import Notas from "@/components/notas/notas";
import { INotas } from "@/Types/INotas";
import Anexos from "@/components/anexos/anexos";
import FormDelegarEncargo from "@/components/formDelegarEncargo/formDelegarEncargo";

interface Params {
	params: { idEncargo: number };
}

export default function EncargoID({ params: { idEncargo } }: Params) {
	const { idUsuario } = useContextLogin();

	if (idUsuario === -1) {
		redirect("/login");
	}

	const [encargo, setEncargo] = useState<IEncargo>([]);
	const [encargoAnexos, setEncargoAnexos] = useState<IEncargoAnexo[]>([]);

	const [notas, setNotas] = useState<INotas[]>([]);

	const [hide, setHide] = useState(true);
	const [configuracion, setConfiguracion] = useState(true);
	const [delegar, setDelegar] = useState(true);

	const handleNewUserResponsable = async () => {
		try {
			const resData = await newResponsable(idEncargo, idUsuario);
			if (resData == 200) {
				console.log("se registro el nuevo responsable");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleHide = () => {
		setHide(!hide);
		setConfiguracion(true);
		setDelegar(true);
	};
	const handleConfiguracion = () => {
		setConfiguracion(!configuracion);
		setHide(true);
		setDelegar(true);
	};

	const handleDelegar = () => {
		setDelegar(!delegar);
		setConfiguracion(true);
		setHide(true);
	};

	useEffect(() => {
		const fetch = async () => {
			try {
				const [encargoData] = await getEncargoByID(idEncargo);
				const anexoData = await getEncargosAnexosByIDEncargo(idEncargo);
				const notasData = await getAllNotasByIdEncargo(idEncargo);
				setEncargo(encargoData);
				setEncargoAnexos(anexoData);
				setNotas(notasData);
			} catch (error) {
				setEncargo([]);
				setEncargoAnexos([]);
				setNotas([]);
			}
		};
		fetch();
		console.log("hola cargue");
	}, []);

	return (
		<div>
			<Link
				href={"/Encargos"}
				className={style.link}
			>
				<Image
					className={style.image}
					width={30}
					height={30}
					alt="<-"
					src={backrow}
				></Image>{" "}
			</Link>
			<div className={style.container}>
				{configuracion ? null : (
					<FormUpdateEncargo
						tituloEncargo={encargo.tituloEncargo}
						descripcionEncargo={encargo.descripcionEncargo}
						idEstado={encargo.idEstado}
						idTipo={encargo.idTipo}
						idInstitucion={encargo.idInstitucion}
						idUsuarioResponsable={encargo.idUsuarioResponsable}
						idEncargo={encargo.idEncargo}
						idMotivo={encargo.idMotivo}
						setEncargo={setEncargo}
					></FormUpdateEncargo>
				)}
				{delegar ? null : (
					<FormDelegarEncargo
						idUsuario={idUsuario}
						tituloEncargo={encargo.tituloEncargo}
						descripcionEncargo={encargo.descripcionEncargo}
						idEstado={encargo.idEstado}
						idTipo={encargo.idTipo}
						idInstitucion={encargo.idInstitucion}
						idEncargo={encargo.idEncargo}
						idMotivo={encargo.idMotivo}
						setEncargo={setEncargo}
						setDelegar={setDelegar}
					></FormDelegarEncargo>
				)}

				<div className={style.header}>
					<h1>
						{encargo.idEncargo} -{" "}
						{encargo.tituloEncargo ? encargo.tituloEncargo : "Sin titulo"}
					</h1>
					{idUsuario == encargo.idUsuarioResponsable ? (
						<div>
							<button
								className={hide ? style.opciones : style.opcionesClick}
								onClick={handleHide}
							>
								⚙
							</button>
							{hide ? null : (
								<div className={style.dropboxButton}>
									<button onClick={handleConfiguracion}>Configuración</button>
									<button onClick={handleDelegar}>Delegar</button>
									<button disabled>Borrar</button>
								</div>
							)}
						</div>
					) : null}
				</div>
				<h2>{encargo.descripcionEncargo}</h2>
				{encargoAnexos.length > 0 ? (
					<div>
						<h3>Archivo del encargo:</h3>
						<div className={style.encargoAnexos}>
							{encargoAnexos.map((i) => {
								return (
									<Anexos
										key={i.idEncargoAnexo}
										urlEncargoAnexo={i.urlEncargoAnexo}
										nombreEncargoAnexo={i.nombreEncargoAnexo}
									></Anexos>
								);
							})}
						</div>
					</div>
				) : null}
				<h3>Estado del Encargo: {encargo.nombreEstado}</h3>
				<h3>Tipo del Encargo: {encargo.nombreTipo}</h3>
				<h3>Motivo del Encargo: {encargo.nombreMotivo}</h3>
				<h3>Institucion: {encargo.nombreInstitucion}</h3>
				<h3>Creado el: {encargo.fechaCreacionEncargo}</h3>
				<h3>Creado por: {encargo.nombreCreador}</h3>
				<h3>Responsable actual: {encargo.nombreResponsable}</h3>
				<h3>
					{encargo.fechaCierreEncargo
						? `finalizado el: ${encargo.fechaCierreEncargo}`
						: null}
				</h3>
				{encargo.idUsuarioResponsable ? null : (
					<button onClick={handleNewUserResponsable}>Asignarse Encargo</button>
				)}
				{encargo.idUsuarioResponsable == idUsuario ? (
					<div>
						<div></div>
						<div>
							<button>Agregar nota</button>
						</div>
					</div>
				) : null}
			</div>

			<div>
				<h3>Notas del encargo:</h3>
				{notas.map((i) => {
					return (
						<Notas
							key={i.idNota}
							idNota={i.idNota}
							fechaCreacionNota={i.fechaCreacionNota}
							comentarioNota={i.comentarioNota}
							idUsuarioCreador={i.idUsuarioCreador}
						></Notas>
					);
				})}
			</div>
		</div>
	);
}
