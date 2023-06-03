import React from "react";
import style from "./anexos.module.css";
import word from "../../../public/word.png";
import pdf from "../../../public/pdf.png";
import img from "../../../public/img.png";
import txt from "../../../public/txt.png";
import Image from "next/image";

interface Props {
	urlEncargoAnexo: string;
	nombreEncargoAnexo: string;
}

function Anexos({ urlEncargoAnexo, nombreEncargoAnexo }: Props) {
	let extencionArchivo = nombreEncargoAnexo.split(".").pop();

	return (
		<div
			className={style.container}
			onClick={() =>
				window.open("http://localhost/managerBackend/" + urlEncargoAnexo)
			}
		>
			<Image
				src={
					extencionArchivo === "doc" || extencionArchivo === "docx"
						? word
						: extencionArchivo === "pdf"
						? pdf
						: extencionArchivo === "gif" ||
						  extencionArchivo === "png" ||
						  extencionArchivo === "jpg"
						? img
						: txt
				}
				alt={nombreEncargoAnexo}
			></Image>
			<a
				title={nombreEncargoAnexo}
				target="_blank"
				href={"http://localhost/managerBackend/" + urlEncargoAnexo}
			>
				{nombreEncargoAnexo}
			</a>
		</div>
	);
}

export default Anexos;
