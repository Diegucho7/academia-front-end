import { Nota } from './../models/nota.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class NotaService {

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

                  cargarNotas( ): Observable<Nota[]> {
 
                    const url = `${ base_url }/notas`;
                    return this.http.get<{ ok: boolean, notas: Nota[] }>(url,
                        {
                          headers: {
                            'x-token': this.token
                          }
                        })
                          .pipe(
                            map( (resp: { ok: boolean, notas: Nota[] } ) => resp.notas )
                          );
                          
                 
                  }
                  obtenerNotaPorId(id:string ): Observable<Nota> {
                 
                    const url = `${ base_url }/notas/${id}`;
                    return this.http.get<{ ok: boolean, nota: Nota }>(url,
                        this.headers)
                          .pipe(
                            map( (resp: { ok: boolean, nota: Nota } ) => resp.nota )
                          );
                          
                 
                  }
                
                  crearNota(nota:{nombre:string, apellido: string, academia:string} ) {
                 
                    const url = `${ base_url }/notas`;
                    return this.http.post<{ ok: boolean, nota: Nota[] }>(url,nota,this.headers);
                         
                 
                  }
                  actualizarNota(nota: Nota ) {
                 
                    const url = `${ base_url }/notas/${nota._id}`;
                    return this.http.put<{ ok: boolean, notas: Nota[] }>(url,nota,this.headers);
                         
                 
                  }
                  borrarNota(_id:string) {
                 
                    const url = `${ base_url }/notas/${_id}`;
                    return this.http.delete(url,this.headers);
                         
                 
                  }
    
}
