import React from "react";
import style from "./footer.module.css";
function Footer() {
	return (
		<footer className={style.container}>
			<div className={style.footerElements}> Contacto</div>
			<div className={style.footerElements}> Devtics </div>
			<div>
				<a
					className={style.footerElements}
					target="_blank"
					href="https://www.google.com/maps/place/Junta+Clasificaci%C3%B3n+Secundaria+Monoblocks/@-26.1885262,-58.1760779,18.25z/data=!4m6!3m5!1s0x945ca5e31ae7c5ad:0xae12dda89c394f16!8m2!3d-26.1881931!4d-58.1758632!16s%2Fg%2F11d_x329zk?hl=es"
				>
					Ubicación
				</a>
			</div>
		</footer>
	);
}

export default Footer;
