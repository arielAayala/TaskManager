"use client";
import React, { useState, useEffect } from "react";
import Encargo from "../../components/encargo/encargo";
import style from "./tareas.module.css";
import getEncargos from "@/services/getEncargos";
import { IEncargo } from "@/Types/IEncargo";
import { useContextLogin } from "@/context/contextLogin";
import { redirect } from "next/navigation";
import ButtonFilter from "@/components/buttonFilter/ButtonFilter";
import Link from "next/link";

function Encargos() {
	const { idUsuario } = useContextLogin();
	const [encargos, setEncargos] = useState<IEncargo[]>([]);

	const [filtros, setFiltros] = useState({
		idEstado: 0,
		idTipo: 0,
		idMotivo: 0,
		idUsuarioResponsable: 0,
		idInstitucion: 0,
	});

	useEffect(() => {
		const getData = async () => {
			try {
				const data = await getEncargos();
				setEncargos(data);
			} catch (error) {
				setEncargos([]);
			}
		};
		getData();
	}, []);

	if (idUsuario < 1) {
		redirect("/login");
	} else {
		return (
			<div className={style.container}>
				<div className={style.header}>
					<h1> Encargos </h1>
					{idUsuario == 1 ? null : (
						<Link
							className={style.btnAgregar}
							href={"/NuevoEncargo"}
						>
							Agregar Encargo
						</Link>
					)}
				</div>

				<ButtonFilter
					filtros={filtros}
					setFiltros={setFiltros}
				></ButtonFilter>

				<div className={style.encargos}>
					{encargos
						.filter((i) => {
							if (filtros.idEstado == i.idEstado || filtros.idEstado == 0) {
								if (filtros.idTipo == i.idTipo || filtros.idTipo == 0) {
									if (
										filtros.idUsuarioResponsable == i.idUsuarioResponsable ||
										(filtros.idUsuarioResponsable == "null" &&
											i.idUsuarioResponsable == null) ||
										filtros.idUsuarioResponsable == 0
									) {
										if (
											filtros.idMotivo == i.idMotivo ||
											(filtros.idMotivo == "null" && i.idMotivo == null) ||
											filtros.idMotivo == 0
										) {
											if (
												filtros.idInstitucion == i.idInstitucion ||
												filtros.idInstitucion == 0
											) {
												return i;
											}
										}
									}
								}
							}
						})
						.map((i) => {
							return (
								<Encargo
									key={i.idEncargo}
									idEncargo={i.idEncargo}
									tituloEncargo={i.tituloEncargo}
									nombreEstado={i.nombreEstado}
									nombreResponsable={i.nombreResponsable}
									fotoResponsable={i.fotoResponsable}
									fechaCreacionEncargo={i.fechaCreacionEncargo}
									nombreTipo={i.nombreTipo}
									idUsuarioCreador={i.idUsuarioCreador}
									nombreCreador={i.nombreCreador}
									fotoCreador={i.fotoCreador}
									idUsuarioResponsable={i.idUsuarioResponsable}
									nombreInstitucion={i.nombreInstitucion}
									fechaCierreEncargo={i.fechaCierreEncargo}
									descripcionEncargo={i.descripcionEncargo}
									idEstado={i.idEstado}
									idTipo={i.idTipo}
									idInstitucion={i.idInstitucion}
								></Encargo>
							);
						})}
				</div>
			</div>
		);
	}
}

export default Encargos;
