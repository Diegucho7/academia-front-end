import { Academia } from './academia.model';
import { Curso } from './curso.model';
import { Periodo } from './periodo.model';

interface _EstudianteUser{
    _id: string,
    nombre: string,
    img: string
}




export class Estudiante{
        constructor(

            public _id: string,
            public usuario?: _EstudianteUser,
            public curso?: Periodo,
            // public nombreCurso?: Curso
         

        ){}
        
}