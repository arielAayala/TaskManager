"use client";
import { useRouter } from "next/navigation";
import React from "react";
import {lstencargo} from "../../utils/encargo.ts"
import Encargo from "../../components/encargo/encargo"
function Tareas() {
	return(
		<div>
			<h1>Tareas</h1>
			<div>
				{lstencargo.map(i=>{
					return <Encargo key={i.idEncargo} descripcionEncargo={i.descripcionEncargo}></Encargo>
				})}
			</div>
		</div>
	)
}

export default Tareas;
