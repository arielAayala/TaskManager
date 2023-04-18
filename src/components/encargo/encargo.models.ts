export interface Encargo {
    idEncargo:number,
    idUsuarioCreador:number,
    idIntitucion:number,
    idEstado:number,
    idTipo:number,
    idUsuarioResponsable:number,
    fechaCierreEncargo:Date,
    descripcionEncargo:string,
    fechaCreacionEncargo:Date,
}