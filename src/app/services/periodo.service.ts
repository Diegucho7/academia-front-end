import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Periodo } from '../models/periodo.model';
import { Observable, map } from 'rxjs';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

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


      cargarPeriodos( ): Observable<Periodo[]> {
 
        const url = `${ base_url }/periodos`;
        return this.http.get<{ ok: boolean, periodos: Periodo[] }>(url,
            {
              headers: {
                'x-token': this.token
              }
            })
              .pipe(
                map( (resp: { ok: boolean, periodos: any } ) => resp.periodos )
              );
              
     
      }

      obtenerPeriodoPorId(id:string ): Observable<Periodo> {

        const url = `${ base_url }/periodos/${id}`;
        return this.http.get<{ ok: boolean, periodo: Periodo }>(url,
        this.headers)
        .pipe(
          map( (resp: { ok: boolean, periodo: Periodo } ) => resp.periodo )
          
        );
        
        
        }

  crearPeriodo(periodo:{periodo:string, curso:string, materia:string} ) {

    const url = `${ base_url }/periodos`;
    return this.http.post<{ ok: boolean, periodos: Periodo[] }>(url,periodo,this.headers);
    
    
    }

    actualizarPeriodo(periodo: Periodo ) {
 
      const url = `${ base_url }/periodos/${periodo._id}`;
      return this.http.put<{ ok: boolean, periodo: Periodo[] }>(url,periodo,this.headers);
           
   
    }

    borrarPeriodo(_id:string) {
 
      const url = `${ base_url }/periodos/${_id}`;
      return this.http.delete(url,this.headers);
           
   
    }
}
