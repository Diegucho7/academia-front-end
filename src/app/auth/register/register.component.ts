import Swal from 'sweetalert2'
import { Router } from '@angular/router';
  import { Component } from '@angular/core';
import { FormBuilder, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private route: Router){}
  public formSubmitted = false;

  public registerForm = this.fb.group({

    nombre:['Diego',Validators.required],
    apellido:['Velarde',Validators.required],
    cedula:['0937261728',Validators.required],
    telefono:['0123456789',Validators.required],
    email:['dievelar@gmail.com',[Validators.required, Validators.email]],
    password:['12345678',[Validators.required, Validators.minLength(2)]],
    password2:['12345678',Validators.required],
    terminos: [true, Validators.requiredTrue]
    
    
  },
  {
    validators: this.passwordsIguales('password','password2')
  } );


  
  crearUsuario(){
    this.formSubmitted = true;  
    console.log( this.registerForm.value);

    if (this.registerForm.invalid){
      // console.log('algo salio mal')
      return;
    }else{
      //Realiza el posteo
      this.usuarioService.crearUsuario( this.registerForm.value)
                          .subscribe( resp  => {
                            this.route.navigateByUrl('/login')
                          }, (err) => {

                            // Si sucede un error

                            Swal.fire('Error',err.error.msg,'error');

                          });
                     
 
  
    }
  }

  campoNoValido(campo:string):boolean{
    if( this.registerForm.get(campo)!.invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }
    
   }

   contrasenasNoValidas(campo: string){
      const pass1 = this.registerForm.get('password')!.value;
      const pass2 = this.registerForm.get('password2')!.value;

      if((pass1 !== pass2) && this.formSubmitted){
          return true
      }else{
        return false  ;
      }
   }


   passwordsIguales(pass1Name:string, pass2Name:string){

    return(formGroup: FormGroup) =>{

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if(pass1Control?.value === pass2Control?.value){
        pass2Control?.setErrors(null)
      }else{
        pass2Control?.setErrors({noEsIgual:true})
      }

    }

   }
}
