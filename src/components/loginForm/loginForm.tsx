"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import style from "./login.module.css";

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

	return (
		<>
			<form
				className={style.loginForm}
				onSubmit={handleSubmit}
			>
				<input
					className={style.loginInput}
					type="text"
					name="email"
					placeholder="Correo@devtics.com"
					onChange={handleChange}
				/>
				<input
					className={style.loginInput}
					type="text"
					name="password"
					placeholder="Contraseña"
					onChange={handleChange}
				/>
				<button
					type="submit"
					className={style.loginButton}
				>
					Ingresar
				</button>
			</form>
		</>
	);
}

export default LoginForm;
