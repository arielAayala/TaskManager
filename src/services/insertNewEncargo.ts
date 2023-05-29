export default async function insertNewEncargo(
	tituloEncargo: string,
	idUsuarioCreador: string,
	idInstitucion: string,
	idMotivo: string,
	idTipo: string,
	idUsuarioResponsable: string | null,
	descripcionEncargo: string
) {
	if (!tituloEncargo || !idUsuarioCreador || !idInstitucion || !idTipo) {
		throw new Error(
			"se debe rellenar todas los datos necesarios para crear un encargo nuevo"
		);
	}

	const res = await fetch("http://localhost/managerBackend/Encargos.php", {
		method: "POST",
		body: JSON.stringify({
			tituloEncargo: tituloEncargo,
			idUsuarioCreador: idUsuarioCreador,
			idInstitucion: parseInt(idInstitucion),
			idMotivo: parseInt(idMotivo),
			idTipo: parseInt(idTipo),
			idUsuarioResponsable: idUsuarioResponsable,
			descripcionEncargo: descripcionEncargo,
		}),
	});
	if (!res.ok) {
		throw new Error("Error al crear el encargo");
	}
	return res.json();
}
