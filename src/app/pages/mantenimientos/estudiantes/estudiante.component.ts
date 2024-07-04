import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, delay } from 'rxjs';
import { CursoService } from '../../../services/curso.service';
import { EstudianteService } from '../../../services/estudiante.service';
import { Curso } from '../../../models/curso.model';
import { Estudiante } from '../../../models/estudiante.model';
import { PeriodoService } from '../../../services/periodo.service';
import { Periodo } from '../../../models/periodo.model';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styles:''
})
export class EstudianteComponent implements OnInit {
  public cursos: Curso[] = [];
  public estudianteForm!: FormGroup;
  public periodoSeleccionado?: Periodo;
  public estudianteSeleccionada?: Estudiante;
  public cursoSeleccionado?: Curso;
  public periodos: Periodo[] = [];
  public estudiantes: Estudiante[] = [];
  public cargando: boolean = true;
  public periodosTemp:Periodo[] =  [];
  public estudiantesTemp:Estudiante[] =  [];
  constructor(
            private fb: FormBuilder,
            private cursoService: CursoService,
            private estudianteService:EstudianteService,
            private router: Router,
            private activateRoute:ActivatedRoute,
            private periodoService:PeriodoService
  ){}
  ngOnInit(): void {
   
    this.cargarPeriodos();
    this.activateRoute.params
    .subscribe( ({id}) => 
    {this.cargarEstudiante(id)});

      this.estudianteForm = this.fb.group({
 
      curso: ['', Validators.required],
})

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
  cargarEstudiante(id:string){
    if (id === 'nuevo') {
      return;
    }

    this.estudianteService.obtenerEstudiantePorId(id)
    
                              .pipe(
                                delay(100)
                              )
                              .subscribe( (estudiante:any) => {
                                  const {  curso: { _id } } = estudiante
                                  this.estudianteSeleccionada = estudiante
                                  this.estudianteForm.setValue( { curso: _id} )
                                  
                              }, error => {
                                return this.router.navigateByUrl(`/dashboard/estudiantes`);
                              })
  }


  cargarCurso(){
    

    this.cursoService.cargarCursos()
                        .subscribe((cursos:Curso[]) =>{
                          this.cursos = cursos;
                        })
  }

  guardarEstudiante(){
    const {estudiante} =this.estudianteForm.value;
    
    if (this.estudianteSeleccionada) {
      //Actualizar
      const data = {
        ...this.estudianteForm.value,
        _id:this.estudianteSeleccionada._id
      } 
      this.estudianteService.actualizarEstudiante(data)
      .subscribe(resp=>{
        console.log(resp )
        Swal.fire('Actualizado',`Actualizado correctamente`, 'success');
      })
    }else{
      //Crear 
      this.estudianteService.crearEstudiante(this.estudianteForm.value)
        .subscribe((resp:any) =>{
          Swal.fire('Creado',`Creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/estudiante/${resp.estudiante._id}`)
        })
    }


  }


}



