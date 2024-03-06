import { Academia } from './academia.model';
import { Curso } from "./curso.model";

interface _EstudianteUser{
    _id: string,
    nombre: string,
    img: string
}




export class Estudiante{
        constructor(
            public nombre: string,
            public _id: string,
            public img?: string,
            public usuario?: _EstudianteUser,
            public curso?: Curso,
            public academia?: Academia

        ){}
        
}