"use client";
import { IEncargo } from "@/Types/IEncargo";
import getEncargoByID from "@/services/getEncargoByID";
import React, { useEffect, useState } from "react";
import style from "./idEncargo.module.css";
import Image from "next/image";
import Link from "next/link";
import backrow from "../../../../public/atras.png";
import { IEncargoAnexo } from "@/Types/IEncargoAnexo";
import getAnexoByIDEncargo from "@/services/getAnexoByIDEncargo";
import { useContextLogin } from "@/context/contextLogin";
import { redirect } from "next/navigation";
import FormUpdateEncargo from "@/components/FormUpdateEncargo/FormUpdateEncargo";
import newResponsable from "@/services/newResponsable";
import { IUsuario } from "@/Types/IUsuario";
import getAllUser from "@/services/getAllUser";
import getAllNotasByIdEncargo from "@/services/getAllNotasByIdEncargo";
import Notas from "@/components/notas/notas";
import { INotas } from "@/Types/INotas";

interface Params {
	params: { idEncargo: string };
}

export default function EncargoID({ params: { idEncargo } }: Params) {
	const { idUsuario } = useContextLogin();

	if (idUsuario === -1) {
		redirect("/login");
	}

	const [encargo, setEncargo] = useState<IEncargo>([]);
	const [anexosEncargo, setAnexosEncargo] = useState<IEncargoAnexo[]>([]);
	const [usuario, setUsuario] = useState<IUsuario[]>([]);
	const [notas, setNotas] = useState<INotas[]>([]);

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

	useEffect(() => {
		const fetch = async () => {
			try {
				const [encargoData] = await getEncargoByID(idEncargo);
				const anexoData = await getAnexoByIDEncargo(idEncargo);
				const usuarioData = await getAllUser();
				const notasData = await getAllNotasByIdEncargo(idEncargo);
				setEncargo(encargoData);
				setAnexosEncargo(anexoData);
				setUsuario(usuarioData);
				setNotas(notasData);
			} catch (error) {
				setEncargo([]);
				setAnexosEncargo([]);
				setUsuario([]);
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
				<h1>
					{encargo.idEncargo} -{" "}
					{encargo.tituloEncargo ? encargo.tituloEncargo : "Sin titulo"}
				</h1>
				{idUsuario == encargo.idUsuarioResponsable ? (
					<FormUpdateEncargo
						tituloEncargo={encargo.tituloEncargo}
						descripcionEncargo={encargo.descripcionEncargo}
						idEstado={encargo.idEstado}
						idTipo={encargo.idTipo}
						idInstitucion={encargo.idInstitucion}
						idUsuarioResponsable={encargo.idUsuarioResponsable}
						idEncargo={encargo.idEncargo}
					></FormUpdateEncargo>
				) : null}
				<h2>{encargo.descripcionEncargo}</h2>
				<h3>Archivo del encargo:</h3>
				<div>
					{anexosEncargo.map((i) => {
						return (
							<div key={i.idEncargoAnexo}>
								<h3>
									{i.idEncargoAnexo} - url: {i.urlEncargoAnexo}
								</h3>
							</div>
						);
					})}
				</div>
				<h3>Estado del Encargo: {encargo.nombreEstado}</h3>
				<h3>Tipo del Encargo: {encargo.nombreTipo}</h3>
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
						<div>
							Delegar a:
							<select name="idUsuarioResponsable">
								{usuario.map((i) => {
									if (i.idUsuario == idUsuario) {
										return null;
									}
									return (
										<option
											value={i.idUsuario}
											key={i.idUsuario}
										>
											{i.nombrePsicopedagogo}
										</option>
									);
								})}
							</select>
							<button>Confirmar </button>
						</div>
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
