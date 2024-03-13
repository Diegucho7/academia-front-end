import { Academia } from "./academia.model";
import { Materia } from "./materia.model";

interface _ProfesorlUser{
    _id: string,
    nombre: string,
    apellido: string;
    img: string
}




export class Profesor{
        constructor(
            public nombre: string,
            public apellido: string,
            public _id: string,
            public img?: string,
            public usuario?: _ProfesorlUser,
            public academia?: Academia,
            public materia?: Materia

        ){}
        
}