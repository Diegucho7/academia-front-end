import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AcademiaService } from '../../../services/academia.service';
import { ProfesorService } from '../../../services/profesor.service';
import { MateriaService } from '../../../services/materia.service';
import { Academia } from '../../../models/academia.model';
import { Profesor } from '../../../models/profesor.model';
import { Materia } from '../../../models/materia.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styles: ``
})
export class ProfesorComponent implements OnInit {

  public academias: Academia[] = [];
  public materias: Materia[] = [];
  public profesorForm!: FormGroup;

  public profesorSeleccionado?: Profesor;
  public academiaSeleccionada?: Academia;
  public materiaSeleccionada?: Materia;

  constructor(
            private fb: FormBuilder,
            private academiaSevice: AcademiaService,
            private materiaSevice: MateriaService,
            private profesorService:ProfesorService,
            private router: Router,
            private activateRoute:ActivatedRoute
  ){

  }

  ngOnInit(): void {

    this.activateRoute.params
    .subscribe( ({id}) => 
    {this.cargarProfesor(id)});
    // this.medicoService.obtenerMedicoPorId
    // console.log(this.hospitalSeleccionado?.img)
this.profesorForm = this.fb.group({
  nombre: ['', Validators.required],
  apellido: ['', Validators.required],
  academia: ['', Validators.required],
  materia:['',Validators.required]
})

    this.cargarAcademias();
    this.cargarMaterias();
    this.profesorForm.get('academia ')?.valueChanges.
    
                                      subscribe( AcademialId =>{
                                        this.academiaSeleccionada = this.academias.find(h => h._id === AcademialId)
    } );
    this.profesorForm.get('materia ')?.valueChanges.
                                    subscribe( MateriaId =>{
                                      this.materiaSeleccionada = this.materias.find(u => u._id === MateriaId)
                                    })
  }
  

  cargarProfesor(id:string){

    if (id === 'nuevo') {
      return;
    }

    this.profesorService.obtenerProfesorPorId(id)
    
                              .pipe(
                                delay(100)
                              )
                              .subscribe( (profesor:any) => {   
                                  const { nombre, apellido, materia, academia: {_id}} = profesor
                                  this.profesorSeleccionado = profesor
                                  this.profesorForm.setValue( { nombre: nombre, apellido: apellido, materia , academia: _id} )
                              }, error => {
                                return this.router.navigateByUrl(`/dashboard/profesores`);
                              })
  }

  cargarAcademias(){
    

    this.academiaSevice.cargarAcademias()
                        .subscribe((academias:Academia[]) =>{
                          this.academias = academias;
                        })
  }
  cargarMaterias(){
    

    this.materiaSevice.cargarMaterias()
                        .subscribe((materias:Materia[]) =>{
                          this.materias = materias;
                        })
  }

  guardarProfesor(){
    const {nombre,apellido} =this.profesorForm.value;
    
    if (this.profesorSeleccionado) {
      //Actualizar
      const data = {
        ...this.profesorForm.value,
        _id:this.profesorSeleccionado._id
      } 
      this.profesorService.actualizarProfesor(data)
      .subscribe(resp=>{
        console.log(resp )
        Swal.fire('Actualizado',`${nombre} ${apellido} actualizado correctamente`, 'success');
      })
    }else{
      //Crear 
      this.profesorService.crearProfesor(this.profesorForm.value)
        .subscribe((resp:any) =>{
          Swal.fire('Creado',`${nombre} ${apellido} creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/profesor/${resp.profesor._id}`)
        })
    }


  }

}
