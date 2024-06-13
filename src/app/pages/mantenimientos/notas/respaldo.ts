// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import Swal from 'sweetalert2';

// import { UsuarioService } from '../../../services/usuario.service';
// import { Usuario } from '../../../models/usuario.model';
// import { FileUploadService } from '../../../services/file-upload.service';
// import { PeriodoService } from '../../../services/periodo.service';
// import { Periodo } from '../../../models/periodo.model';
// import { EstudianteService } from '../../../services/estudiante.service';
// import { Estudiante } from '../../../models/estudiante.model';
// import { Curso } from '../../../models/curso.model';
// import { delay, pipe, switchMap, tap } from 'rxjs';
// import { SelectService } from '../../../services/select.service';
// import { SmallCountry, EstudianteAc } from '../../../interfaces/periodos.interface';


// // @Component({
// //   selector: 'app-notas',
// //   // templateUrl: './notas.component.html',
// //   styles: ``
// // })

// export class NotasComponendt implements OnInit {
//   // public cargando: boolean = true;
//   // public materias : Materia[] =[];

  
//   public notasForm!: FormGroup;
//   public usuario: Usuario;
//   public usuarios: Usuario[] = [];
//   public usuariosTemp:Usuario[] =  [];
//   public imagenSubir!: File;
//   public imgTemp: any = null ;
//   public periodos: Periodo[] = [];
//   // public estudiantes: Estudiante[] = [];
//   public estudiantes: any[] = [];
//   public cargando: boolean = true;
//   public periodosTemp:Periodo[] =  [];
//   public estudiantesTemp:Periodo[] =  [];
//   public totalUsuarios:number = 0;
//   public desde: number = 0;
//   public role: string = "PROFESOR_ROLE";
//   public id?: string;

//   // public estudiante: SmallCountry[] = [];

//   public periodoSeleccionado?: string|undefined;

//   constructor(private fb: FormBuilder,
//               private usuarioService: UsuarioService,
//               private fileUploadservice: FileUploadService,
//               private periodoService: PeriodoService,
//               private estudianteService: EstudianteService,
//               // private selectService: selectService
//     ){
//         this.usuario = usuarioService.usuario;
//   }
//   ngOnInit(): void {
//     this.cargarPeriodos();
//     this.onPeriodosChance();
//     // this.CargarUsuarios();
//     this.cargarEstuden();
//     this.notasForm = this.fb.group({
//       nombre:[this.usuario.nombre + ' ' + this.usuario.apellido,Validators.required],
//       estudiante:["",Validators.required],
//       curso:["",Validators.required],
//       notas:["",Validators.required],
//     })
//   }

//   actualizarPerfil(){
//     console.log(this.notasForm.value); 
//     this.usuarioService.actualizarPerfil(this.notasForm.value)
//     .subscribe(() =>{ 
//       const {nombre, apellido, email} = this.notasForm.value
//       this.usuario.nombre = nombre;
//       this.usuario.apellido = apellido;
//       this.usuario.email = email;


//       Swal.fire('Guardado', 'Cambios fueron guardados','success');
//     },(err)=>{
//       Swal.fire('Error', err.error.msg,'error');
      
//     })
//     ;
//   }
  
//   cambiarImagen(file:File){
//    this.imagenSubir = file;


//    if(!file){return;}

//    const reader = new FileReader();
//    const url64 = reader.readAsDataURL(file);


//    reader.onloadend = () =>{
//     this.imgTemp = reader.result;
//    }
//   }


//   cargarPeriodos(){
//     this.cargando = true;
//     this.periodoService.cargarPeriodos()
//     .subscribe(periodos=>{
      
//                          this.cargando = false;
//                          this.periodos   = periodos;
//                          this.periodosTemp = periodos;
//                          this.cargando = false;
//                         //  console.log(periodos)

//                          const data = Object.values(periodos)
                          
//                       });
//   }


//   onPeriodosChance():void{
//     this.notasForm.get('curso')?.valueChanges
//     .pipe(
//       tap( () => this.notasForm.get('estudiante')!.setValue('') ),
//       // tap( () => this.borders = [] ),
//       // switchMap( (curso) => this.selectService.getEstudianteBycurso(curso) ),
//       )
//       .subscribe( estudiantes => {
//         this.estudiantes = estudiantes;
//         console.log(this.estudiantes);
//         });
//       // console.log(this.notasForm.get('curso')?.value);
//   }

//   variableId(id:string){
    
//   }

//   cargarEstudiantes(id:string){

    
                             



//     // Aquí puedes hacer la consulta en cascada según el valor seleccionado
//     // Por ejemplo:
//     this.estudianteService.obtenerEstudiantePorCursoId(this.notasForm.get('curso')?.value).subscribe((estudiantes) => {
//       // Procesa los datos obtenidos
//       console.log(this.notasForm.get('curso')?.value);
//       console.log(estudiantes);
      
//       // this.notasForm.setValue( { estudiantes} )      
//     });
//   }

//   cargarEstuden(){


//     this.cargando = true;
//     this.usuarioService.cargarUsuariosEstudiante(this.desde)
//     .subscribe(({total, usuarios})=>{
//       this.totalUsuarios = total;

        
//         this.usuarios = usuarios;
//         this.usuariosTemp = usuarios;
//         this.cargando = false;
        
//     })
//   }

//   subirImagen(){
//     this.fileUploadservice.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid!)
//     .then( img =>{
//       this.usuario.img = img ;
//       // Swal.fire('Guardado', 'Cambios fueron guardados','success');

//     }).catch (err=>{
//       console.log(err);
//       Swal.fire('Error', err.error.msg,'error')

//     })
      
//   }
// }
