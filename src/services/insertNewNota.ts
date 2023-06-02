export default async function insertNewNota(
	idEncargo: number,
	idUsuarioCreador: number,
	comentario: string
) {
	const res = await fetch(
		`http://localhost/managerBackend/Notas.php?idEncargo=${idEncargo}`,
		{
			method: "POST",
			body: JSON.stringify({
				idUsuarioCreador: idUsuarioCreador,
				comentarioNota: comentario,
			}),
		}
	);

	if (!res.ok) {
		throw new Error("Error al agregar la nota");
	}

	return res.json();
}
