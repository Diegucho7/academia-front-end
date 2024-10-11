import { Component , OnInit} from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UsuarioService } from '../../services/usuario.service';



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
  // public chatss : Observable<any[]>
  constructor(public _cs: ChatService, db: AngularFirestore) {

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
    console.log(this.uid);
    console.log(this.nombre);
    console.log(this.apellido);

    this.elemento = document.getElementById('app-mensajes');
  }
  enviar_mensaje() {
    if (this.mensaje.length === 0) {
      return;
    }
    this._cs.agregarMensajes(this.mensaje)?.
                                            then(() =>  this.mensaje = '').
                                            catch(error => console.log(error));
   
    console.log(this.mensaje);
  }
}
