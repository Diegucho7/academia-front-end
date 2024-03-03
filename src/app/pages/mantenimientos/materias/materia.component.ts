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
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styles:''
})
export class MateriaComponent implements OnInit {
  public cursos: Curso[] = [];
  public materiaForm!: FormGroup;

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

    this.activateRoute.params
    .subscribe( ({id}) => 
    {this.cargarMateria(id)});
    // this.medicoService.obtenerMedicoPorId
    // console.log(this.hospitalSeleccionado?.img)
this.materiaForm = this.fb.group({
  nombre: ['', Validators.required],
  curso: ['', Validators.required]
})

    this.cargarCurso();
    this.materiaForm.get('curso')?.valueChanges.
                                    subscribe( CursoId =>{
                                      this.cursoSeleccionado = this.cursos.find(h => h._id === CursoId)
                                    })
  }

  cargarMateria(id:string){

    if (id === 'nuevo') {
      return;
    }

    this.materiaService.obtenerMateriaPorId(id)
    
                              .pipe(
                                delay(100)
                              )
                              .subscribe( (materia:any) => {
                                  const { nombre, curso: { _id } } = materia
                                  this.materiaSeleccionada = materia
                                  this.materiaForm.setValue( { nombre: nombre, curso: _id} )
                              }, error => {
                                return this.router.navigateByUrl(`/dashboard/materias`);
                              })
  }

  cargarCurso(){
    

    this.cursoService.cargarCursos()
                        .subscribe((cursos:Curso[]) =>{
                          this.cursos = cursos;
                        })
  }

  guardarMateria(){
    const {nombre} =this.materiaForm.value;
    
    if (this.materiaSeleccionada) {
      //Actualizar
      const data = {
        ...this.materiaForm.value,
        _id:this.materiaSeleccionada._id
      } 
      this.materiaService.actualizarMateria(data)
      .subscribe(resp=>{
        console.log(resp )
        Swal.fire('Actualizado',`${nombre}  actualizado correctamente`, 'success');
      })
    }else{
      //Crear 
      this.materiaService.crearMateria(this.materiaForm.value)
        .subscribe((resp:any) =>{
          Swal.fire('Creado',`${nombre}  creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/materia/${resp.materia._id}`)
        })
    }


  }


}



