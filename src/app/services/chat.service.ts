import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Timestamp } from 'firebase/firestore';
import { Mensaje } from '../interfaces/mensaje.interface';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from './usuario.service';
// import * as crypto from 'crypto';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // public user!: Usuario;
  private itemsColection?: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  public usuario: any = {}; 
  public fecha: Date = new Date();
  public uid : string = ''; 
  public nombre : string = ''; 
  public apellido : string = ''; 
  public role : string = ''; 

  constructor(private afs : AngularFirestore, 
              public auth: AngularFireAuth,  
              public usuarioService: UsuarioService) {
                 
                this.auth.authState.subscribe(
    (user) => {
      console.log('Estado del usuario ', this.usuarioService.uid);
      if( !user ) return;

      
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
      
      this.uid = this.usuarioService.uid;
      
      this.apellido = this.usuarioService.apellido;
      this.usuario.role = this.usuarioService.role;
    // this.role = this.usuarioService.role;
    
  }
);  }
;
  login( proveedor: string ){
    let p;
    if( proveedor == 'google'){
      p = new firebase.auth.GoogleAuthProvider();
    }
    else {
      p = new firebase.auth.TwitterAuthProvider();
    }
    this.auth.signInWithPopup( p );
  }
 
  logout(){
    this.usuario = {};
    this.auth.signOut();  }


   
  cargarMensajes() {
    this.itemsColection = this.afs.collection<Mensaje>
                            ('chats', ref=> ref.orderBy('fecha', 'desc').limit(45));
                                return this.itemsColection.valueChanges()
                                .pipe(map((mensajes: Mensaje[]) => {
                                  // console.log(mensajes);

                                  this.chats = [];
                                  for (let mensaje of mensajes) {
                                    this.chats.unshift(mensaje);
                                  }
                               
                                  return this.chats;
     })
  )
                                
  }

  agregarMensajes( texto: string, destino: string) {
    // const codigoUnico = Math.random().toString(36).substr(2, 9);

    // const codigoConversacion = this.generarCodigoConversacion();
    //  console.log(codigoConversacion);

    if( this.usuarioService.role === 'ADMIN_ROLE' ) {
      let Mensaje: Mensaje = {
        for: destino,
        cedula: this.usuarioService.cedula,
        nombre: this.usuarioService.nombre,
        apellido: this.usuarioService.apellido,
        mensaje: texto,
        fecha: new Date(),
        uid: this.usuarioService.uid
      }
  
      return this.itemsColection?.add(Mensaje);

    }
  

    let Mensaje: Mensaje = {
      for:"admin",
      cedula: this.usuarioService.cedula,
      nombre: this.usuarioService.nombre,
      apellido: this.usuarioService.apellido,
      mensaje: texto,
      fecha: new Date(),
      uid: this.usuarioService.uid
    }

    return this.itemsColection?.add(Mensaje);

  }

}
