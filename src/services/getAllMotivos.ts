export default async function getAllMotivos() {
	const res = await fetch("http://localhost/managerBackend/Motivos.php");

	if (!res.ok) {
		throw new Error("Error al cargar datos");
	}
	return res.json();
}
