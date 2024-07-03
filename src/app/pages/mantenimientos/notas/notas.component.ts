// import { alumno } from './../../../interfaces/country.interfaces';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, filter, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {  SmallCountry } from '../../../interfaces/country.interfaces';
import { SelectService } from '../../../services/select.service';
import { PeriodoService } from '../../../services/periodo.service';
import { Periodo } from '../../../models/periodo.model';
import { Usuario, Credenciales, User } from '../../../models/usuario.model';
import { EstudianteAc } from '../../../models/estudianteUser.model';
import { UserIterfaz } from '../../../models/IntefazUser.model';
import { EstudianteService } from '../../../services/estudiante.service';
import { Estudiante } from '../../../models/estudiante.model';
import { Nota } from '../../../models/nota.model';
import Swal from 'sweetalert2';
import { NotaService } from '../../../services/nota.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-selector-page',
  templateUrl: './notas.component.html',
  styles: [
  ]
  })
  export class NotasComponent implements OnInit {

    public periodo: Periodo[] = [];
    public period?: Periodo;
    public estudiante: EstudianteAc[] = [];
    public notaSeleccionada?: Nota;

    public cantidad : number = 0;


    public myForm: FormGroup = this.fb.group({
      periodo : ['', Validators.required ],
      estudiante: ['', Validators.required ],
      modulos : this.fb.array([]
      //   [
      //   this.fb.control('')
      // ]
    ),
      });

      public modulos : number[] = [0];
      public jd? :string = "0";


  constructor(
    private fb: FormBuilder,
    private selectService: SelectService,
    private periodoService: PeriodoService,
    private router : Router,
    private notaService : NotaService

  ) {
    
  }

  ngOnInit(): void {
    this.onPeriodoChanged();
    this.numeroModulos();
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

  addModulo() {
    this.modulo.push(this.fb.control(0));
    
  }
  
  deleteModulo(index:number){
    
    this.modulo.removeAt(index);
  }
  cargarNota(id:string){
    if (id === 'nuevo') {
      return;
    }

    // this.estudianteService.obtenerEstudiantePorId(id)
    
    //                           .pipe(
    //                             delay(100)
    //                           )
    //                           .subscribe( (estudiante:any) => {
    //                             console.log(estudiante)
    //                               const {  curso: { _id } } = estudiante
    //                               this.estudianteSeleccionada = estudiante
    //                               this.estudianteForm.setValue( { curso: _id} )
                                  
    //                           }, error => {
    //                             return this.router.navigateByUrl(`/dashboard/estudiantes`);
    //                           })
  }

 

  numeroModulos(){
   
    if (this.cantidad > 0) {

      for (let index = 0; index < this.cantidad; index++) {

        this.modulo.removeAt(-1);
        
      }

    }

    if (this.myForm.get('periodo')?.value !== "") {
      
      this.modulos = []
      
      this.jd = this.myForm.get('periodo')?.value ?? "0";
        
        
        this.periodoService.obtenerPeriodoPorId(this.jd!).subscribe(resp => {
          this.period = resp;
            console.log(resp)
          let array = this.myForm.get('modulos') as FormArray;
            for ( let index = 0 ; index  < this.period.modulos! ?? 0; index++) {

              
              this.addModulo();
              const temporal = index
              const element = [index];
              
              this.modulos = this.modulos.concat(element);
              this.myForm.get(`${index}`)?.setValue('0')
            } 
            
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
        console.log(resp )
        Swal.fire('Actualizado',`Actualizado correctamente`, 'success');
      })
    }else{
      //Crear
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
  guardarNotas() {
    console.log(this.myForm.value);
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

         console.log(this.periodo);
 }

}
