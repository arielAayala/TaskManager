export default async function insertNewEncargo(
	tituloEncargo: string,
	idUsuarioCreador: number,
	idInstitucion: number,
	idEstado: number,
	idTipo: number,
	idUsuarioResponsable: number | null,
	descripcionEncargo: string
) {
	const fechaCreacionEncargo: string = new Date().toISOString().split("T")[0];

	if (
		!tituloEncargo ||
		!idUsuarioCreador ||
		!idInstitucion ||
		!idEstado ||
		!idTipo
	) {
		throw new Error(
			"La debe rellenar todas los datos necesarios para crear un encargo nuevo"
		);
	}
	console.log({
		tituloEncargo: tituloEncargo,
		idUsuarioCreador: idUsuarioCreador,
		idInstitucion: idInstitucion,
		idEstado: idEstado,
		idTipo: idTipo,
		idUsuarioResponsable: idUsuarioResponsable,
		descripcionEncargo: descripcionEncargo,
		fechaCreacionEncargo: fechaCreacionEncargo,
	});

	const res = await fetch("http://localhost/managerBackend/Encargos.php", {
		method: "POST",
		body: JSON.stringify({
			tituloEncargo: tituloEncargo,
			idUsuarioCreador: idUsuarioCreador,
			idInstitucion: parseInt(idInstitucion),
			idEstado: parseInt(idEstado),
			idTipo: parseInt(idTipo),
			idUsuarioResponsable: parseInt(idUsuarioResponsable),
			descripcionEncargo: descripcionEncargo,
			fechaCreacionEncargo: fechaCreacionEncargo,
		}),
	});
	if (!res.ok) {
		throw new Error("Error al crear el encargo");
	}
	return res.status;
}
