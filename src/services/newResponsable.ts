export default async function newResponsable(
	idEncargo: any,
	idUsuarioResponsable: any
) {
	const res = await fetch(
		`http://localhost/managerBackend/Encargos.php?idEncargo=${idEncargo}`,
		{
			method: "PATCH",
			body: JSON.stringify({
				idUsuarioResponsable: parseInt(idUsuarioResponsable),
			}),
		}
	);
	if (!res.ok) {
		throw new Error("Error al asignarse un nuevo Responsable al encargo");
	}
	return res.status;
}
