import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AcademiaService } from '../../../services/academia.service';
import { ProfesorService } from '../../../services/profesor.service';

import { Academia } from '../../../models/academia.model';
import { Profesor } from '../../../models/profesor.model';

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
 
  public profesorForm!: FormGroup;

  public profesorSeleccionado?: Profesor;
  public academiaSeleccionada?: Academia;

  constructor(
            private fb: FormBuilder,
            private academiaSevice: AcademiaService,
   
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
  
})

    this.cargarAcademias();
    // this.cargarMaterias();
    this.profesorForm.get('academia ')?.valueChanges.
    
                                      subscribe( AcademialId =>{
                                        this.academiaSeleccionada = this.academias.find(h => h._id === AcademialId)
    } );
  
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
                                  const { nombre, apellido, academia: {_id}} = profesor
                                  this.profesorSeleccionado = profesor
                                  this.profesorForm.setValue( { nombre: nombre, apellido: apellido , academia: _id} )
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
