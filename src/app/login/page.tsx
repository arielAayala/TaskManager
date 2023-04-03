import LoginForm from "@/components/loginForm/loginForm";
import React from "react";
import style from "./login.module.css";

function Login() {
	return (
		<div className={style.container}>
			<LoginForm></LoginForm>
		</div>
	);
}

export default Login;
