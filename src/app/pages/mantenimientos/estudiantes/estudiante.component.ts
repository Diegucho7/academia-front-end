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
  public cargando: boolean = true;
  public periodosTemp:Periodo[] =  [];
  private imgSubs?: Subscription;
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
    // this.medicoService.obtenerMedicoPorId
    // console.log(this.hospitalSeleccionado?.img)
this.estudianteForm = this.fb.group({
 
  curso: ['', Validators.required],
})

    this.cargarCurso();
    // this.estudianteForm.get('curso')?.valueChanges.
    //                                 subscribe( CursoId =>{
    //                                   this.cursoSeleccionado = this.cursos.find(h => h._id === CursoId)
    //                                 })
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
                        //  console.log(periodos)

                         const data = Object.values(periodos)
                          
                      });



  }


  cargarEstudiante(id:string){

    if (id === 'nuevo') {
      return;
    }

    this.periodoService.obtenerPeriodoPorId(id)
                        
                        .pipe(
                          delay(100)
                        )
                        .subscribe( (periodo:any) => {   
                            const { curso:{nombre}} = periodo
                            this.estudianteSeleccionada = periodo
                            this.estudianteForm.setValue( { curso:id} )
                            console.log(periodo  )
                        }, error => {
                          return this.router.navigateByUrl(`/dashboard/periodos`);
                        })
  }

  cargarCurso(){
    

    this.cursoService.cargarCursos()
                        .subscribe((cursos:Curso[]) =>{
                          this.cursos = cursos;
                        })
  }

  guardarEstudiante(){
    const {nombre} =this.estudianteForm.value;
    
    if (this.estudianteSeleccionada) {
      //Actualizar
      const data = {
        ...this.estudianteForm.value,
        // _id:this.estudianteSeleccionada._id
      } 
      this.estudianteService.actualizarEstudiante(data)
      .subscribe(resp=>{
        console.log(resp )
        Swal.fire('Actualizado',`${nombre}  actualizado correctamente`, 'success');
      })
    }else{
      //Crear 
      this.estudianteService.crearEstudiante(this.estudianteForm.value)
        .subscribe((resp:any) =>{
          Swal.fire('Creado',`${nombre}  creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/estudiante/${resp.estudiante._id}`)
        })
    }


  }


}



