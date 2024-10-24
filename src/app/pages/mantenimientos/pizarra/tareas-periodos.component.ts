import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { Subscription, delay } from 'rxjs';
import Swal from 'sweetalert2';
import { NotaService } from '../../../services/nota.service';
import { Nota } from '../../../models/nota.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { EstudianteService } from '../../../services/estudiante.service';
import { PizarraService } from '../../../services/pizarra.service';
import { Router } from '@angular/router';
import { Pizarra } from '../../../models/pizarra.model';
import { Periodo } from '../../../models/periodo.model';
@Component({
  selector: 'app-tareas-periodos',
  templateUrl: './tareas-periodos.component.html',
  styles: ``
})
export class TareasPeriodosComponent implements OnInit {
  ngOnInit(): void {
    this.cargarTareas()
    this.cargarPeriodo(this.uid)
  
  }
  public uid: string = ''
  public cursos : Periodo[]=[];
  public periodo: Periodo[]= [];
  public periodosTemp: Periodo[]= [];
  
  public nota: Nota[] = [];
  public cargando: boolean = true;
  private imgSubs?: Subscription;


  private tareas : Pizarra[] = [];

  
  constructor(usuarioService:UsuarioService,
    private estudianteService:EstudianteService,
    private fb: FormBuilder,
    private pizarraService: PizarraService,
    private router : Router
) {
  this.uid = usuarioService.uid
}



cargarTareas(){
  this.pizarraService.cargarPizarra().subscribe(tareas => {
    this.tareas = tareas
    this.cargando = false;
 
  
})

}


  // this.periodoService.cargarPeriodos().subscribe(periodos => {
  //   this.periodo = periodos;
  cargarPeriodo(id:string){
  this.cargando = true;
  this.estudianteService.cargarNotasPorProfesor(id)
                      .subscribe( resp =>{
                        this.cargando = false;
                       this.cursos = resp; 

                       this.cursos   = resp;
                       this.periodosTemp = resp;
                       this.cargando = false;
                       console.log(this.cursos)
                      })
}
}
