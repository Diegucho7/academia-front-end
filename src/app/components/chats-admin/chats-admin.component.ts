import { Component } from '@angular/core';
import { BusquedasService } from '../../services/busquedas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { Estudiante } from '../../models/estudiante.model';
import { Subscription } from 'rxjs';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chats-admin',
  templateUrl: './chats-admin.component.html',
  styles: ``
})
export class ChatsAdminComponent {


  public for?: string;

  mensaje: string = '';
  elemento: any;
  public uid : string = ''; 
  public nombre : string = ''; 
  public apellido : string = ''; 
  public role : string = ''; 


  public usuario? :  Usuario [] = [];
  public usuarioTemp: Usuario[] = [];
  public pago: Estudiante[] = [];
  public cargando: boolean = true;
  private imgSubs?: Subscription;
  public cedula: string = '';
  public usuarios: Usuario[] = [];
  constructor(
    private activateRoute:ActivatedRoute,
    private router:Router ,
    private busquedaService:BusquedasService,
    private _cs: ChatService
  ){

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
  this.elemento = document.getElementById('app-mensajes');
}

filtrarChats() {
  if(this._cs.usuarioService.uid === 'ADMIN_ROLE'){
    console.log("Aqui desde Admin");
    return this._cs.chats
  }
  return this._cs.chats.filter(chat => chat.uid == this.uid || chat.uid == this._cs.usuario.uid || chat.for == this._cs.uid  || chat.for == this._cs.usuario.uid );
}
buscar(termino:string){
  if (termino.length === 0) {
    return this.usuario = this.usuarioTemp;
  }

  
    this.usuario = [];
    this.busquedaService.buscar('usuarios',termino)
      .subscribe(resultados => {
        // console.log(resultados);
        this.usuario = resultados as Usuario[];
        for (let i = 0; i < this.usuario.length; i++) {
  
          this.busquedaService.buscar('estudiantes',this.usuario[i].uid)
          .subscribe(resultados => {
           this.pago = resultados as Estudiante[];
             })

             this.for = this.usuario[i].uid
          
          
          
        }
        
        
      }
    )
    console.log(this.for);
    return this.usuario;
    

    

}

enviar_mensaje(){ 
  if (this.mensaje.length === 0 && this.for === undefined) {
    return;
  }
  this._cs.agregarMensajes(this.mensaje,this.for ?? '')?.
                                          then(() =>  this.mensaje = '').
                                          catch(error => console.log(error));
 
  console.log(this.mensaje);
}
  
}

