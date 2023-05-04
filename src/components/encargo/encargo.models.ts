export interface Encargo {
	tituloEncargo: string;
	idEncargo: number;
	idUsuarioCreador: number;
	idIntitucion: number;
	idEstado: number;
	idTipo: number;
	idUsuarioResponsable: number;
	fechaCierreEncargo: Date;
	descripcionEncargo: string;
	fechaCreacionEncargo: Date;
}
