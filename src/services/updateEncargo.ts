export default async function updateEncargo(
	idEncargo: string,
	tituloEncargo: string,
	descripcionEncargo: string,
	idInstitucion: string,
	idEstado: string,
	idTipo: string,
	idUsuarioResponsable: string
) {
	const res = await fetch(
		`http://localhost/managerBackend/Encargos.php?idEncargo=${idEncargo}`,
		{
			method: "PUT",
			body: JSON.stringify({
				tituloEncargo: tituloEncargo,
				descripcionEncargo: descripcionEncargo,
				idInstitucion: parseInt(idInstitucion),
				idEstado: parseInt(idEstado),
				idTipo: parseInt(idTipo),
				idUsuarioResponsable: parseInt(idUsuarioResponsable),
			}),
		}
	);
	console.log(res.body);

	if (!res.ok) {
		throw new Error("Hubo un error al actualizar los datos del encargo");
	}
	return res.status;
}
