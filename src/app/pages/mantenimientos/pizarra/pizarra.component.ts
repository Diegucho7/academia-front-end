import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { EstudianteService } from '../../../services/estudiante.service';
import { Periodo } from '../../../models/periodo.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PizarraService } from '../../../services/pizarra.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pizarra',
  templateUrl: './pizarra.component.html',
  // styleUrl: './pizarra.component.css'
})
export class PizarraComponent implements OnInit {

  public cargando: boolean = true;

  public cursos : Periodo[]=[];
  public periodo: Periodo[]= [];
  public periodosTemp: Periodo[]= [];

  public uid: string = ''
  public nombre : string = ''
  public apellido : string = ''
  public role :'ADMIN_ROLE' | 'USER_ROLE' | 'PROFESOR_ROLE' | 'ESTUDIANTE_ROLE'|'CONTADOR_ROLE' | undefined
  
  public myForm: FormGroup = this.fb.group({
    periodo :  ['',Validators.required ],
    asunto :  ['',Validators.required ],
    tarea :  ['',Validators.required ],

 
  });
  constructor(usuarioService:UsuarioService,
              private estudianteService:EstudianteService,
              private fb: FormBuilder,
              private pizarraService: PizarraService,
              private router : Router
  ) { 
    this.uid = usuarioService.uid,
    this.nombre = usuarioService.nombre,
    this.apellido = usuarioService.apellido,
    this.role = usuarioService.role
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    console.log(this.role),
    this.cargarPeriodo(this.uid)
  }

  enviar(){
    console.log(this.myForm.value)
  }


  guardarTarea(){

    

    // const {nota} =this.myForm.value;

    // if (this.notaSeleccionada) {
    //   //Actualizar
    //   const data = {
    //     ...this.myForm.value,
    //     _id:this.notaSeleccionada._id
    //   }
    //   this.notaService.actualizarNota(data)
    //   .subscribe(resp=>{
       
    //     Swal.fire('Actualizado',`Actualizado correctamente`, 'success');
    //   })
    // }else{
      //Crear
      console.log(this.myForm.value)
      this.pizarraService.crearPizarra(this.myForm.value)
        .subscribe((resp:any) =>{
          Swal.fire('Creado',`Creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/pizarra/${resp.pizarra._id}`)
        })
    }


  // }


  cargarPeriodo(id:string){
    // this.periodoService.cargarPeriodos().subscribe(periodos => {
    //   this.periodo = periodos;
   
    this.cargando = true;
    this.estudianteService.cargarNotasPorProfesor(id)
                        .subscribe( resp =>{
                          this.cargando = false;
                         this.cursos = resp; 

                         this.cursos   = resp;
                         this.periodosTemp = resp;
                         console.log(this.cursos);
                         this.cargando = false;
              
                        })
  }

}
