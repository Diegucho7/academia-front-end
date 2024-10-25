import { Periodo } from "./periodo.model";
import { User } from "./usuario.model";


interface _PizarraUser{
    _id: string,
    nombre: string,
    apellido: string
}

export class Pizarra{
    constructor(
       
        public _id: string,
    
        public usuario?: _PizarraUser,
        public periodo?: Periodo,
        public asunto?: String,
        public tarea?: String,
        public fecha: Date = new Date(),

    ){}
    


    
}

