export default async function insertNewInstitucion(
	nombre: any,
	idLocalidad: any,
	nombreResponsable: any,
	domicilio: any
) {
	const res = await fetch("http://localhost/managerBackend/Instituciones.php", {
		method: "POST",
		body: JSON.stringify({
			nombreInstitucion: nombre,
			idLocalidad: idLocalidad,
			responsableInstitucion: nombreResponsable,
			domicilioInstitucion: domicilio,
		}),
	});

	if (!res.ok) throw new Error("Error al agregar una nueva Institución");

	return res.status;
}
