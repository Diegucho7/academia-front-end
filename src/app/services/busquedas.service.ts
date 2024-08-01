import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, pipe } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Academia } from '../models/academia.model';
import { Profesor } from '../models/profesor.model';


const base_url = environment.base_url; 

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient ) { }

      get token():string{
        return localStorage.getItem('token') || '';  }
            
        get headers(){
          return {
            headers: {
            'x-token': this.token
                      }
                }
            }

      private transformarUsuarios(resultados: any[]): Usuario[]{

          return resultados.map(
            user => new Usuario(user.estado,user.academia,user.nombre, user.apellido, user.email ,user.cedula,user.telefono,user.img,user.google,user.role,user.uid)
            )
      }


      private transformarAcademias(resultados: any[]): Academia[]{

          return resultados
          .map(
            academia => new Academia(academia.nombre,academia._id,academia.img)
            );
      }
      private transformarProfesores(resultados: any[]): Profesor[]{

          return resultados
          .map(
            profesor => new Profesor(profesor.nombre,profesor.apellido,profesor._id,profesor.img)
            );
      }

      busquedaGlobal(termino:string){
        const url = `${base_url}/todo/${termino}`;
        return this.http.get<any[]>(url, this.headers)
      }

      buscar(
              tipo: 'usuarios'|'profesores'|'academias'|'cursos'|'materias'|'estudiantes',
              termino: string = ''
      ){
        const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
      return this.http.get<any[]>(url, this.headers)
            .pipe(
              map((resp:any) => {
                switch (tipo) {
                  case 'usuarios':
                      return (resp.resultados); 

                      
                  case 'academias':
                    return this.transformarAcademias(resp.resultados);
                   
                  case 'profesores':
                    return this.transformarAcademias(resp.resultados);

                  case 'cursos':
                    return this.transformarAcademias(resp.resultados);
                  case 'estudiantes':
                    return (resp.resultados);
                   

                  default:
                    return [];
                }
              })
            );


      }

}

