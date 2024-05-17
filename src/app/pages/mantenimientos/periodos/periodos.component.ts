import { Component, OnDestroy, OnInit } from '@angular/core';
import { Periodo } from '../../../models/periodo.model';
import { ProfesorService } from '../../../services/profesor.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { Subscription, delay } from 'rxjs';
import Swal from 'sweetalert2';
import { PeriodoService } from '../../../services/periodo.service';
import { Materia } from '../../../models/materia.model';

@Component({
  selector: 'app-periodos',
  templateUrl: './periodos.component.html',
  styles: ``
})      
export class PeriodosComponent implements OnInit, OnDestroy{



public data : any[] = [];
  public periodos: Periodo[] = [];
  public cargando: boolean = true;
  public periodosTemp:Periodo[] =  [];
  private imgSubs?: Subscription;
  constructor(
            private periodoService: PeriodoService,
            private modalImagenService: ModalImagenService,
            private busquedaService: BusquedasService
  ){

  }
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }


  ngOnInit(): void {
    this.cargarPeriodos();

    // this.imgSubs = this.modalImagenService.nuevaImagen
    // .pipe(
    //   delay(100))
    // .subscribe(img=> 
    //   this.cargarPeriodos());

  }



  cargarPeriodos(){
    this.cargando = true;
    this.periodoService.cargarPeriodos()
                        .subscribe(periodos=>{
                          this.cargando = false;
                         this.periodos = periodos; 

                         this.periodos   = periodos;
                         this.periodosTemp = periodos;
                         this.cargando = false;
                        //  console.log(periodos)

                         const data = Object.values(periodos)
                          
                      });



  }

  abrirModal(profesor:Periodo){
    // this.modalImagenService.abrirModal('periodos', profesor._id, profesor.img);
  }

  buscar(termino:string){
    if (termino.length === 0) {
      return this.periodos = this.periodosTemp;
    }
    // this.busquedaService.buscar('periodos',termino)
    //   .subscribe(resultados => {
    //     this.periodos = resultados as Periodo[];
    //   })
      return [];

  }
  borrarPeriodo(periodo:Periodo):any{
   

    Swal.fire({
      title: "¿Borrar profesor?",
      text: `Esta a punto de eliminar a ${periodo} `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar periodo"
    }).then((result) => {
      if (result.value) {
        this.periodoService.borrarPeriodo(periodo._id)
        .subscribe(resp => {
          this.periodoService.cargarPeriodos();
          Swal.fire('Usuario borrado',
                    `${periodo} fue eliminado correctamente`,
                    'success'
            )

            }
          );
        
      }
      
    });
  }
}
