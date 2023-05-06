import React from "react";
import styles from "./home.module.css";
import Image from "next/image";
import image1 from "../../public/SeTic_Logo.jpg";
import Testimonials from "@/components/testimonials/testimonials";

export const metadata = {
	title: "SeTIC",
};

export default function Home() {
	return (
		<div className={styles.container}>
			<div className={styles.hero}>
				<h1> Bienvenido </h1>
				<p>
					El Servicio Técnico Interdisciplinario Central (Se.T.I.C.), es un
					equipo de apoyo y orientación dependiente del Ministerio de Cultura y
					Educación de la Provincia de Formosa, transversal a todo el Sistema
					Educativo Provincial. Atiende desde el Nivel Inicial hasta el Nivel
					Superior y sus modalidades, contribuyendo al mejoramiento de la
					calidad educativa, los climas institucionales y el fortalecimiento de
					vínculos, a través de un abordaje institucional e integral. Su
					accionar se enmarca en la Resolución N°2.692 del Ministerio de Cultura
					y Educación de la Provincia de Formosa y en Resolución Nacional CFE Nº
					239/14 anexo II.
				</p>
			</div>
			<div className={styles.feature}>
				<Image
					className={styles.imageDetails}
					src={image1}
					alt="Feature"
				></Image>
				<div>
					<h2> SeTIC </h2>
					<p> Servicio Técnico Interdisciplinario Central </p>
				</div>
			</div>
			<Testimonials></Testimonials>
		</div>
	);
}
