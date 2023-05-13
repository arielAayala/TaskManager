export default async function getAllInstituciones() {
	const res = await fetch("http://localhost/managerBackend/Instituciones.php");
	if (!res.ok) {
		throw new Error("Error al cargar las instituciones");
	}
	return res.json();
}
