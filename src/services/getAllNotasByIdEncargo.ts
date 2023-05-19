export default async function getAllNotasByIdEncargo(idEncargo: any) {
	const res = await fetch(
		`http://localhost/managerBackend/Notas.php?idEncargo=${idEncargo}`
	);
	if (!res.ok) {
		throw new Error("Error al cargar las notas del archivo");
	}
	return res.json();
}
