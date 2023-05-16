export interface IEncargo {
	idEncargo: number;
	tituloEncargo: string;
	nombreTipo: string;
	nombreEstado: string;
	idUsuarioCreador: number;
	nombreCreador: string;
	fotoCreador: string;
	idUsuarioResponsable: number;
	nombreResponsable: string;
	fotoResponsable: string;
	nombreInstitucion: string;
	fechaCreacionEncargo: string;
	fechaCierreEncargo: string;
	descripcionEncargo: string;
	idEstado: number;
	idTipo: number;
	idInstitucion: number;
}
