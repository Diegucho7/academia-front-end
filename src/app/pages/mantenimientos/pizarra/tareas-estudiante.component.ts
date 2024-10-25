import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { Observable, Subscription, delay } from 'rxjs';
import Swal from 'sweetalert2';
import { NotaService } from '../../../services/nota.service';
import { Nota } from '../../../models/nota.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { EstudianteService } from '../../../services/estudiante.service';
import { PizarraService } from '../../../services/pizarra.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pizarra } from '../../../models/pizarra.model';
import { Periodo } from '../../../models/periodo.model';
import { Estudiante } from '../../../models/estudiante.model';
@Component({
  selector: 'app-tareas-estudiante',
  templateUrl: './tareas-estudiante.component.html',
  styles: ``
})
export class TareasEstudianteComponent implements OnInit {
  public cursos : Estudiante[]=[];
  public periodo: Periodo[]= [];
  public periodosTemp: Estudiante[]= [];
  
  public nota: Nota[] = [];
  public cargando: boolean = true;
  private imgSubs?: Subscription;


  private tareas : Pizarra[] = [];

  public uid: string = ''
  public nombre : string = ''
  public apellido : string = ''
  public role :'ADMIN_ROLE' | 'USER_ROLE' | 'PROFESOR_ROLE' | 'ESTUDIANTE_ROLE'|'CONTADOR_ROLE' | undefined
  

  constructor(usuarioService:UsuarioService,
              private estudianteService:EstudianteService,
              private fb: FormBuilder,
              private pizarraService: PizarraService,
              private router : Router
  ) { 
    this.uid = usuarioService.uid,
    this.nombre = usuarioService.nombre,
    this.apellido = usuarioService.apellido,
    this.role = usuarioService.role
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.cargarTareas()
    this.cargarPeriodo(this.uid)
  }

  

  guardarTarea(){

    
    }


  // }


  cargarTareas(){
    this.pizarraService.cargarPizarra().subscribe(tareas => {
      this.tareas = tareas
      this.cargando = false;
      // console.log(tareas);
   
    
  })

}


    // this.periodoService.cargarPeriodos().subscribe(periodos => {
    //   this.periodo = periodos;
    cargarPeriodo(id:string){
    this.cargando = true;
    this.estudianteService.cargarEstudiantesPorNotas(id)
                        .subscribe( resp =>{
                          // this.cargando = false;
                         this.cursos = resp; 

                        //  this.cursos   = resp;
                         this.periodosTemp = resp;
                         console.log(this.cursos);
                         this.cargando = false;
                        })
  }



}
