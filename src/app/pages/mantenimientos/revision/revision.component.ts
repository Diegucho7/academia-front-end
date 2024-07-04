import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { Subscription, delay } from 'rxjs';
import Swal from 'sweetalert2';
import { NotaService } from '../../../services/nota.service';
import { Nota } from '../../../models/nota.model';

@Component({
  selector: 'app-revicion',
  templateUrl: './revision.component.html',
  styles: ``
})

export class RevisionComponent implements OnInit, OnDestroy {
  public nota: Nota[] = [];
  public notaSeleccionada!: Nota
  public cargando: boolean = true;
  private imgSubs?: Subscription;



  public suma : number = 0;
  public promedio : number = 0;
  public aprobado : boolean = false;
  constructor(
            private notasService: NotaService,
       
  ){

  }
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }


  ngOnInit(): void {
    this.cargarNotas();

    

  }



  cargarNotas(){
    this.cargando = true;

    

    this.notasService.cargarNotas()
                        .subscribe(notas=>{
                          this.cargando = false;
                         this.nota = notas; 

                         this.cargando = false;
                         this.ComprobadorAprobado();
                      
                      
                        })



  }

  ComprobadorAprobado(){
    if(this.nota){
 
      for (let index = 0; index < this.nota.length; index++) {
        this.notaSeleccionada = this.nota[index];
        this.suma = (this.notaSeleccionada.modulos as number[]).reduce((accumulator, currentValue) => accumulator + currentValue, 0);        
        
        this.promedio = this.suma / this.notaSeleccionada.modulos!.length;
        if (this.promedio >= 8) {
          this.aprobado = true;
         this.nota[index].aprobado = true;
        } else {
          this.aprobado = false;
          this.nota[index].aprobado = false;
        }
       
        
      }

    }
  }

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
