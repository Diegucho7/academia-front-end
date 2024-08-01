import { Estudiante } from './../models/estudiante.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Periodo } from '../models/periodo.model';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(private http:HttpClient,
    private router:Router) { }

    get token():string{
      return localStorage.getItem('token') || '';  }
  
    get headers(){
                return {
                  headers: {
                  'x-token': this.token
                            }
                      };
                  }

    

cargarEstudiantes( ): Observable<Estudiante[]> {

const url = `${ base_url }/estudiantes`;
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


cargarNotasPorProfesor(id:String){
  const url = `${ base_url }/todo/coleccion/profesores/${id}`;
  return this.http.get<{ ok: boolean, resultados: Periodo[] }>(url,
  {
  headers: {
    'x-token': this.token 
  }
  })
  .pipe(
    map( (resp: { ok: boolean, resultados: Periodo[] } ) => resp.resultados )
  );
}

cargarEstudiantesPorNotas(id:string ): Observable<Estudiante[]> {
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
cargarPeriodosPorId(id:string ): Observable<Periodo[]> {

const url = `${ base_url }/todo/coleccion/periodos/${id}`;
return this.http.get<{ ok: boolean, resultados: Periodo[] }>(url,
{
headers: {
  'x-token': this.token 
}
})
.pipe(
  map( (resp: { ok: boolean, resultados: Periodo[] } ) => resp.resultados )
);


}
obtenerEstudiantePorId(id:string): Observable<Estudiante> {

  const url = `${ base_url }/estudiantes/${id}`;
  return this.http.get<{ ok: boolean, estudiante: Estudiante }>(url,
    this.headers)
    .pipe(
      map( (resp: { ok: boolean, estudiante: Estudiante } ) => resp.estudiante )
    );


}

obtenerEstudiantePorCurso(id:string): Observable<Estudiante[]> {

const url = `${ base_url }/todo/coleccion/notas/${id}`;
return this.http.get<{ ok: boolean, resultados: Estudiante[] }>(url,
  this.headers)
  .pipe(
    map( (resp: { ok: boolean, resultados: Estudiante []} ) => resp.resultados )
  );
}

obtenerEstudiantePorCursoId(id:string): Observable<Estudiante> {

const url = `${ base_url }/estudiantes/curso/${id}`;
return this.http.get<{ ok: boolean, estudiante: Estudiante }>(url,
this.headers)
.pipe(
  map( (resp: { ok: boolean, estudiante: Estudiante } ) => resp.estudiante )
);


}

crearEstudiante(estudiante:{nombre:string, curso:string} ) {

const url = `${ base_url }/estudiantes`;
return this.http.post<{ ok: boolean, estudiantes: Estudiante[] }>(url,estudiante,this.headers);


}
actualizarEstudiante(estudiante: Estudiante ) {

const url = `${ base_url }/estudiantes/${estudiante._id}`;
return this.http.put<{ ok: boolean, estudiantes: Estudiante[] }>(url,estudiante,this.headers);


}
borrarEstudiante(_id:string) {

const url = `${ base_url }/estudiantes/${_id}`;
return this.http.delete(url,this.headers);


}
}
