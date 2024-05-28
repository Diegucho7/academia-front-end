import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { FileUploadService } from '../../../services/file-upload.service';
import { PeriodoService } from '../../../services/periodo.service';
import { Periodo } from '../../../models/periodo.model';


@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styles: ``
})

export class NotasComponent implements OnInit {
  // public cargando: boolean = true;
  // public materias : Materia[] =[];

  
  public perfilForm!: FormGroup;
  public usuario!: Usuario;
  public imagenSubir!: File;
  public imgTemp: any = null ;
  public periodos: Periodo[] = [];
  public cargando: boolean = true;
  public periodosTemp:Periodo[] =  [];
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private fileUploadservice: FileUploadService,
              private periodoService: PeriodoService
    ){
        this.usuario = usuarioService.usuario;
  }
  ngOnInit(): void {
    this.cargarPeriodos();
    this.perfilForm = this.fb.group({
      nombre:[this.usuario.nombre + ' ' + this.usuario.apellido,Validators.required],
      curso:[" ",Validators.required],
      email:[this.usuario.email,[Validators.required, Validators.email]],
    })
  }

  actualizarPerfil(){
    console.log(this.perfilForm.value); 
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
    .subscribe(() =>{ 
      const {nombre, apellido, email} = this.perfilForm.value
      this.usuario.nombre = nombre;
      this.usuario.apellido = apellido;
      this.usuario.email = email;


      Swal.fire('Guardado', 'Cambios fueron guardados','success');
    },(err)=>{
      Swal.fire('Error', err.error.msg,'error');
      
    })
    ;
  }

  cambiarImagen(file:File){
   this.imagenSubir = file;


   if(!file){return;}

   const reader = new FileReader();
   const url64 = reader.readAsDataURL(file);


   reader.onloadend = () =>{
    this.imgTemp = reader.result;
   }
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

  subirImagen(){
    this.fileUploadservice.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid!)
    .then( img =>{
      this.usuario.img = img ;
      // Swal.fire('Guardado', 'Cambios fueron guardados','success');

    }).catch (err=>{
      console.log(err);
      Swal.fire('Error', err.error.msg,'error')

    })
      
  }
}
