export default async function getAllUser() {
	const res = await fetch("http://localhost/managerBackend/Usuarios.php");

	if (!res.ok) {
		throw new Error("Error en la obtencion de datos");
	}

	return res.json();
}
