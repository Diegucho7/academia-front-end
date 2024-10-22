import { Component , OnInit} from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UsuarioService } from '../../services/usuario.service';
import { Mensaje } from '../../interfaces/mensaje.interface';



@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styles: ``
})
export class ChatsComponent  {
  mensaje: string = '';
  elemento: any;
  public uid : string = ''; 
  public nombre : string = ''; 
  public apellido : string = ''; 
  public role : string = ''; 
  // public chatss : Observable<any[]>
  constructor(public _cs: ChatService, db: AngularFirestore, private usuarioService: UsuarioService) {

    // this.chats = db.collection('chats').valueChanges();
    this._cs.cargarMensajes().subscribe( ()=>{

      
                    setTimeout(() => {
                      this.elemento.scrollTop = this.elemento.scrollHeight
                      
                    },20);
    } )


  }
  ngOnInit(): void {
    this.uid = this._cs.usuarioService.uid;
    this.nombre = this._cs.usuarioService.nombre;
    
    this.apellido = this._cs.usuarioService.apellido;
    // this.role = this._cs.usuarioService.role;
    // console.log(this.uid);
    // console.log(this.nombre);
    // console.log(this.apellido);

    this.elemento = document.getElementById('app-mensajes');
  }
  filtrarChats() {
    if(this._cs.usuarioService.role === 'ADMIN_ROLE'){
      // console.log("Aqui desde Admin");
      return this._cs.chats
    }
    console.log(this._cs.chats);
    return this._cs.chats.filter(chat => chat.uid == this.uid || chat.uid == this._cs.usuario.uid || chat.for == this.usuarioService.uid  || chat.for == this._cs.usuario.uid );
  }
  enviar_mensaje() {
    if (this.mensaje.length === 0) {
      return;
    }
    this._cs.agregarMensajes(this.mensaje, "admin")?.
                                            then(() =>  this.mensaje = '').
                                            catch(error => console.log(error));
   
    console.log(this.mensaje);
  }
}
