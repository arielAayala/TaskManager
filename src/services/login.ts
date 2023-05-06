export default async function login(email: string, password: string) {
	const res = await fetch("http://192.168.1.10/managerBackend/Usuarios.php", {
		method: "POST",
		body: JSON.stringify({
			correoUsuario: email,
			contrasenaUsuario: password,
		}),
	});

	if (!res.ok) {
		throw new Error("Error al ingresar");
	}

	return res.json();
}
