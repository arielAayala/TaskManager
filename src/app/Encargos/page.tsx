"use client";
import React, { useState, useEffect } from "react";
import Encargo from "../../components/encargo/encargo";
import style from "./tareas.module.css";
import getEncargos from "@/services/getEncargos";
import { IEncargo } from "@/Types/IEncargo";
import ButtonNewEncargo from "@/components/buttonNewEncargo/buttonNewEncargo";
import { useContextLogin } from "@/context/contextLogin";
import { redirect } from "next/navigation";
import ButtonFilter from "@/components/buttonFilter/ButtonFilter";

function Encargos() {
	const { idUsuario } = useContextLogin();
	const [encargos, setEncargos] = useState<IEncargo[]>([]);

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

	if (idUsuario === -1) {
		redirect("/login");
	} else {
		return (
			<div className={style.container}>
				<div className={style.header}>
					<h1> Encargos </h1>
				</div>
				<div>
					<ButtonNewEncargo></ButtonNewEncargo>
				</div>
				<div>
					{" "}
					<ButtonFilter></ButtonFilter>{" "}
				</div>
				<div>
					{encargos.map((i) => {
						return (
							<Encargo
								key={i.idEncargo}
								idEncargo={i.idEncargo}
								tituloEncargo={i.tituloEncargo}
								nombreEstado={i.nombreEstado}
								nombreResponsable={i.nombreResponsable}
								fotoResponsable={i.fotoResponsable}
								fechaCreacionEncargo={i.fechaCreacionEncargo}
								nombreTipo={""}
								idUsuarioCreador={0}
								nombreCreador={""}
								fotoCreador={""}
								idUsuarioResponsable={0}
								nombreInstitucion={""}
								fechaCierreEncargo={""}
								descripcionEncargo={""}
							></Encargo>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Encargos;
