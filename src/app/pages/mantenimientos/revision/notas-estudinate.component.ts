import { Estudiante } from './../../../models/estudiante.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { EstudianteService } from '../../../services/estudiante.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { Subscription, delay } from 'rxjs';
import Swal from 'sweetalert2';
import { Curso } from '../../../models/curso.model';
import { Periodo } from '../../../models/periodo.model';
import { PeriodoService } from '../../../services/periodo.service';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { uid } from 'chart.js/dist/helpers/helpers.core';

@Component({
  selector: 'app-notas-estudinate',
  templateUrl: './notas-estudinate.component.html',
  styles: ``
})
export class NotasEstudinateComponent implements OnInit {
  public cursoSeleccionado?: Curso;
  public periodos: Periodo[] = [];
  public cargando: boolean = true;
  public periodosTemp:Periodo[] =  [];
  private imgSubs?: Subscription;
  public periodoSeleccionado?: Periodo;
  public estudiantes: Estudiante[] = [];
  public estudiantesTemp:Estudiante[] =  [];

  public valores? : number[]= []

  public resultados: boolean[] = [];

  public suma : number = 0;
  public promedio : number = 0;
  public aprobado : boolean = false;

  public id! : string 

// usuario: any;
  constructor(
            private estudianteService: EstudianteService ,
            private busquedaService: BusquedasService,
            private periodoService:PeriodoService,
            private activateRoute:ActivatedRoute,
            private usuarioService: UsuarioService
  ){

  }
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }


  ngOnInit(): void {

    // this.cargarPeriodos();
    
this.cargarEstudiantes(this.usuarioService.uid);

    // this.activateRoute.params
    // .subscribe( ({id}) => 
    // {this.cargarEstudiantes(id)

    // });
    // this.ciclo();
    // this.cargarEstudiantes();

  }




  // cargarPeriodos(){
  //   this.cargando = true;
  //   this.periodoService.cargarPeriodos()
  //                       .subscribe(periodos=>{
  //                         this.cargando = false;
  //                        this.periodos = periodos; 

  //                        this.periodos   = periodos;
  //                        this.periodosTemp = periodos;
  //                        this.cargando = false;
                       
  //                        const data = Object.values(periodos)
                          
  //                     });



  // }

  // usuario(){
  //   this.usuarioService.
  // }
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

              this.ciclo();
                        })



  }


  ciclo(){
    this.aprobado = false;
    for (let index = 0; index < this.estudiantes.length; index++) {

      this.valores = this.estudiantes[index].modulos

      this.suma = (this.valores as number[]).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      this.promedio = this.suma / this.estudiantes[index].curso?.modulos! as number;
      if (this.promedio >= 8) {
        this.aprobado = true;
        this.estudiantes[index].aprobado = true;
      } else {
        this.aprobado = false;
        this.estudiantes[index].aprobado = false;
      }
      // this.ComprobadorAprobado();

    }
  }
  // ComprobadorAprobado(){
  
  //     this.suma = (this.estudiantes?.modulos as number[]).reduce((accumulator, currentValue) => accumulator + currentValue, 0);        
      
  //     this.promedio = this.suma / this.estudiantesTemp?.curso?.modulos! as number;
  //     if (this.promedio >= 8) {
  //       this.aprobado = true;
  //     } else {
  //       this.aprobado = false;
  //     }
     
  //   }
  

  // buscar(termino:string){
  //   if (termino.length === 0) {
  //     return this.estudiantes = this.estudiantesTemp;
  //   }
  //   this.busquedaService.buscar('estudiantes',termino)
  //     .subscribe(resultados => {
  //       this.estudiantes = resultados as any[];
  //     })
  //     return [];

  // }
  // borrarEstudiante(estudiante:Estudiante):any{
   

  //   Swal.fire({
  //     title: "¿Borrar Curso?",
  //     text: `Esta a punto de eliminar a el curso de ${estudiante.curso?.curso?.nombre } del mes ${ estudiante.curso?.mes} del año ${estudiante.curso?.anio}`,
  //     icon: "question",
  //     showCancelButton: true,
  //     confirmButtonText: "Si, eliminar curso"
  //   }).then((result) => {
  //     if (result.value) {
  //       this.estudianteService.borrarEstudiante(estudiante._id)
  //       .subscribe(resp => {
  //         this.cargarEstudiantes(estudiante._id);
  //         Swal.fire('Usuario borrado',
  //                   `${estudiante.curso?.curso?.nombre} fue eliminado correctamente`,
  //                   'success'
  //           )

  //           }
  //         );
        
  //     }
      
  //   });
  // }
}
