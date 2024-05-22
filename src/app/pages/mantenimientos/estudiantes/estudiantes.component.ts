import { Estudiante } from './../../../models/estudiante.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { EstudianteService } from '../../../services/estudiante.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { Subscription, delay } from 'rxjs';
import Swal from 'sweetalert2';
import { Curso } from '../../../models/curso.model';
import { Periodo } from '../../../models/periodo.model';
import { PeriodoService } from '../../../services/periodo.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styles: ``
})
export class EstudiantesComponent implements OnInit, OnDestroy{

  public cursoSeleccionado?: Curso;
  public periodos: Periodo[] = [];
  public cargando: boolean = true;
  public periodosTemp:Periodo[] =  [];
  private imgSubs?: Subscription;
  public periodoSeleccionado?: Periodo;
  public estudiantes: Estudiante[] = [];
  public estudiantesTemp:Estudiante[] =  [];
usuario: any;
  constructor(
            private estudianteService: EstudianteService ,
            private modalImagenService: ModalImagenService,
            private busquedaService: BusquedasService,
            private periodoService:PeriodoService,
            private activateRoute:ActivatedRoute,
  ){

  }
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }


  ngOnInit(): void {

    this.cargarPeriodos();

    this.cargarEstudiantes();
console.log(this.estudiantes)
  }


  // cargarPeriodos(){
  //   this.cargando = true;
  //   this.estudianteService.cargarEstudiantes()
  //                       .subscribe(this.estudiantes=>{
  //                         this.cargando = false;
  //                        this.estudiante = this.estudiantes; 

  //                        this.estudiantes   = this.estudiantes;
  //                        this.periodosTemp = this.estudiantes;
  //                        this.cargando = false;
  //                       //  console.log(this.estudiantes)

  //                        const data = Object.values(this.estudiantes)
                          
  //                     });



  // }


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
  cargarEstudiantes(){
    this.cargando = true;
    this.estudianteService.cargarEstudiantes()
                        .subscribe( estudiantes =>{
                          this.cargando = false;
                         this.estudiantes = estudiantes; 

                         this.estudiantes   = estudiantes;
                         this.estudiantesTemp = estudiantes;
                         this.cargando = false;
                         console.log(this.estudiantes)
                        })



  }

  abrirModal(estudiante:Estudiante){
    // this.modalImagenService.abrirModal('estudiantes', estudiante.curso, estudiante.img);
  }

  buscar(termino:string){
    if (termino.length === 0) {
      return this.estudiantes = this.estudiantesTemp;
    }
    this.busquedaService.buscar('estudiantes',termino)
      .subscribe(resultados => {
        this.estudiantes = resultados as Estudiante[];
      })
      return [];

  }
  // borrarEstudiante(curso:Estudiante):any{
   

  //   Swal.fire({
  //     title: "¿Borrar estudiante?",
  //     text: `Esta a punto de eliminar a ${curso}`,
  //     icon: "question",
  //     showCancelButton: true,
  //     confirmButtonText: "Si, eliminar estudiante"
  //   }).then((result) => {
  //     if (result.value) {
  //       this.estudianteService.borrarEstudiante(curso.curso?._id)
  //       .subscribe(resp => {
  //         this.cargarEstudiantes();
  //         Swal.fire('Estudiante borrado',
  //                   `${curso} fue eliminado correctamente`,
  //                   'success'
  //           )

  //           }
  //         );
        
  //     }
      
  //   });
  // }
}
