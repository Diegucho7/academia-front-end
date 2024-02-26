import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';
import { Academia } from '../models/academia.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class AcademiaService {

  constructor(
        private http:HttpClient,
        private router:Router,

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


  cargarAcademias( ): Observable<Academia[]> {
 
    const url = `${ base_url }/academias`;
    return this.http.get<{ ok: boolean, academias: Academia[] }>(url,
        {
          headers: {
            'x-token': this.token
          }
        })
          .pipe(
            map( (resp: { ok: boolean, academias: Academia[] } ) => resp.academias )
          );
          
 
  }
  crearAcademia(nombre:string ) {
 
    const url = `${ base_url }/academias`;
    return this.http.post<{ ok: boolean, academias: Academia[] }>(url,{nombre},this.headers);
         
 
  }
  actualizarAcademia(_id:string, nombre:string) {
 
    const url = `${ base_url }/academias/${_id}`;
    return this.http.put<{ ok: boolean, academias: Academia[] }>(url,{nombre},this.headers);
         
 
  }
  borrarAcademia(_id:string) {
 
    const url = `${ base_url }/academias/${_id}`;
    return this.http.delete<{ ok: boolean, academias: Academia[] }>(url,this.headers);
         
 
  }
}


