import Swal from 'sweetalert2';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../models/curso.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription, delay } from 'rxjs';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent implements OnInit, OnDestroy {
  
  constructor(
    private cursoService:CursoService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService

  ){ }
  public cursos: Curso[] = [];
  public cargando: boolean = true;
  private imgSubs?: Subscription;

  public cursosTemp:Curso[] =  [];
  
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }
  ngOnInit(): void {
    this.cargarCursos();

    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100))
    .subscribe(img=> 
      this.cargarCursos());


  }
  
  cargarCursos(){
    this.cargando = true;
    this.cursoService.cargarCursos()
                        .subscribe(cursos=>{
                          this.cargando = false;
                         this.cursos = cursos; 

                         this.cursos   = cursos;
                         this.cursosTemp = cursos;
                         this.cargando = false;
                        })



  }

  guardarCambios(clase:Curso){
      this.cursoService.actualizarCurso(clase._id,clase.nombre)
      .subscribe( resp => {
        Swal.fire('Actualizado', clase.nombre, 'success')
      })
  }
  eliminarCurso(clase:Curso){
      this.cursoService.borrarCurso(clase._id)
      .subscribe( resp => {
        this.cargarCursos()
        Swal.fire('Borrado', clase.nombre, 'success')
      })
  }

   async abrirSweetAlert(){
    
    const {value = ''} = await Swal.fire<string>({
      title:"Crear Curso",
      text: "Ingrese el nombre de la nueva clase",
      input: "text",
      inputPlaceholder: "Nombre del Curso",
      showCancelButton: true,
    });
    if (value!.trim().length > 0){
      this.cursoService.crearCurso( value! )
                          .subscribe((resp:any) => {
                            this.cursos.push(resp.clase)
                          })

    }
    
  }

  abrirModal(clase:Curso){
    this.modalImagenService.abrirModal('cursos', clase._id, clase.img);
  }

  buscar(termino:string){
    if (termino.length === 0) {
      return this.cursos = this.cursosTemp;
    }
    
    this.busquedaService.buscar('cursos',termino)
      .subscribe(resultados => {
        this.cursos = resultados as Curso[];
      })
      return [];

  }

}
