import { Curso } from "./curso.model";

interface _MateriaUser{
    _id: string,
    nombre: string,
    img: string
}




export class Materia{
        constructor(
            public _id: string,
            public nombre: string,
            public usuario?: _MateriaUser,
            public curso?: Curso,
            public img?: string,

        ){}
        
}