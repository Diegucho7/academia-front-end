import { Pago } from './../models/pago.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Estudiante } from '../models/estudiante.model';
const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class PagosService {
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

                  cargarPagos( ): Observable<Estudiante[]> {
 
                    const url = `${ base_url }/estudiantes/`;
                    return this.http.get<{ ok: boolean, estudiantes: Estudiante[] }>(url,
                        {
                          headers: {
                            'x-token': this.token
                          }
                        })
                          .pipe(
                            map( (resp: { ok: boolean, estudiantes: Estudiante[] } ) => resp.estudiantes )
                          );
                          
                      }
                  cargarPagosCurso( id:string): Observable<Estudiante[]> {
 
                    const url = `${ base_url }/todo/coleccion/estudiantes/${id}`;
                    return this.http.get<{ ok: boolean, resultados: Estudiante[] }>(url,
                        {
                          headers: {
                            'x-token': this.token
                          }
                        })
                          .pipe(
                            map( (resp: { ok: boolean, resultados: Estudiante[] } ) => resp.resultados )
                          );
                          
                      }
                  obtenerPagoPorId(id:string ): Observable<Pago> {
                 
                    const url = `${ base_url }/pagos/${id}`;
                    return this.http.get<{ ok: boolean, pago: Pago }>(url,
                        this.headers)
                          .pipe(
                            map( (resp: { ok: boolean, pago: Pago } ) => resp.pago )
                          );
                          
                 
                  }
                  
                
                  crearPago(pago:{nombre:string, apellido: string, academia:string} ) {
                 
                    const url = `${ base_url }/pagos`;
                    return this.http.post<{ ok: boolean, pago: Pago[] }>(url,pago,this.headers);
                         
                 
                  }
                  actualizarPago(pago: Pago ) {
                 
                    const url = `${ base_url }/pagos/${pago._id}`;
                    return this.http.put<{ ok: boolean, pagos: Pago[] }>(url,pago,this.headers);
                         
                 
                  }
                  borrarNota(_id:string) {
                 
                    const url = `${ base_url }/pagos/${_id}`;
                    return this.http.delete(url,this.headers);
                         
                 
                  }
    
}
