export default async function getEncargos() {
	const res = await fetch("http://192.168.1.10/managerBackend/Encargos.php", {
		cache: "no-store",
	});

	if (!res.ok) throw new Error("error al obtener las tareas");

	return res.json();
}
