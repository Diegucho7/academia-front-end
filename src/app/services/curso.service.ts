import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Curso} from '../models/curso.model'
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class CursoService {


  constructor(
                private http:HttpClient,
                private router:Router
  ) { 
  }



  get token():string{
    return localStorage.getItem('token') || '';  }

  get headers(){
              return {
                headers: {
                'x-token': this.token
                          }
                    };
                }


  
                cargarCursos( ): Observable<Curso[]> {
 
                  const url = `${ base_url }/cursos`;
                  return this.http.get<{ ok: boolean, cursos: Curso[] }>
                  
                  (url,
                      {
                        headers: {
                          'x-token': this.token
                        }
                      })
                        .pipe(
                          map( (resp: { ok: boolean, cursos: Curso[] } ) => resp.cursos )
                        );
                        
               
                }
                crearCurso(curso:string ) {
               
                  const url = `${ base_url }/cursos`;
                  return this.http.post<{ ok: boolean, cursos: Curso[] }>(url,curso,this.headers);
     
               
                }
                actualizarCurso(_id:string, nombre:string) {
               
                  const url = `${ base_url }/cursos/${_id}`;
                  return this.http.put<{ ok: boolean, cursos: Curso[] }>(url,{nombre},this.headers);
                       
               
                }
                borrarCurso(_id:string) {
               
                  const url = `${ base_url }/cursos/${_id}`;
                  return this.http.delete<{ ok: boolean, cursos: Curso[] }>(url,this.headers);
                       
               
                }

}
