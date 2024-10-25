import { Pizarra } from './../models/pizarra.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

import { Observable, map } from 'rxjs';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class PizarraService {

  constructor(
          private http: HttpClient,
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


      cargarPizarra( ): Observable<Pizarra[]> {
 
        const url = `${ base_url }/pizarra`;
        return this.http.get<{ ok: boolean, pizarra: Pizarra[] }>(url,
            {
              headers: {
                'x-token': this.token
              }
            })
              .pipe(
                map( (resp: { ok: boolean, pizarra: any } ) => resp.pizarra )
              );
              
     
      }

      obtenerPizarraPorId(id:string ): Observable<Pizarra> {

        const url = `${ base_url }/pizarra/${id}`;
        return this.http.get<{ ok: boolean, pizarra: Pizarra }>(url,
        this.headers)
        .pipe(
          map( (resp: { ok: boolean, pizarra: Pizarra } ) => resp.pizarra )
          
        );
        
        
        }
      obtenerPizarraPorPeriodo(id:string ): Observable<Pizarra[]> {

        const url = `${ base_url }/todo/coleccion/periodoTareas/${id}`;
        return this.http.get<{ ok: boolean, resultados: Pizarra[] }>(url,
          {
            headers: {
              'x-token': this.token
            }
          })
          // .pipe(
          //   map( (resp: { ok: boolean, pizarra: any } ) =>
          //      resp.pizarra )
          //   );
          .pipe(
            map((resp: { ok: boolean, resultados: Pizarra[] }) => {
              return resp.resultados;
            })
          );
        
        }


  crearPizarra(pizarra:{periodo:string, asunto:string, materia:string} ) {

    const url = `${ base_url }/pizarra`;
    return this.http.post<{ ok: boolean, pizarra: Pizarra[] }>(url,pizarra,this.headers);
    
    
    }

    actualizarPizarra(pizarra: Pizarra ) {
 
      const url = `${ base_url }/pizarra/${pizarra._id}`;
      return this.http.put<{ ok: boolean, pizarra: Pizarra[] }>(url,pizarra,this.headers);
           
   
    }

    borrarPizarra(_id:string) {
 
      const url = `${ base_url }/pizarra/${_id}`;
      return this.http.delete(url,this.headers);
           
   
    }
}
