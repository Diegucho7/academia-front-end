
import { Periodo } from "./periodo.model";
import { User } from "./usuario.model";

interface _NotaUser{
    _id: string,
    nombre: string,
    apellido: string
}




export class Nota{
        constructor(
           
            public _id: string,
        
            public estudiante?: User,
            public periodo?: Periodo,
            public modulos?: number[]

        ){}
        
}