import { Academia } from "./academia.model";

interface _ProfesorlUser{
    _id: string,
    nombre: string,
    img: string
}




export class Profesor{
        constructor(
            public nombre: string,
            public apellido: string,
            public _id: string,
            public img?: string,
            public usuario?: _ProfesorlUser,
            public academia?: Academia

        ){}
        
}