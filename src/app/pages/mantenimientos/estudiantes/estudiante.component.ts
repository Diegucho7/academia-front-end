import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { CursoService } from '../../../services/curso.service';
import { EstudianteService } from '../../../services/estudiante.service';
import { Curso } from '../../../models/curso.model';
import { Estudiante } from '../../../models/estudiante.model';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styles:''
})
export class EstudianteComponent implements OnInit {
  public cursos: Curso[] = [];
  public estudianteForm!: FormGroup;

  public estudianteSeleccionada?: Estudiante;
  public cursoSeleccionado?: Curso;

  constructor(
            private fb: FormBuilder,
            private cursoService: CursoService,
            private estudianteService:EstudianteService,
            private router: Router,
            private activateRoute:ActivatedRoute
  ){}
  ngOnInit(): void {

    this.activateRoute.params
    .subscribe( ({id}) => 
    {this.cargarEstudiante(id)});
    // this.medicoService.obtenerMedicoPorId
    // console.log(this.hospitalSeleccionado?.img)
this.estudianteForm = this.fb.group({
  nombre: ['', Validators.required],
  curso: ['', Validators.required]
})

    this.cargarCurso();
    this.estudianteForm.get('curso')?.valueChanges.
                                    subscribe( CursoId =>{
                                      this.cursoSeleccionado = this.cursos.find(h => h._id === CursoId)
                                    })
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
                                  const { nombre, curso: { _id } } = estudiante
                                  this.estudianteSeleccionada = estudiante
                                  this.estudianteForm.setValue( { nombre: nombre, curso: _id} )
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
    const {nombre} =this.estudianteForm.value;
    
    if (this.estudianteSeleccionada) {
      //Actualizar
      const data = {
        ...this.estudianteForm.value,
        _id:this.estudianteSeleccionada._id
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



