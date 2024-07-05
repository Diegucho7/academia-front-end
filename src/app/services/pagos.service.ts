import { Pago } from './../models/pago.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
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

                  cargarPagos( ): Observable<Pago[]> {
 
                    const url = `${ base_url }/pagos`;
                    return this.http.get<{ ok: boolean, pagos: Pago[] }>(url,
                        {
                          headers: {
                            'x-token': this.token
                          }
                        })
                          .pipe(
                            map( (resp: { ok: boolean, pagos: Pago[] } ) => resp.pagos )
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
