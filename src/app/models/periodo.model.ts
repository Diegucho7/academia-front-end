import { Academia } from "./academia.model";
import { Curso } from "./curso.model";
import { Profesor } from "./profesor.model";

interface _PeriodoUser{
    _id: string,
    nombre: string,
    img: string
}




export class Periodo{
        constructor(
            public _id: string,
            public anio?: number,
            public mes?: number,
            public usuario?: _PeriodoUser,
            public academia?: Academia,
            public curso?: Curso,
            public profesor?: Profesor,
            public modulos?: number,
            public valor?: number,

        ){}
        
}