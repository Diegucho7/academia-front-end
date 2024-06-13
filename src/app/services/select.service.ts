import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Country,  SmallCountry, SmallUser } from '../interfaces/country.interfaces';
import { Observable, combineLatest, map, of } from 'rxjs';
import { Credenciales, User, Usuario } from '../models/usuario.model';
import { Periodo } from '../models/periodo.model';
import { EstudianteAc } from '../models/estudianteUser.model';
import { Estudiante } from '../models/estudiante.model';

@Injectable({
  providedIn: 'root'
})
export class SelectService {
  public usuario!: Usuario;
  private baseUrl: string = 'http://localhost:3000/api/estudiantes';
  private base: string = 'http://localhost:3000/api/usuarios';
  // private _periodos: Periodo[] = [ Periodo.Africa, Periodo.Americas,
  //   //  Periodo.Asia, Periodo.Europe, Periodo.Oceania
  //    ];

  constructor(
    private http: HttpClient
  ) { }

  get uid():string{
   
    return this.usuario.uid || '';
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

  // get periodos(): Periodo[] {
  //   return [ ...this._periodos ];
  // }

  // getCountriesByRegion( periodo: Periodo ): Observable<EstudianteAc[]> {
  //   if ( !periodo ) return of([]);

  //   const url: string = `${ this.baseUrl }/curso/${ periodo }`;

  //   return this.http.get<{ok: boolean, estudiante: Estudiante[]}>(url,
  //     this.headers
  //   )
  //   .pipe(
  //     map( estudiante  => estudiante.estudiante.map(user => (
  //       {
  //         id: user._id ,
  //        usuario: user.usuario!
  //       })
        
  //     ) )
  //   );
  // }
  getEstudiantebyCurse( periodo: EstudianteAc[] ){
    if ( !periodo ) return of([]);

    const url: string = `${ this.baseUrl }/curso/${ periodo }`;

    return this.http.get<{ok: boolean, estudiante: Estudiante[]}>(url,
          this.headers
        )
    .pipe(
      map( estudiante  => estudiante.estudiante.map(user => (
              {
                id: user._id ,
               usuario: user.usuario
              })
              
        
      ) )
    );
    
    

  }

  // getCountryByAlphaCode( estudiante: string ): Observable<Usuar[]>  {
  //   const url = `${ this.base }/${ estudiante }`;
  //   return this.http.get<{ok: boolean, usuarios:  User []   }>(url,
  //       this.headers)
  //       .pipe(
  //         map( estudiante  => estudiante.usuarios.map(user => (
  //                 {
  //                   id: user.uid ?? [] ,
  //                  nombre: user.nombre ?? [],
  //                  apellido: user.apellido ?? []
  //                 })
                  
            
  //         ) )
  //       );
        
  //       }

  getCountryBordersByCodes( estudiante: string[] ): Observable<Credenciales[]> {
    if ( !estudiante || estudiante.length === 0 ) return of([]);

    const countriesRequests:Observable<Credenciales> [] = [];

    estudiante.forEach( code => {
      // const request = this.getCountryByAlphaCode( code );
      // countriesRequests.push( request );
    });


    return combineLatest( countriesRequests );
  }


}
