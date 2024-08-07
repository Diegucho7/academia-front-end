import { Recibo } from './../models/recibo.model';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class RecibosService {
  public actualizacion: EventEmitter<string> = new EventEmitter<string>();

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

                  cargarRecibos( ): Observable<Recibo[]> {
 
                    const url = `${ base_url }/recibos`;
                    return this.http.get<{ ok: boolean, recibos: Recibo[] }>(url,
                        {
                          headers: {
                            'x-token': this.token
                          }
                        })
                          .pipe(
                            map( (resp: { ok: boolean, recibos: Recibo[] } ) => resp.recibos )
                          );
                          
                 
                  }
                  obtenerReciboPorId(id:string ): Observable<Recibo> {
                 
                    const url = `${ base_url }/recibos/${id}`;
                    return this.http.get<{ ok: boolean, recibo: Recibo }>(url,
                        this.headers)
                          .pipe(
                            map( (resp: { ok: boolean, recibo: Recibo } ) => resp.recibo )
                          );       
                    }
                  obtenerReciboPorPagoId(id:string ): Observable<Recibo[]> {
                 
                    const url = `${ base_url }/recibos/pago/${id}`;
                    return this.http.get<{ ok: boolean, recibos: Recibo[] }>(url,
                      {
                        headers: {
                          'x-token': this.token
                        }
                      })
                        .pipe(
                          map( (resp: { ok: boolean, recibos: Recibo[] } ) => resp.recibos )
                        );
                    }
                  
                
                  crearRecibo(valor:number, pago:string ) {
                 
                    const url = `${ base_url }/recibos`;
                    return this.http.post<{ ok: boolean, recibo: Recibo }>(url,{valor,pago},this.headers)
                                        .pipe(
                                          map( (resp: { ok: boolean, recibo: Recibo } ) => resp.recibo._id )
                                        )
                    ;
                         
                 
                  }
                  actualizarRecibo(recibo:Recibo) {
 
                    return this.http.put(`${ base_url }/recibos/${recibo._id}`,recibo, this.headers );

                    // const url = `${ base_url }/recibos/${usuario.uid}`,usuario, this.headers;
                    // return this.http.put<{ ok: boolean, recibo: Recibo[] }>(url, {
                    //   headers: {
                    //     'x-token': this.token
                    //   }
                    // });
                         
                 
                  }

                  guardarAprobado(recibo:Recibo){

       
                    return this.http.put(`${ base_url }/recibos/${recibo._id}`,recibo, this.headers );
                
                  
                }
                  borrarRecibo(recibo:Recibo) {
                 
                    const url = `${ base_url }/recibos/${recibo._id}`;
                    return this.http.delete(url,this.headers);
                         
                 
                  }
}
