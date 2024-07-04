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
@Component({
  selector: 'app-selector-page',
  templateUrl: './reviso.component.html',
  styles: [
  ]
  })
  export class RevisoComponent implements OnInit {
    public periodo: Periodo[] = [];
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
      private activateRoute:ActivatedRoute
      
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
     
    }
  }


  cargarNota(id:string){
    if (id === 'nuevo') {
      return;
    }
 
    if (id !== undefined) {

      this.notaService.obtenerNotaPorId(id)
      .pipe(
        delay(100)
      )
                              .subscribe( (nota:any) => {   
                                  const { periodo, estudiante,modulos} = nota
                                  this.notaSeleccionada = nota
                                  this.ComprobadorAprobado();
                                
                                  this.myForm.setValue( { periodo: periodo._id , estudiante: estudiante._id, modulos: [] } )
                              }, error => {
                                return this.router.navigateByUrl(`/dashboard/notas`);
                              })


    }
  }

  
  
  get periodos(): Periodo[] {
 
    return this.periodo;

  }

 

  }
