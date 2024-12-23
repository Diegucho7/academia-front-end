// import { alumno } from './../../../interfaces/country.interfaces';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectService } from '../../../services/select.service';
import { PeriodoService } from '../../../services/periodo.service';
import { Periodo } from '../../../models/periodo.model';
import { EstudianteAc } from '../../../models/estudianteUser.model';

import { Nota } from '../../../models/nota.model';
import Swal from 'sweetalert2';
import { NotaService } from '../../../services/nota.service';
import { EstudianteService } from '../../../services/estudiante.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './notas.component.html',
  styles: [
  ]
  })
  export class NotasComponent implements OnInit {

    public cargando: boolean = true;

    public cursos : Periodo[]=[];
    public periodo: Periodo[]= [];
    public periodosTemp: Periodo[]= [];


    public period?: Periodo;
    public estudiante: EstudianteAc[] = [];
    public notaSeleccionada?: Nota;
    public cantidad! : number ;
    public cread : boolean = false;

    public suma : number = 0;
    public promedio : number = 0;
    public aprobado : boolean = false;
    
    public myForm: FormGroup = this.fb.group({
      periodo : ['', Validators.required ],
      estudiante: ['', Validators.required ],
      modulos : this.fb.array([])

   
    });
    
    public modulos : number[] = [0];
    public jd? :string = "0";
    
    
    constructor(
      private fb: FormBuilder,
      private selectService: SelectService,
      private periodoService: PeriodoService,
      private router : Router,
      private notaService : NotaService,
      private activateRoute:ActivatedRoute,
      private estudianteService:EstudianteService,
      private usuarioService:UsuarioService
      
    ) {
      
  }
  
  ngOnInit(): void {
    // this.activateRoute.params
    // .subscribe( ({id}) => 
    //   {this.cargarNota(id)});
    
    this.onPeriodoChanged();
    this.numeroModulos();
    this.cargarPeriodo (this.usuarioService.uid);
    this.cargarNota (this.usuarioService.uid);
  }
  
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
  
  
  get modulo() {
    
    return this.myForm.get('modulos') as FormArray;
    
  }

  addModulo(index:number) {

    if (this.notaSeleccionada?.modulos === undefined) {
      
      this.modulo.push(this.fb.control(0));
    }

    

    if (this.notaSeleccionada) {
        this.modulo.push(this.fb.control(this.notaSeleccionada?.modulos![index]));  
    }
  }
  
  ComprobadorAprobado(){
    if(this.notaSeleccionada){
      this.cread = true;

      this.suma = (this.notaSeleccionada.modulos as number[]).reduce((accumulator, currentValue) => accumulator + currentValue, 0);        
      
      this.promedio = this.suma / this.notaSeleccionada.modulos!.length;
      if (this.promedio >= 8) {
        this.aprobado = true;
      } else {
        this.aprobado = false;
      }
      
      const Periodo = document.getElementById('periodo_id') as HTMLSelectElement;
      Periodo.disabled = true;
      const Estudiante = document.getElementById('estudiante_id') as HTMLSelectElement;
      Estudiante.disabled = true;
 
    }
  }

  deleteModulo(index:number){
    
    this.modulo.removeAt(index);
  }
  cargarNota(id:string){
    if (id === 'nuevo') {
      return;
    }
 
    if (id !== undefined) {

      this.estudianteService.cargarNotasPorProfesor(id)
      .pipe(
        delay(100)
      )
                              .subscribe( (nota:any) => {   
                                  const { periodo, estudiante,modulos} = nota
                                  this.notaSeleccionada = nota
                                  
                                
                                  this.myForm.setValue( { periodo: periodo._id , estudiante: estudiante._id, modulos: [] } )
                              }, error => {
                                return this.router.navigateByUrl(`/dashboard/notas`);
                              })


    }
  }

 

  numeroModulos(){
   
   
    if (this.cantidad > 0 ) {

      for (let index = 0; index < this.cantidad; index++) {

        this.modulo.removeAt(-1);
        
      }

    }

    if (this.myForm.get('periodo')?.value !== "") {
      
      this.modulos = []
      
      this.jd = this.myForm.get('periodo')?.value ?? "0";
        
        
        this.periodoService.obtenerPeriodoPorId(this.jd!).subscribe(resp => {
          this.period = resp;
          let array = this.myForm.get('modulos') as FormArray;
          

            for ( let index = 0 ; index  < (this.period.modulos! ?? 0); index++) {

              
              this.addModulo(index);
             
            } 
            
            this.ComprobadorAprobado();
            this.cantidad = array.length
            
       
    })
    }
  }

  guardarNota(){

    

    const {nota} =this.myForm.value;

    if (this.notaSeleccionada) {
      //Actualizar
      const data = {
        ...this.myForm.value,
        _id:this.notaSeleccionada._id
      }
      this.notaService.actualizarNota(data)
      .subscribe(resp=>{
       
        Swal.fire('Actualizado',`Actualizado correctamente`, 'success');
      })
    }else{
      //Crear
      console.log(this.myForm.value)
      this.notaService.crearNota(this.myForm.value)
        .subscribe((resp:any) =>{
          Swal.fire('Creado',`Creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/notas/${resp.nota._id}`)
        })
    }


  }
  get periodos(): Periodo[] {
 
    return this.periodo;

  }

  onPeriodoChanged(): void {
   
    this.myForm.get('periodo')?.valueChanges
    .pipe(
      tap( () => this.myForm.get('estudiante')!.setValue('') ),

      switchMap( (periodo) => this.selectService.getEstudiantebyCurse(periodo) )
      )
      .subscribe( estudiantes => {
        this.estudiante= estudiantes ;
      }
         );

 }

}
