import { Component, OnDestroy, OnInit  } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from '../../../models/usuario.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Observable, Observer, Subscription, delay } from 'rxjs';
import { AcademiaService } from '../../../services/academia.service';
import { Academia } from '../../../models/academia.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: ``
})
export class UsuariosComponent implements OnInit, OnDestroy{

  public totalUsuarios:number = 0;
  public usuarios:Usuario[] = [];
  public usuariosTemp:Usuario[] =  [];
  public desde: number = 0;
  public cargando: boolean = true;
  public imgSubs?: Subscription;
  public mailUser: string = this.usuarioService.usuario.email;
  public academiasTemp:Academia[] =  [];
  public academias: Academia[] = [];

  constructor( private usuarioService: UsuarioService,
              private busquedaService: BusquedasService,
              private modalImagenService: ModalImagenService,
              private academiaService: AcademiaService    ,
      
      ){
      
    }
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }
    ngOnInit(): void {
      this.CargarUsuarios();
      this.cargarAcademias();
      
     
      this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(2000))
      
      .subscribe(img=> 
        this.CargarUsuarios());
        
      }

    
    CargarUsuarios(){
      this.cargando = true;
      this.usuarioService.cargarUsuarios(this.desde)
      .subscribe(({total, usuarios})=>{
        this.totalUsuarios = total;

          
          this.usuarios = usuarios;
          this.usuariosTemp = usuarios;
          this.cargando = false;
          
      })
    }


    cargarAcademias(){
      this.cargando = true;
      this.academiaService.cargarAcademias()
                          .subscribe(academias=>{
                            
                           this.academias = academias; 
  
                           this.academias   = academias;
                           this.academiasTemp = academias;

                          })
  
  
  
    }

    cambiarPagina(valor:number){
      this.desde += valor;

      if (this.desde < 0) {
        this.desde = 0;
      } else if (this.desde >= this.totalUsuarios) {
        this.desde -= valor;
      } 
      this.CargarUsuarios();
    }

    buscar(termino:string): Usuario[]{
      if (termino.length === 0) {
        return this.usuarios = this.usuariosTemp;
      }
      
      this.busquedaService.buscar('usuarios',termino)
        .subscribe((resultados) => {
          this.usuarios = resultados as Usuario[];
        })
        return [];
    }

    eliminarUsuario(usuario:Usuario):any{

      if (usuario.uid === this.usuarioService.uid) {
        return Swal.fire('Error','No se puede borrar su propio usuario', 'error');  
      }

      Swal.fire({
        title: "¿Borrar usuario?",
        text: `Esta a punto de eliminar a ${usuario.nombre} ${usuario.apellido}`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar usuario"
      }).then((result) => {
        if (result.value) {
          this.usuarioService.eliminarUsuario(usuario)
          .subscribe(resp => {
            this.CargarUsuarios();
            Swal.fire('Usuario borrado',
                      `${usuario.nombre} ${usuario.apellido} fue eliminado correctamente`,
                      'success'
              )

              }
            );
          
        }
        
      });
    }

    cambiarRole(usuario:Usuario){
        this.usuarioService.guardarUsuario(usuario)
        .subscribe(resp=>{
          
        })
    }
    cambiarEstado(usuario:Usuario){
        this.usuarioService.guardarUsuario(usuario)
        .subscribe(resp=>{
          
        })
    }
    cambiarAcademia(usuario:Usuario){
      this.usuarioService.guardarUsuario(usuario)
      .subscribe(resp=>{
       
      })
    }
    abrirModal(usuario:Usuario){

      // console.log(usuario)

      this.modalImagenService.abrirModal('usuarios', usuario.uid!, usuario.img);
      
    }
}
