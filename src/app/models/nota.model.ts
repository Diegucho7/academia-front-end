import { Curso } from "./curso.model";
import { Materia } from "./materia.model";

interface _NotaUser{
    _id: string,
    nombre: string,
    img: string
}




export class Nota{
        constructor(
            public nombre: string,
            public _id: string,
            public img?: string,
            public usuario?: _NotaUser,
            public curso?: Curso,
            public materia?: Materia

        ){}
        
}