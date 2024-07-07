import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Profesor } from '../models/profesor.model';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  constructor(private http:HttpClient,
              private router:Router
              ) { }


              get token():string{
                return localStorage.getItem('token') || '';  }
            
              get headers(){
                          return {
                            headers: {
                            'x-token': this.token
                                      }
                                };
                            }

              

  cargarProfesores( ): Observable<Profesor[]> {
 
    const url = `${ base_url }/profesores`;
    return this.http.get<{ ok: boolean, profesores: Profesor[] }>(url,
        {
          headers: {
            'x-token': this.token
          }
        })
          .pipe(
            map( (resp: { ok: boolean, profesores: Profesor[] } ) => resp.profesores )
          );
          
 
  }
  cargarEstudiantes( ): Observable<Usuario[]> {
 
    const url = `${ base_url }/usuarios/estudiantes`;
    return this.http.get<{ ok: boolean, usuarios: Usuario[] }>(url,
        {
          headers: {
            'x-token': this.token
          }
        })
          .pipe(
            map( (resp: { ok: boolean, usuarios: Usuario[] } ) => resp.usuarios )
          );
          
 
  }
  obtenerProfesorPorId(id:string ): Observable<Profesor> {
 
    const url = `${ base_url }/profesores/${id}`;
    return this.http.get<{ ok: boolean, profesor: Profesor }>(url,
        this.headers)
          .pipe(
            map( (resp: { ok: boolean, profesor: Profesor } ) => resp.profesor )
          );
          
 
  }

  crearProfesor(profesor:{nombre:string, apellido: string, academia:string} ) {
 
    const url = `${ base_url }/profesores`;
    return this.http.post<{ ok: boolean, profesor: Profesor[] }>(url,profesor,this.headers);
         
 
  }
  actualizarProfesor(profesor: Profesor ) {
 
    const url = `${ base_url }/profesores/${profesor._id}`;
    return this.http.put<{ ok: boolean, profesores: Profesor[] }>(url,profesor,this.headers);
         
 
  }
  borrarProfesor(_id:string) {
 
    const url = `${ base_url }/profesores/${_id}`;
    return this.http.delete(url,this.headers);
         
 
  }
}
