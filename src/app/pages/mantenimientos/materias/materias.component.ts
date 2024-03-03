import { MateriaService } from './../../../services/materia.service';
import { Materia } from './../../../models/materia.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { Subscription, delay } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styles: ``
})
export class MateriasComponent implements OnInit, OnDestroy{

  public materias: Materia[] = [];
  public cargando: boolean = true;
  public materiasTemp:Materia[] =  [];
  private imgSubs?: Subscription;
  constructor(
            private materiaService: MateriaService,
            private modalImagenService: ModalImagenService,
            private busquedaService: BusquedasService
  ){

  }
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }


  ngOnInit(): void {
    this.cargarMaterias();

    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100))
    .subscribe(img=> 
      this.cargarMaterias());

  }



  cargarMaterias(){
    this.cargando = true;
    this.materiaService.cargarMaterias()
                        .subscribe(materias=>{
                          this.cargando = false;
                         this.materias = materias; 

                         this.materias   = materias;
                         this.materiasTemp = materias;
                         this.cargando = false;
                        })



  }

  abrirModal(materia:Materia){
    this.modalImagenService.abrirModal('materias', materia._id, materia.img);
  }

  buscar(termino:string){
    if (termino.length === 0) {
      return this.materias = this.materiasTemp;
    }
    this.busquedaService.buscar('materias',termino)
      .subscribe(resultados => {
        this.materias = resultados as Materia[];
      })
      return [];

  }
  borrarMateria(materia:Materia):any{
   

    Swal.fire({
      title: "¿Borrar materia?",
      text: `Esta a punto de eliminar a ${materia.nombre}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar materia"
    }).then((result) => {
      if (result.value) {
        this.materiaService.borrarMateria(materia._id)
        .subscribe(resp => {
          this.cargarMaterias();
          Swal.fire('Usuario borrado',
                    `${materia.nombre} fue eliminado correctamente`,
                    'success'
            )

            }
          );
        
      }
      
    });
  }
}
