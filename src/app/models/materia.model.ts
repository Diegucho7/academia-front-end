import { Curso } from "./curso.model";

interface _MateriaUser{
    _id: string,
    nombre: string,
    img: string
}




export class Materia{
        constructor(
            public nombre: string,
            public _id: string,
            public img?: string,
            public usuario?: _MateriaUser,
            public curso?: Curso

        ){}
        
}