import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription, delay } from 'rxjs';
import Swal from 'sweetalert2';
import { Pago } from '../../../models/pago.model';
import { PagosService } from '../../../services/pagos.service';
import { ActivatedRoute } from '@angular/router';
import { EstudianteService } from '../../../services/estudiante.service';
import { Estudiante } from '../../../models/estudiante.model';

@Component({
  selector: 'app-pagos-estudiante-cursos',
  templateUrl: './pagos-estudiante-cursos.component.html',
  styles: ``
})
export class PagosEstudianteCursosComponent implements OnInit, OnDestroy {


  public suma : number = 0;
  public promedio : number = 0;
  public aprobado : boolean = false;
  
  public valores? : number[]= []

  
  public pago: Pago[] = [];
  public cargando: boolean = true;
  private imgSubs?: Subscription;
  public estudiantes: Estudiante[] = [];
  public estudiantesTemp:Estudiante[] =  [];
  constructor(
            private pagosService: PagosService,
            private activateRoute:ActivatedRoute,
            private estudianteService: EstudianteService
  ){

  }
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }


  ngOnInit(): void {

    this.activateRoute.params
    .subscribe( ({id}) => 
    {this.cargarEstudiantes(id)

    });
    // this.ciclo();
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
  cargarEstudiantes(id:string){
    // const data = this.activateRoute.params;
    
    this.cargando = true;
    this.estudianteService.cargarEstudiantesPorNotas(id)
    .subscribe( estudiantes =>{
      this.cargando = false;
                         this.estudiantes = estudiantes; 

                         this.estudiantes   = estudiantes;
                         this.estudiantesTemp = estudiantes;
                         this.cargando = false;
                        //  console.log(this.estudiantes);
                         this.ciclo();
                        })



  }

  ciclo(){
    // console.log(this.estudiantes.length)
    this.aprobado = false;
    for (let index = 0; index < this.estudiantes.length; index++) {

      this.valores = this.estudiantes[index].pagos
      this.suma = (this.valores as number[]).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
 
      if (this.suma == this.estudiantes[index].curso?.valor!) {
        this.aprobado = true;
        this.estudiantes[index].aprobado = true;
      } else {
        this.aprobado = false;
        this.estudiantes[index].aprobado = false;
      }

    }
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
