import { Pago } from "./pago.model";
import { Periodo } from "./periodo.model";
import { User, Usuario } from "./usuario.model";


interface _NotaUser{
    _id: string,
    nombre: string,
    apellido: string
}

export class Recibo{
    constructor(
       
        public _id: string,
        public usuario?: Usuario,
        
        public valor?: Number,
        public img?: string,
        public pago?: Pago,
        // public referencia?: string,
        public fecha?: Date,
        public aprobado?: boolean 

    ){}
    
}