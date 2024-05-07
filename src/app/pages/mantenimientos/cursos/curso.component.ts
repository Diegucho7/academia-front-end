import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { CursoService } from '../../../services/curso.service';
import { MateriaService } from '../../../services/materia.service';
import { Curso } from '../../../models/curso.model';
import { Materia } from '../../../models/materia.model';
@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styles: ``
})
export class CursoComponent {
  public cursos: Curso[] = [];
  public cursoForm!: FormGroup;

  public materiaSeleccionada?: Materia;
  public cursoSeleccionado?: Curso;

  constructor(
            private fb: FormBuilder,
            private cursoService: CursoService,
            private materiaService:MateriaService,
            private router: Router,
            private activateRoute:ActivatedRoute
  ){}
  ngOnInit(): void {

    // this.activateRoute.params
    // .subscribe( ({id}) => 
    // {this.cargarCurso(id)});
    // this.medicoService.obtenerMedicoPorId
    // console.log(this.hospitalSeleccionado?.img)
this.cursoForm = this.fb.group({
  nombre: ['', Validators.required],
  // curso: ['', Validators.required]
})

    this.cargarCurso();
    this.cursoForm.get('curso')?.valueChanges.
                                    subscribe( CursoId =>{
                                      this.cursoSeleccionado = this.cursos.find(h => h._id === CursoId)
                                    })
  }



  cargarCurso(){
    

    this.cursoService.cargarCursos()
                        .subscribe((cursos:Curso[]) =>{
                          this.cursos = cursos;
                        })
  }

  guardarCurso(){
    const {nombre} =this.cursoForm.value;
    
    if (this.cursoSeleccionado) {
      //Actualizar
      const data = {
        ...this.cursoForm.value,
      
      } 
      // this.cursoService.actualizarCurso(data)
      // .subscribe(resp=>{
      //   console.log(resp )
      //   Swal.fire('Actualizado',`${nombre}  actualizado correctamente`, 'success');
      // })
    }else{
      //Crear 
      this.cursoService.crearCurso(this.cursoForm.value)
        .subscribe((resp:any) =>{
          Swal.fire('Creado',`${nombre}  creado correctamente`, 'success');
          // this.router.navigateByUrl(`/dashboard/curso/${resp.curso._id}`)
        })
    }


  }


}
