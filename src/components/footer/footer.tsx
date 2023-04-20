import React from "react";
import style from "./footer.module.css";
import Link from "next/link";

function Footer() {
	return (
		<div className={style.container}>
		<footer className={style.section}>
			<ul className={style.social_Icon}>
				<li><a href="#"></a></li>
				<li><a href="#"></a></li>
				<li><a href="#"></a></li>
				<li><a href="#"></a></li>
			</ul>
			<ul className={style.menu}>
				<li>
					<Link 
						href="https://es-la.facebook.com/Setic-Formosa-232576567206922/" 
						className={style.footerElements}> Contacto
					</Link>
				</li>
				<li>
					<Link 
						href="/"
						className={style.footerElements}> Devtics 
					</Link>
				</li>
				<li>
					<Link
						className={style.footerElements}
						target="_blank"
						href="https://www.google.com/maps/place/Junta+Clasificaci%C3%B3n+Secundaria+Monoblocks/@-26.1885262,-58.1760779,18.25z/data=!4m6!3m5!1s0x945ca5e31ae7c5ad:0xae12dda89c394f16!8m2!3d-26.1881931!4d-58.1758632!16s%2Fg%2F11d_x329zk?hl=es"> Ubicación
					</Link>
				</li>
			</ul>
			<p> Todos los derechos reservados | 2023 | Lambda Team </p>
		</footer>
		</div>
	);
}

export default Footer;
