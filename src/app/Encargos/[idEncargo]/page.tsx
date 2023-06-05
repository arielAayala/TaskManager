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
import getAllNotasByIdEncargo from "@/services/getAllNotasByIdEncargo";
import Notas from "@/components/notas/notas";
import { INotas } from "@/Types/INotas";
import Anexos from "@/components/anexos/anexos";
import FormDelegarEncargo from "@/components/formDelegarEncargo/formDelegarEncargo";
import FormNewNota from "@/components/formNewNota/formNewNota";
import foto from "../../../../public/perfilDefautl.png";
import updateEncargo from "@/services/updateEncargo";

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
	const [nota, setNota] = useState(true);
	const [hideNota, setHideNota] = useState(true);

	const handleNewUserResponsable = async () => {
		try {
			const resData = await newResponsable(idEncargo, idUsuario);
			if (resData == 200) {
				console.log("se registro el nuevo responsable");
			}
			const [encargoData] = await getEncargoByID(idEncargo);
			const notasData = await getAllNotasByIdEncargo(idEncargo);
			setEncargo(encargoData);
			setNotas(notasData);
		} catch (error) {
			console.log(error);
		}
	};

	const handleHide = () => {
		setHide(!hide);
		setConfiguracion(true);
		setDelegar(true);
		setNota(true);
	};

	const handleConfiguracion = () => {
		setConfiguracion(!configuracion);
		setHide(true);
		setDelegar(true);
		setNota(true);
	};

	const handleDelegar = () => {
		setDelegar(!delegar);
		setConfiguracion(true);
		setHide(true);
		setNota(true);
	};

	const handleNota = () => {
		setNota(!nota);
		setConfiguracion(true);
		setDelegar(true);
		setHide(true);
	};

	useEffect(() => {
		const fetch = async () => {
			try {
				const [encargoData] = await getEncargoByID(idEncargo);
				const anexoData = await getEncargosAnexosByIDEncargo(idEncargo);
				const notasData = await getAllNotasByIdEncargo(idEncargo);
				setNotas(notasData);
				setEncargo(encargoData);
				setEncargoAnexos(anexoData);
			} catch (error) {
				setEncargo([]);
				setEncargoAnexos([]);
				setNotas([]);
			}
		};
		fetch();
		console.log("hola cargue");
	}, []);

	const handleCerrarEncargo = async () => {
		const res = await updateEncargo(
			idEncargo,
			encargo.tituloEncargo,
			encargo.descripcionEncargo,
			encargo.idInstitucion,
			4,
			encargo.idTipo,
			encargo.idUsuarioResponsable,
			encargo.idMotivo,
			true
		);
		if (res === 200) {
			const [encargoData] = await getEncargoByID(idEncargo);
			setEncargo(encargoData);
			const notasData = await getAllNotasByIdEncargo(idEncargo);
			setNotas(notasData);
		} else {
			console.log("error");
		}
	};

	const handleActivarEncargo = async () => {
		const res = await updateEncargo(
			idEncargo,
			encargo.tituloEncargo,
			encargo.descripcionEncargo,
			encargo.idInstitucion,
			1,
			encargo.idTipo,
			encargo.idUsuarioResponsable,
			encargo.idMotivo,
			false
		);
		if (res === 200) {
			const [encargoData] = await getEncargoByID(idEncargo);
			setEncargo(encargoData);
			const notasData = await getAllNotasByIdEncargo(idEncargo);
			setNotas(notasData);
		} else {
			console.log("error");
		}
	};

	return (
		<div className={style.containerEncargo}>
			<Link
				href={"/Encargos"}
				className={style.link}
			>
				<Image
					className={style.image}
					width={50}
					height={50}
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
						setNotas={setNotas}
						setConfiguracion={setConfiguracion}
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
						setNotas={setNotas}
					></FormDelegarEncargo>
				)}
				{nota ? null : (
					<FormNewNota
						idEncargo={encargo.idEncargo}
						idUsuario={idUsuario}
						setNota={setNota}
						setNotas={setNotas}
					></FormNewNota>
				)}
				<div className={style.header}>
					<h2>
						{encargo.idEncargo} -{" "}
						{encargo.tituloEncargo ? encargo.tituloEncargo : "Sin titulo"}{" "}
						{encargo.idEstado == 4 ? "(Encargo Terminado)" : null}
					</h2>
					{idUsuario == encargo.idUsuarioResponsable ? (
						<div>
							<button
								className={hide ? style.opciones : style.opcionesClick}
								onClick={handleHide}
							>
								⚙
							</button>
							{hide ? null : encargo.fechaCierreEncargo ? (
								<div className={style.dropboxButton}>
									<button onClick={handleActivarEncargo}>
										Activar Encargo
									</button>
								</div>
							) : (
								<div className={style.dropboxButton}>
									<button onClick={handleNota}>Agregar Nota</button>
									<button onClick={handleConfiguracion}>Actualizar</button>
									<button onClick={handleDelegar}>Delegar</button>
									<button onClick={handleCerrarEncargo}>Cerrar Encargo</button>
								</div>
							)}
						</div>
					) : null}
				</div>
				<div className={style.descripcion}>
					<h2>Descripción:</h2>
					<h3>{encargo.descripcionEncargo}</h3>
					{encargoAnexos.length > 0 ? (
						<div>
							<h2>Archivo del encargo:</h2>
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
					<h2>Estado del Encargo:</h2>
					<h3>{encargo.nombreEstado}</h3>
					<h2>Tipo del Encargo:</h2> <h3>{encargo.nombreTipo}</h3>
					<h2>Motivo del Encargo: </h2>
					<h3>{encargo.nombreMotivo}</h3>
					<h2>Institucion: </h2>
					<h3>{encargo.nombreInstitucion}</h3>
					<h2>Creado el: </h2>
					<h3>{encargo.fechaCreacionEncargo}</h3>
					{encargo.idUsuarioResponsable ? (
						<div className={style.responsable}>
							<h2>Responsable actual: </h2>
							<div>
								{encargo.fotoResponsable ? (
									<img
										src={encargo.fotoResponsable}
										alt={encargo.nombreResponsable}
										title={encargo.nombreResponsable}
									></img>
								) : (
									<Image
										src={foto}
										alt={encargo.nombreResponsable}
										title={encargo.nombreResponsable}
									></Image>
								)}
							</div>
						</div>
					) : (
						<div className={style.responsable}>
							<h2>Creador: </h2>
							<div>
								{encargo.fotoCreador ? (
									<img
										src={encargo.fotoCreador}
										alt={encargo.nombreCreador}
										title={encargo.nombreCreador}
									></img>
								) : (
									<Image
										src={foto}
										alt={encargo.nombreCreador}
										title={encargo.nombreCreador}
									></Image>
								)}
							</div>
						</div>
					)}
					{encargo.idUsuarioResponsable ? null : (
						<button
							className={style.btnAsignarse}
							onClick={handleNewUserResponsable}
						>
							Asignarse Encargo
						</button>
					)}
				</div>
			</div>
			<button
				className={style.btnHideNota}
				onClick={() => setHideNota(!hideNota)}
			>
				{hideNota
					? "Mostrar Notas Historial (" + notas.length + " Notas)"
					: "Ocultar Notas"}
			</button>
			{!hideNota ? (
				<div className={style.notas}>
					<h3>Notas del encargo:</h3>
					{notas.map((i) => {
						return (
							<Notas
								key={i.idNota}
								fechaCreacionNota={i.fechaCreacionNota}
								comentarioNota={i.comentarioNota}
								idUsuarioCreador={i.idUsuarioCreador}
								nombreCreador={i.nombreCreador}
								fotoCreador={i.fotoCreador}
								idNuevoResponsable={i.idNuevoResponsable}
								nombreNuevoResponsable={i.nombreNuevoResponsable}
								fotoNuevoResponsable={i.fotoNuevoResponsable}
								notasAnexo={i.notasAnexo}
							></Notas>
						);
					})}
				</div>
			) : null}
		</div>
	);
}
