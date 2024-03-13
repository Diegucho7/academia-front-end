import { Estudiante } from './../../../models/estudiante.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { EstudianteService } from '../../../services/estudiante.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { Subscription, delay } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styles: ``
})
export class EstudiantesComponent implements OnInit, OnDestroy{

  public estudiantes: Estudiante[] = [];
  public cargando: boolean = true;
  public estudiantesTemp:Estudiante[] =  [];
  private imgSubs?: Subscription;
  constructor(
            private estudianteService: EstudianteService ,
            private modalImagenService: ModalImagenService,
            private busquedaService: BusquedasService
  ){

  }
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }


  ngOnInit(): void {
    this.cargarEstudiantes();

    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100))
    .subscribe(img=> 
      this.cargarEstudiantes());

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
    this.modalImagenService.abrirModal('estudiantes', estudiante._id, estudiante.img);
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
  borrarEstudiante(estudiante:Estudiante):any{
   

    Swal.fire({
      title: "¿Borrar estudiante?",
      text: `Esta a punto de eliminar a ${estudiante.nombre}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar estudiante"
    }).then((result) => {
      if (result.value) {
        this.estudianteService.borrarEstudiante(estudiante._id)
        .subscribe(resp => {
          this.cargarEstudiantes();
          Swal.fire('Estudiante borrado',
                    `${estudiante.nombre} fue eliminado correctamente`,
                    'success'
            )

            }
          );
        
      }
      
    });
  }
}
