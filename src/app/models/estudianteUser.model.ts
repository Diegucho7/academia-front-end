import { Curso } from "./curso.model";
import { Estudiante } from "./estudiante.model";
import { Periodo } from "./periodo.model";
import { Usuario } from "./usuario.model";

interface _EstudianteUser{
  _id: string,
  nombre: string,
  apellido: string
}
export class  EstudianteAc {
    constructor(
      
      public id: string,
      public usuario?: _EstudianteUser,
      public curso?: Periodo
    ){}
   }

   