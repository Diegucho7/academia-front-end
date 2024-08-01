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
import { Estudiante } from '../../../models/estudiante.model';
@Component({
  selector: 'app-selector-page',
  templateUrl: './reviso.component.html',
  styles: [
  ]
  })
  export class RevisoComponent implements OnInit {

    public hdh: number = 0

    public est?: Estudiante

    public selectElement = document.getElementById('estudent') as HTMLSelectElement;

    public cargando: boolean = true;

    public periodo: Periodo[] = [];
    public period?: Periodo;
    public estudiante?: Estudiante;

    public lista : Estudiante[] = []
    public notaSeleccionada?: Nota;
    public periodoSeleccionado?: Periodo;
    public cantidad! : number ;
    public cread : boolean = false;


    public estudiantes:Estudiante[] = [];
    public estudiantesTemp?:Estudiante;


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
      private estudianteService:EstudianteService
      
    ) {
      
  }
  
  ngOnInit(): void {
    this.activateRoute.params
    .subscribe( ({id}) => 
      {this.cargarNota(id)});
    this.ComprobadorAprobado();
   
    this.cargarPeriodo ();
  }
  
  cargarPeriodo(){
    this.periodoService.cargarPeriodos().subscribe(periodos => {
      this.periodo = periodos;
   
    });
  }
  
  
  get modulo() {
    
    return this.myForm.get('modulos') as FormArray;
    
  }

  addModulo(index:number) {

    if (this.estudiantesTemp?.curso?.modulos === undefined) {
    
      this.modulo.push(this.fb.control(0));
    }
  
    
  
    if (this.estudiantesTemp?.curso?.modulos !== undefined) {
      this.modulo.push(this.fb.control(this.estudiantesTemp?.modulos![index]));   
      
    }
  


   
  }

  
  
  onPeriodoChanged() {


                          this.cargando = true;
                          this.estudianteService.obtenerEstudiantePorId(this.myForm.get('estudiante')?.value)
                          .subscribe( est =>{
                            this.cargando = false;
                           this.est = est; 
    
                           this.est   = est;
                           this.estudiantesTemp = est;
                           this.cargando = false;
                           this.hdh = this.estudiantesTemp.modulos?.length as number;
                          //  console.log(this.estudiantesTemp)
                           this.ComprobadorAprobado();
                           this.numeroModulos()
                          })
    
    


 }
  
  ComprobadorAprobado(){


    if(this.estudiantesTemp){
      this.cread = true;
      this.suma = (this.estudiantesTemp?.modulos as number[]).reduce((accumulator, currentValue) => accumulator + currentValue, 0);        
      
      this.promedio = this.suma / this.estudiantesTemp.modulos!.length;
        if (this.promedio >= 8) {
          this.aprobado = true;
        } else {
          this.aprobado = false;
        }
     
    }

    
  }


  cargarNota(id:string){
    if (id === 'nuevo') {
      return;
    }
 
    if (id !== undefined) {
      this.cargando = true;
      this.estudianteService.cargarPeriodosPorId(id)
     
      .pipe(
        delay(100)
      )
                              .subscribe( (periodos:any) => {   
                                  const { _id} = periodos
                                  this.periodoSeleccionado = periodos
                                  // this.ComprobadorAprobado();
                                  this.cargando = false;
                                  // console.log(this.periodoSeleccionado)

                                  this.estudianteService.obtenerEstudiantePorCurso(id).subscribe( (estudiantes:any) => {

                                  this.lista = estudiantes
                                })
                                
                               
                                  this.myForm.setValue( { periodo: _id , estudiante:"" , modulos: [] } )
                              }, error => {
                                return this.router.navigateByUrl(`/dashboard/reviso/nuevo`);
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
        
        
      //   this.periodoService.obtenerPeriodoPorId(this.jd!).subscribe(resp => {
      //     this.period = resp;
      let array = this.myForm.get('modulos') as FormArray;
      
      
      for ( let index = 0 ; index  < this.estudiantesTemp?.curso?.modulos! ?? 0; index++) {
        
        
        this.addModulo(index);
             
            } 
            
            // this.ComprobadorAprobado(hdh);
            this.cantidad = array.length
            
       
    }
    }
  
    guardarNota(){

    

      const {nota} =this.myForm.value;
    
      if (this.estudiantesTemp) {
        //Actualizar
        const data = {
          ...this.myForm.value,
          _id:this.estudiantesTemp._id
        }
        this.estudianteService.actualizarEstudiante(data)
        .subscribe(resp=>{
         
          Swal.fire('Actualizado',`Actualizado correctamente`, 'success');
        })
      }
    
    }

  }
