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
  selector: 'app-pizarra',
  templateUrl: './pizarra.component.html',
  // styleUrl: './pizarra.component.css'
})
export class PizarraComponent implements OnInit {

  public cursos : Periodo[]=[];
  public periodo: Periodo[]= [];
  public periodosTemp: Periodo[]= [];
  
  public nota: Nota[] = [];
  public cargando: boolean = true;
  private imgSubs?: Subscription;


  private tareas : Pizarra[] = [];

  public uid: string = ''
  public nombre : string = ''
  public apellido : string = ''
  public role :'ADMIN_ROLE' | 'USER_ROLE' | 'PROFESOR_ROLE' | 'ESTUDIANTE_ROLE'|'CONTADOR_ROLE' | undefined
  
  
  public myForm: FormGroup = this.fb.group({
    periodo :  ['',Validators.required ],
    asunto :  ['',Validators.required ],
    tarea :  ['',Validators.required ],

 
  });
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
    console.log(this.role),
    this.cargarTareas()
    this.cargarPeriodo(this.uid)
  }

 


  guardarTarea(){

    

    // const {nota} =this.myForm.value;

    // if (this.notaSeleccionada) {
    //   //Actualizar
    //   const data = {
    //     ...this.myForm.value,
    //     _id:this.notaSeleccionada._id
    //   }
    //   this.notaService.actualizarNota(data)
    //   .subscribe(resp=>{
       
    //     Swal.fire('Actualizado',`Actualizado correctamente`, 'success');
    //   })
    // }else{
      //Crear
      console.log(this.myForm.value)
      this.pizarraService.crearPizarra(this.myForm.value)
        .subscribe((resp:any) =>{
          Swal.fire('Creado',`Creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/pizarra/${resp.pizarra._id}`)
        })
    }


  // }


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
