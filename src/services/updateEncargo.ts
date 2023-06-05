export default async function updateEncargo(
	idEncargo: number,
	tituloEncargo: string,
	descripcionEncargo: string,
	idInstitucion: string,
	idEstado: string,
	idTipo: string,
	idUsuarioResponsable: string,
	idMotivo: string,
	fechaCierreEncargo: boolean = false
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
				idMotivo: parseInt(idMotivo),
				fechaCierreEncargo: fechaCierreEncargo,
			}),
		}
	);

	if (!res.ok) {
		throw new Error("Hubo un error al actualizar los datos del encargo");
	}
	return res.status;
}
