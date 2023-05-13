"use client";
import React, { useState } from "react";
import FormNewEncargo from "./formNewEncargo/formNewEncargo";

function ButtonNewEncargo() {
	const [mostrar, setMostrar] = useState(false);

	return (
		<div>
			<button onClick={() => setMostrar(!mostrar)}>
				{mostrar ? "X" : "Crear Nuevo Encargo"}
			</button>
			{mostrar ? <FormNewEncargo></FormNewEncargo> : null}
		</div>
	);
}

export default ButtonNewEncargo;
