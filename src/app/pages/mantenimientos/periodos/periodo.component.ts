
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { CursoService } from '../../../services/curso.service';
import { MateriaService } from '../../../services/materia.service';
import { Curso } from '../../../models/curso.model';
import { Materia } from '../../../models/materia.model';
import { PeriodoService } from '../../../services/periodo.service';
import { Academia } from '../../../models/academia.model';
import { AcademiaService } from '../../../services/academia.service';
import { Periodo } from '../../../models/periodo.model';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styles: ``
})

export class PeriodosComponent implements OnInit {
  public cursos: Curso[] = [];
  public materias: Materia[] = [];
  public academias : Academia[] = [];

  public periodoForm!: FormGroup;

  public periodoSeleccionado?: Periodo;
  // public academiaSeleccionado?: Curso;
  // public cursoSeleccionado?: Curso;
  public cursoSeleccionado?: Curso;


//indicamos valores del rango, inicio y final
public inicio = 2022
public final = 2050
//generamos array con los valores
public years = Array(this.final - this.inicio + 1).fill(0).map((_, i) => this.inicio + i);
  constructor(
            private fb: FormBuilder,
            private cursoService: CursoService,
            private materiaService:MateriaService,
            private periodoService:PeriodoService,
            private academiaService:AcademiaService,
            private router: Router,
            private activateRoute:ActivatedRoute
  ){}
  ngOnInit(): void {

    this.activateRoute.params
    .subscribe( ({id}) => 
    {this.cargarPeriodo(id)});

    // this.medicoService.obtenerMedicoPorId
    // console.log(this.hospitalSeleccionado?.img)
this.periodoForm = this.fb.group({
  anio: ['', Validators.required],
  academia: ['', Validators.required],
  curso: ['', Validators.required],
  materia: ['', Validators.required],
})

    this.cargarCurso();
    this.cargarMaterias();
    this.cargarAcademias();
    this.periodoForm.get('academia')?.valueChanges.
                                    subscribe( AcademiaId =>{
                                    })
    this.periodoForm.get('curso')?.valueChanges.
                                    subscribe( CursoId =>{
                                    })
    this.periodoForm.get('materia')?.valueChanges.
                                    subscribe( MateriaId =>{

                                    })
  }
  cargarPeriodo(id:string){

    if (id === 'nuevo') {
      return;
    }
    

    this.materiaService.obtenerMateriaPorId(id)
    
            .pipe(
              delay(100)
    )
    .subscribe( (periodo:any) => {
      const {academia} = periodo
      this.periodoSeleccionado = periodo
      this.periodoForm.setValue( { academia: academia} )
    }, error => {
      return this.router.navigateByUrl(`/dashboard/periodos`);
    })
  }

  cargarMaterias(){
    this.materiaService.cargarMaterias()
                        .subscribe((materias:Materia[]) =>{
                          this.materias = materias;
                        })
  }
  
  cargarAcademias(){
    this.academiaService.cargarAcademias()
                        .subscribe((academias:Academia[]) =>{
                          this.academias = academias;
                        })
  }
  

  cargarCurso(){
    

    this.cursoService.cargarCursos()
                        .subscribe((cursos:Curso[]) =>{
                          this.cursos = cursos;
                        })
  }


  guardarPeriodo(){
    const {periodo} =this.periodoForm.value;
    if (this.periodoSeleccionado) {
      //Actualizar
      const data = {
        ...this.periodoForm.value,
        _id:this.periodoSeleccionado._id
      } 
      this.materiaService.actualizarMateria(data)
      .subscribe(resp=>{
        console.log(resp )
        Swal.fire('Actualizado',`${periodo}  actualizado correctamente`, 'success');
      })
    }else{

    const {periodo} =this.periodoForm.value;
    this.periodoService.crearPeriodo(this.periodoForm.value)
    .subscribe((resp:any) =>{
      Swal.fire('Creado',`${periodo}  creado correctamente`, 'success');
      this.router.navigateByUrl(`/dashboard/periodos/${resp.periodo._id}`)
    })
  }
  }


  guardarMateria(){
    const {periodo} =this.periodoForm.value;
    
    if (this.periodoSeleccionado) {
      //Actualizar
      const data = {
        ...this.periodoForm.value,
        _id:this.periodoSeleccionado._id
      } 
      this.materiaService.actualizarMateria(data)
      .subscribe(resp=>{
        console.log(resp )
        Swal.fire('Actualizado',`${periodo}  actualizado correctamente`, 'success');
      })
    }else{
      //Crear 
      this.periodoService.crearPeriodo(this.periodoForm.value)
        .subscribe((resp:any) =>{
          Swal.fire('Creado',`${periodo}  creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/materia/${resp.periodo._id}`)
        })
    }


  }


}



