import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuario, CargarUsuarioCategoria } from '../interfaces/cargar-usuarios.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment  } from '../../environments/environment';
import { Usuario } from '../models/usuario.model';

declare const google:any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!: Usuario;
  
  handleCredentialResponse: any;
  constructor(private http: HttpClient,
    private router: Router,
    private ngZone: NgZone,) {
      
    }

  get token():string{
    return localStorage.getItem('token') || '';  }


  get uid():string{
   
    return this.usuario.uid || '';
  }
  get cedula():string{
   
    return this.usuario.cedula || '';
  }

  get nombre():string{

    return this.usuario.nombre || '';
  }
  get apellido():string{

    return this.usuario.apellido || '';
  }
  get role(): 'ADMIN_ROLE' | 'USER_ROLE' | 'PROFESOR_ROLE' | 'ESTUDIANTE_ROLE'|'CONTADOR_ROLE' | undefined {
    
    return this.usuario.role;
  }

  get headers(){
              return {
                headers: {
                'x-token': this.token
                          }
                    }
                }


  guardarLocalStorage(token:string, menu:any){
    localStorage.setItem('token',token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  validarToken(): Observable<boolean> {
    

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    })
    .pipe(
      map((resp:any)=>{
        
        const {
          nombre,apellido,email,cedula,telefono,img,google,role,academia,estado,uid
        } = resp.usuario;
        
        this.usuario = new Usuario(nombre,apellido,email,cedula,telefono," ",img,google,role,academia,estado,uid);
        this.guardarLocalStorage(resp.token,resp.menu);
        return true;
      }),
      catchError(error => of(false))
    );

  }

  crearUsuario(formData: RegisterForm){

    // console.log('creando usuarios')
  
    return this.http.post(`${ base_url }/usuarios`,formData )
                  .pipe(
                    tap((resp:any) =>{
                      this.guardarLocalStorage(resp.token,resp.menu);
                    }

                    )
                  )
  }

  actualizarPerfil(data:{email:string, nombre:string, role:any}){

    data = {
      ...data,
      role : this.usuario.role
    }
    return this.http.put(`${ base_url }/usuarios/${this.uid}`,data, this.headers );

  }

  login(formData: LoginForm){
    

    return this.http.post(`${ base_url }/login`,formData )
                    .pipe(
                      tap((resp:any) =>{
                        // console.log(resp);
                        localStorage.setItem('email',resp.email);
                        this.guardarLocalStorage(resp.token,resp.menu);
                      }
                      )
                    )
  }

   loginGoogle(token:string){

    
      return this.http.post(`${base_url}/login/google`,{token})
      .pipe(
        tap((resp:any) =>{
          // console.log(resp);
          localStorage.setItem('email',resp.email);
          this.guardarLocalStorage(resp.token,resp.menu);
        }
        )
      )
  
    }


    logout(){
      const email=localStorage.getItem('email')|| '';
      // google.accounts.id.revoke(email,()=> {
      //   this.ngZone.run(()=>{
        //   })
        // })

      //TODO: Borrar menu
      localStorage.removeItem('menu');




        localStorage.removeItem('token');
        // localStorage.removeItem('email');
            this.router.navigateByUrl('/login');
    }

    cargarUsuarios(desde:number = 0 ){
      // localhost:3000/api/usuarios?desde=0
      
      const url = `${base_url}/usuarios?desde=${desde}`;
      
      return this.http.get<CargarUsuario>(url, this.headers)
                      .pipe(
                        map(resp =>{
                          const usuarios = resp.usuarios.map(
                            user => new Usuario(user.nombre, user.apellido, user.email,user.cedula,user.telefono," ",user.img,user.google,user.role,user.academia,user.estado,user.uid)
                            );
                            return {
                              total: resp.total,
                              usuarios
                        
                            };
                        })
                      )
    }
    cargarUsuariosProfesor(desde:number = 0  ){
    
       // localhost:3000/api/usuarios?desde=0
      
       const url = `${base_url}/usuarios/profesores`;
      
       return this.http.get<CargarUsuario>(url, this.headers)
                       .pipe(
                         map(resp =>{
                           const usuarios = resp.usuarios.map(
                             user => new Usuario(user.nombre, user.apellido, user.email,user.cedula,user.telefono," ",user.img,user.google,user.role,user.academia,user.estado,user.uid)
                             );
                             return {
                               total: resp.total,
                               usuarios
                         
                             };
                         })
                       )
     }
    cargarUsuariosEstudiante(id:string )  {
    
       // localhost:3000/api/usuarios?desde=0
      
       const url = `${base_url}/usuarios/${id}`;
      
       return this.http.get<CargarUsuario>(url, this.headers)
                      .pipe(
                        map(resp =>{
                          const usuarios = resp.usuarios.map(
                            user => new Usuario(user.nombre, user.apellido, user.email,user.cedula,user.telefono," ",user.img,user.google,user.role,user.academia,user.estado,user.uid)
                            );
                            return {
                              ok: true,
                              usuarios
                        
                            };
                        })
                      )
                       
     }
    

    eliminarUsuario(usuario:Usuario){
     
      //http://localhost:3000/api/usuarios/65b8490772b9866dff56b511

      const url = `${base_url}/usuarios/${usuario.uid}`;
      return this.http.delete(url, this.headers);

    }

    guardarUsuario(usuario:Usuario){

       
        return this.http.put(`${ base_url }/usuarios/${usuario.uid}`,usuario, this.headers );
    
      
    }

   }
  
