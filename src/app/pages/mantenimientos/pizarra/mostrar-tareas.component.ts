import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { EstudianteService } from '../../../services/estudiante.service';
import { Periodo } from '../../../models/periodo.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PizarraService } from '../../../services/pizarra.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Pizarra } from '../../../models/pizarra.model';

@Component({
  selector: 'app-mostrar-tareas',
  templateUrl: './mostrar-tareas.component.html',
  styles: ``
})
export class MostrarTareasComponent implements OnInit {

  public cargando: boolean = true;

  public cursos : Periodo[]=[];
  public periodo: Periodo[]= [];
  public periodosTemp: Periodo[]= [];
  public tareaSeleccionada?: Pizarra;
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
              private router : Router,
              private activateRoute:ActivatedRoute
  ) { 
    this.uid = usuarioService.uid,
    this.nombre = usuarioService.nombre,
    this.apellido = usuarioService.apellido,
    this.role = usuarioService.role
  }
  ngOnInit(): void {


    this.activateRoute.params
    .subscribe( ({id}) => 
    {this.cargarTarea(id)});
    // throw new Error('Method not implemented.');
    this.cargarPeriodo(this.uid)
  }



  guardarTarea(){

    

    const {nota} =this.myForm.value;

    if (this.tareaSeleccionada) {
      //Actualizar
      const data = {
        ...this.myForm.value,
        _id:this.tareaSeleccionada._id
      }
      this.pizarraService.actualizarPizarra(data)
      .subscribe(resp=>{
       
        Swal.fire('Actualizado',`Actualizado correctamente`, 'success');
      })
    }else{
      // Crear
      this.pizarraService.crearPizarra(this.myForm.value)
        .subscribe((resp:any) =>{
          Swal.fire('Creado',`Creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/pizarra/${resp.pizarra._id}`)
        })
    }


  }

  cargarTarea(id:string){

    if (id === 'nuevo') {
      return;
    }

    this.pizarraService.obtenerPizarraPorId(id)
    
                              .pipe(
                                delay(100)
                              )
                              .subscribe({
                                next: (pizarra: any) => {
                                  const { periodo, asunto, tarea } = pizarra ?? {};
                                  this.tareaSeleccionada = pizarra;
                                  this.myForm.setValue({ periodo, asunto, tarea });
                                },
                                error: (error) => {
                                  console.error('Error occurred:', error);

                                  return this.router.navigateByUrl(`/dashboard/pizarra`);
                                },
                                complete: () => {
                                  // You can add a callback for the completion event if needed
                                }
                              });
  }

  cargarPeriodo(id:string){
    // this.periodoService.cargarPeriodos().subscribe(periodos => {
    //   this.periodo = periodos;
   
    this.cargando = true;
    this.estudianteService.cargarNotasPorProfesor(id)
                        .subscribe( resp =>{
                          this.cargando = false;
                         this.cursos = resp; 

                         this.cursos   = resp;
                         this.periodosTemp = resp;
                         this.cargando = false;
              
                        })
  }


}
