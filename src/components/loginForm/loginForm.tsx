"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";

interface Input {
	email: string;
	password: string;
}

function LoginForm() {
	const [input, setInput] = useState<Input>({
		email: "",
		password: "",
	});

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInput((previos) => {
			return { ...previos, [e.target.name]: e.target.value };
		});
	};

	console.log(input);

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="email"
					placeholder="Correo@devtics.com"
					onChange={handleChange}
				/>
				<input
					type="text"
					name="password"
					placeholder="Contraseña"
					onChange={handleChange}
				/>
				<button type="submit">Ingresar</button>
			</form>
		</>
	);
}

export default LoginForm;
