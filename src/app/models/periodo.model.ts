import { Academia } from "./academia.model";
import { Curso } from "./curso.model";
import { Materia } from "./materia.model";

interface _PeriodoUser{
    _id: string,
    nombre: string,
    img: string
}




export class Periodo{
        constructor(
            public _id: string,
            public anio?: number,
            public usuario?: _PeriodoUser,
            public academia?: Academia,
            public curso?: Curso,
            public materia?: [Materia]

        ){}
        
}