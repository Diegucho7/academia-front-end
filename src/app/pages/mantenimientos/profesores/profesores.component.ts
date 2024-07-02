import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { Subscription, delay } from 'rxjs';
import Swal from 'sweetalert2';
import { NotaService } from '../../../services/nota.service';
import { Nota } from '../../../models/nota.model';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styles: ``
})
export class ProfesoresComponent implements OnInit, OnDestroy{

  public nota: Nota[] = [];
  public cargando: boolean = true;
  private imgSubs?: Subscription;
  constructor(
            private notasService: NotaService,
            private modalImagenService: ModalImagenService,
            private busquedaService: BusquedasService
  ){

  }
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }


  ngOnInit(): void {
    this.cargarNotas();

    // this.imgSubs = this.modalImagenService.nuevaImagen
    // .pipe(
    //   delay(100))
    // .subscribe(img=> 
    //   this.cargarProfesores());

  }



  cargarNotas(){
    this.cargando = true;

    

    this.notasService.cargarNotas()
                        .subscribe(notas=>{
                          this.cargando = false;
                         this.nota = notas; 

                         this.nota   = notas;
                       
                         this.cargando = false;
                        })



  }

  // abrirModal(profesor:Profesor){
  //   this.modalImagenService.abrirModal('profesores', profesor._id, profesor.img);
  // }

  // buscar(termino:string){
  //   if (termino.length === 0) {
  //     return this.profesores = this.profesoresTemp;
  //   }
  //   this.busquedaService.buscar('profesores',termino)
  //     .subscribe(resultados => {
  //       this.profesores = resultados as Profesor[];
  //     })
  //     return [];

  // }
  // borrarProfesor(profesor:Profesor):any{
   

  //   Swal.fire({
  //     title: "¿Borrar profesor?",
  //     text: `Esta a punto de eliminar a ${profesor.nombre} ${profesor.apellido}`,
  //     icon: "question",
  //     showCancelButton: true,
  //     confirmButtonText: "Si, eliminar profesor"
  //   }).then((result) => {
  //     if (result.value) {
  //       this.profesorService.borrarProfesor(profesor._id)
  //       .subscribe(resp => {
  //         this.cargarProfesores();
  //         Swal.fire('Usuario borrado',
  //                   `${profesor.nombre} ${profesor.apellido} fue eliminado correctamente`,
  //                   'success'
  //           )

  //           }
  //         );
        
  //     }
      
  //   });
  // }
}
