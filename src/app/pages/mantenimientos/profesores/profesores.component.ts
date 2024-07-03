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
  borrarNota(nota:Nota):any{
   

    Swal.fire({
      title: "¿Borrar Nota?",
      text: `Esta a punto de eliminar la nota de ${nota.estudiante?.nombre} ${nota.estudiante?.apellido}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar nota"
    }).then((result) => {
      if (result.value) {
        this.notasService.borrarNota(nota._id)
        .subscribe(resp => {
          this.cargarNotas();
          Swal.fire('Nota borrada',
                    `La nota de ${nota.estudiante?.nombre} ${nota.estudiante?.apellido}} fue eliminado correctamente`,
                    'success'
            )

            }
          );
        
      }
      
    });
  }
}
