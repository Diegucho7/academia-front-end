import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription, delay } from 'rxjs';
import Swal from 'sweetalert2';
import { Pago } from '../../../models/pago.model';
import { PagosService } from '../../../services/pagos.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styles: ``
})
export class PagosComponent implements OnInit, OnDestroy {
  
  public pago: Pago[] = [];
  public cargando: boolean = true;
  private imgSubs?: Subscription;
  constructor(
            private pagosService: PagosService,
       
  ){

  }
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }


  ngOnInit(): void {
    this.cargarPagos();

  }



  cargarPagos(){
    this.cargando = true;

    

    this.pagosService.cargarPagos()
                        .subscribe(pagos=>{
                          this.cargando = false;
                         this.pago = pagos; 

                         this.pago   = pagos;
                       
                         this.cargando = false;
                       
                        })



  }


  borrarPago(pago:Pago):any{
   

    Swal.fire({
      title: "¿Borrar Pago?",
      text: `Esta a punto de eliminar la pago de ${pago.estudiante?.nombre} ${pago.estudiante?.apellido}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar pago"
    }).then((result) => {
      if (result.value) {
        this.pagosService.borrarNota(pago._id)
        .subscribe(resp => {
          this.cargarPagos();
          Swal.fire('Pago borrado',
                    `El pago de ${pago.estudiante?.nombre} ${pago.estudiante?.apellido} fue eliminado correctamente`,
                    'success'
            )

            }
          );
        
      }
      
    });
  }

}
