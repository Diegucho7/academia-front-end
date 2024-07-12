import { Estudiante } from './../../../models/estudiante.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { EstudianteService } from '../../../services/estudiante.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { Subscription, delay } from 'rxjs';
import Swal from 'sweetalert2';
import { Curso } from '../../../models/curso.model';
import { Periodo } from '../../../models/periodo.model';
import { PeriodoService } from '../../../services/periodo.service';
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
            private busquedaService: BusquedasService,
            private periodoService:PeriodoService,
        
  ){

  }
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }


  ngOnInit(): void {

    this.cargarPeriodos();

    this.cargarEstudiantes();

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
        this.estudiantes = resultados as any[];
      })
      return [];

  }
  borrarEstudiante(estudiante:Estudiante):any{
   

    Swal.fire({
      title: "¿Borrar Curso?",
      text: `Esta a punto de eliminar a el curso de ${estudiante.curso?.curso?.nombre } del mes ${ estudiante.curso?.mes} del año ${estudiante.curso?.anio}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar curso"
    }).then((result) => {
      if (result.value) {
        this.estudianteService.borrarEstudiante(estudiante._id)
        .subscribe(resp => {
          this.cargarEstudiantes();
          Swal.fire('Usuario borrado',
                    `${estudiante.curso?.curso?.nombre} fue eliminado correctamente`,
                    'success'
            )

            }
          );
        
      }
      
    });
  }
}
