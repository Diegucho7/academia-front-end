// import { alumno } from './../../../interfaces/country.interfaces';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, switchMap, tap } from 'rxjs';

import {  SmallCountry } from '../../../interfaces/country.interfaces';
import { SelectService } from '../../../services/select.service';
import { PeriodoService } from '../../../services/periodo.service';
import { Periodo } from '../../../models/periodo.model';
import { Usuario, Credenciales, User } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { EstudianteAc } from '../../../models/estudianteUser.model';
import { UserIterfaz } from '../../../models/IntefazUser.model';
import { EstudianteService } from '../../../services/estudiante.service';
import { Estudiante } from '../../../models/estudiante.model';

@Component({
  selector: 'app-selector-page',
  templateUrl: './notas.component.html',
  styles: [
  ]
  })
  export class NotasComponent implements OnInit {


    public cargando: boolean = true;
    public periodosTemp :Periodo[] =  [];
    public countriesByRegion: SmallCountry[] = [];
    public borders: SmallCountry[] = [];
    public periodo: Periodo[] = [];
    public period?: Periodo;
    public estudiante: EstudianteAc[] = [];
    public usuario?: UserIterfaz;
    public credenciales: Usuario[] = [];
    public nombre: string = "";
    public estudiantes: Estudiante[] = [];
    public estudiantesTemp:Estudiante[] =  [];
    
    
    public myForm: FormGroup = this.fb.group({
      periodo : ['', Validators.required ],
      estudiante: ['', Validators.required ],
      // modulo : [[''], Validators.required ],
      modulo : this.fb.array([]),
      });
      
      public modulo: FormArray = this.myForm.get('modulos') as FormArray;
      public modulos : number[] = [0];
      public jd? :string = "0";

  constructor(
    private fb: FormBuilder,
    private selectService: SelectService,
    private periodoService: PeriodoService,
    private estudianteService: EstudianteService

  ) {}

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

  
  numeroModulos(){
    if (this.myForm.get('periodo')?.value !== undefined) {

      this.modulos = []
      this.jd = this.myForm.get('periodo')?.value
      if (this.jd !== undefined) {
        
        this.periodoService.obtenerPeriodoPorId(this.jd).subscribe(resp => {
          this.period = resp;      
          if (this.period?.modulos !== undefined ) {
            
            for (let index = 1; index -1 < this.period?.modulos ?? 0; index++) {
              const cellValue = 1 + index;
              
              this.myForm.setControl('modulos ' + index, this.fb.control(cellValue));
              const element = [index];
              this.modulos = this.modulos.concat(element);
              this.myForm.get('modulos ' + index)?.setValue('0')

              
        }
        }
          
        })
      }
      
    }


  }
 
  get periodos(): Periodo[] {
    // this.cargando = true;
    return this.periodo;
    
  }
  guardarNotas() {
    console.log(this.myForm.value);
  }

  

  onPeriodoChanged(): void {
    this.myForm.get('periodo')?.valueChanges
    .pipe(
      tap( () => this.myForm.get('estudiante')!.setValue('') ),
      tap( () => this.estudiantes = [] ),
    
      switchMap( (periodo) => this.selectService.getEstudiantebyCurse(periodo) )
      )
      .subscribe( estudiantes => {
        this.estudiante= estudiantes ;
      }
         );
  }


}
