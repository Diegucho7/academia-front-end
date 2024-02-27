import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;
  public usuario!: Usuario;
  public imagenSubir!: File;
  public imgTemp: any = null ;

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private fileUploadservice: FileUploadService 
    ){
        this.usuario = usuarioService.usuario;
  }
  ngOnInit(): void {
    
    this.perfilForm = this.fb.group({
      nombre:[this.usuario.nombre,Validators.required],
      apellido:[this.usuario.apellido,Validators.required],
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