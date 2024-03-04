import { Materia } from './../models/materia.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class MateriaService {

 
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

    

cargarMaterias( ): Observable<Materia[]> {

const url = `${ base_url }/materias`;
return this.http.get<{ ok: boolean, materias: Materia[] }>(url,
{
headers: {
  'x-token': this.token 
}
})
.pipe(
  map( (resp: { ok: boolean, materias: Materia[] } ) => resp.materias )
);


}
obtenerMateriaPorId(id:string ): Observable<Materia> {

const url = `${ base_url }/materias/${id}`;
return this.http.get<{ ok: boolean, materia: Materia }>(url,
this.headers)
.pipe(
  map( (resp: { ok: boolean, materia: Materia } ) => resp.materia )
);


}

crearMateria(materia:{nombre:string, curso:string} ) {

const url = `${ base_url }/materias`;
return this.http.post<{ ok: boolean, materias: Materia[] }>(url,materia,this.headers);


}
actualizarMateria(materia: Materia ) {

const url = `${ base_url }/materias/${materia._id}`;
return this.http.put<{ ok: boolean, materias: Materia[] }>(url,materia,this.headers);


}
borrarMateria(_id:string) {

const url = `${ base_url }/materias/${_id}`;
return this.http.delete(url,this.headers);


}
}
