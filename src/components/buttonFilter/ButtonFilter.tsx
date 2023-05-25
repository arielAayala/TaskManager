import { IInstitucion } from "@/Types/IInstitucion";
import { IMotivo } from "@/Types/IMotivo";
import { IUsuarioResponsable } from "@/Types/IUsuario";
import getAllInstituciones from "@/services/getAllInstituciones";
import getAllMotivos from "@/services/getAllMotivos";
import getAllUser from "@/services/getAllUser";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import style from "./buttonFilter.module.css";

const Estado = [
	{ idEstado: 1, nombreEstado: "Pediente" },
	{ idEstado: 2, nombreEstado: "En curso" },
	{ idEstado: 3, nombreEstado: "Demorado" },
	{ idEstado: 4, nombreEstado: "Terminado" },
];

const Tipos = [
	{
		idTipo: 1,
		nombreTipo: "Notas Varias",
	},
	{
		idTipo: 2,
		nombreTipo: "Oficios",
	},
	{
		idTipo: 3,
		nombreTipo: "Expedientes",
	},
	{
		idTipo: 4,
		nombreTipo: "Resoluciones / disposiciones ministeriales",
	},
	{
		idTipo: 5,
		nombreTipo: "Informes varios",
	},
	{
		idTipo: 6,
		nombreTipo: "Llamados telefonicos de asesoramiento de urgencia",
	},
];

interface Props {
	filtros: object;
	setFiltros: Dispatch<SetStateAction<object>>;
}

function ButtonFilter({ filtros, setFiltros }: Props) {
	const [lstInstituciones, setLstInstituciones] = useState<IInstitucion[]>([]);
	const [lstMotivos, setLstMotivos] = useState<IMotivo[]>([]);
	const [lstUsuarios, setLstUsuarios] = useState<IUsuarioResponsable[]>([]);

	const [hide, setHide] = useState(false);

	const handleClick = () => {
		setHide(!hide);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const usuariosData = await getAllUser();
				setLstUsuarios(usuariosData);
				const institucionesData = await getAllInstituciones();
				setLstInstituciones(institucionesData);
				const motivoData = await getAllMotivos();
				setLstMotivos(motivoData);
			} catch (error) {
				setLstUsuarios([]);
				setLstInstituciones([]);
				setLstMotivos([]);
			}
		};
		console.log("carga");

		fetchData();
	}, []);

	const handleChange = (e: any) => {
		setFiltros({ ...filtros, [e.target.name]: e.target.value });
	};

	return (
		<div className={style.component}>
			<button
				className={hide ? style.btnHideActive : style.btnHide}
				onClick={handleClick}
			>
				Filtros ⚙
			</button>
			<div className={style.container}>
				{hide ? null : (
					<div>
						<div className={style.box}>
							<label htmlFor="Estado">Estado</label>
							<select
								name="idEstado"
								defaultValue={0}
								onChange={handleChange}
							>
								<option value={0}>Sin seleccion</option>
								{Estado.map((i) => {
									return (
										<option
											value={i.idEstado}
											key={i.idEstado}
										>
											{i.nombreEstado}
										</option>
									);
								})}
							</select>
						</div>
						<div className={style.box}>
							<label htmlFor="Tipos">Tipo</label>
							<select
								name="idTipo"
								defaultValue={0}
								onChange={handleChange}
							>
								<option value={0}>Sin seleccion</option>
								{Tipos.map((i) => {
									return (
										<option
											value={i.idTipo}
											key={i.idTipo}
										>
											{i.nombreTipo}
										</option>
									);
								})}
							</select>
						</div>
						<div className={style.box}>
							<label htmlFor="Motivos">Motivo</label>
							<select
								name="idMotivo"
								defaultValue={0}
								onChange={handleChange}
							>
								<option value={0}>Sin seleccion</option>
								{lstMotivos.map((i) => {
									return (
										<option
											value={i.idMotivo}
											key={i.idMotivo}
										>
											{i.nombreMotivo}
										</option>
									);
								})}
							</select>
						</div>
						<div className={style.box}>
							<label htmlFor="Institucion">Institucion</label>
							<select
								name="idInstitucion"
								defaultValue={0}
								onChange={handleChange}
							>
								<option value={0}>Sin seleccion</option>
								{lstInstituciones.map((i) => {
									return (
										<option
											value={i.idInstitucion}
											key={i.idInstitucion}
										>
											{i.nombreInstitucion}
										</option>
									);
								})}
							</select>
						</div>
						<div className={style.box}>
							<label htmlFor="Usuario Responsable">Responsable</label>
							<select
								name="idUsuarioResponsable"
								defaultValue={0}
								onChange={handleChange}
							>
								<option value={0}>Sin seleccion</option>
								{lstUsuarios.map((i) => {
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
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default ButtonFilter;
