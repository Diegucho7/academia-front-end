import { Usuario } from "../models/usuario.model";

export interface CargarUsuario{

    total:number,
    usuarios: Usuario[]

}
export interface CargarUsuarioCategoria{

    ok:boolean,
    usuarios: Usuario[]

}