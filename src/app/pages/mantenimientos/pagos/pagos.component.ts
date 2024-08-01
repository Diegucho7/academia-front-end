import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription, delay } from 'rxjs';
import Swal from 'sweetalert2';
import { Pago } from '../../../models/pago.model';
import { PagosService } from '../../../services/pagos.service';
import { Estudiante } from '../../../models/estudiante.model';
import { EstudianteService } from '../../../services/estudiante.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styles: ``
})
export class PagosComponent implements OnInit, OnDestroy {
  

  public usuario :  Usuario[] = [];
  public usuarioTemp: Usuario[] = [];
  public pago: Estudiante[] = [];
  public cargando: boolean = true;
  private imgSubs?: Subscription;
  constructor(
            private pagosService: PagosService,
            private estudianteService: EstudianteService,
            private busquedaService: BusquedasService
       
  ){

  }
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }


  ngOnInit(): void {
    this.cargarPagos();

  }

  buscar(termino:string){
    if (termino.length === 0) {
      return this.usuario = this.usuarioTemp;
    }
    
    
    this.busquedaService.buscar('usuarios',termino)
      .subscribe(resultados => {
        // console.log(resultados);
        this.usuario = resultados as Usuario[];
        for (let i = 0; i < this.usuario.length; i++) {

          this.busquedaService.buscar('estudiantes',this.usuario[i].uid)
          .subscribe(resultados => {
           this.pago = resultados as Estudiante[];
          })

            // console.log(this.usuario[i].uid);
            // console.log(this.pago);

        }
        // console.log(this.usuario);

      })
      return [];

  }

  cargarPagos(){
    this.cargando = true;

    

    this.estudianteService.cargarEstudiantes()
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
