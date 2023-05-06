export default async function getPsicopedagogos() {
	const res = await fetch(
		"http://192.168.1.10/managerBackend/psicopedagogos.php",
		{ cache: "no-store" }
	);
	if (!res.ok) throw new Error("Problema al acceder a la base de datos");
	return res.json();
}
