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
  selector: 'app-notas-cursos',
  templateUrl: './notas-cursos.component.html',
  styles: ``
})
export class NotasCursosComponent implements OnInit {


  public cargando: boolean = true;

  public periodo: Periodo[] = [];
  public period?: Periodo;
  public estudiante: EstudianteAc[] = [];
  public notaSeleccionada?: Nota;
  public cantidad! : number ;
  public cread : boolean = false;

public hdh: number = 0

  public suma : number = 0;
  public promedio : number = 0;
  public aprobado : boolean = false;

  public est?: Estudiante
  public estudiantes: Estudiante[] = [];
  public estudiantesTemp?:Estudiante;
  
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
    {this.cargarEstudiantes(id)});
  // this.ComprobadorAprobado();
 
  // this.cargarPeriodo ();
  // this.numeroModulos();
}

cargarPeriodo(){
  this.periodoService.cargarPeriodos().subscribe(periodos => {
    this.periodo = periodos;
 
  });
}


get modulo() {
  
  return this.myForm.get('modulos') as FormArray;
  
}

cargarEstudiantes(id:string){
  this.cargando = true;
  this.estudianteService.obtenerEstudiantePorId(id)
                      .subscribe( est =>{
                        this.cargando = false;
                       this.est = est; 

                       this.est   = est;
                       this.estudiantesTemp = est;
                       this.cargando = false;
                       this.hdh = this.estudiantesTemp.modulos?.length as number;
                       this.ComprobadorAprobado(this.hdh);
                      })




}


addModulo(index:number) {

if (this.estudiantesTemp?.curso?.modulos === undefined) {
    
    this.modulo.push(this.fb.control(0));
  }

  

  if (this.estudiantesTemp?.curso?.modulos !== undefined) {
    this.modulo.push(this.fb.control(this.estudiantesTemp?.modulos![index]));   
    
  }


 
}


ComprobadorAprobado(ne:Number){
  if(this.estudiantesTemp?.modulos){
    this.cread = true;
    this.suma = (this.estudiantesTemp?.modulos as number[]).reduce((accumulator, currentValue) => accumulator + currentValue, 0);        
    
    this.promedio = this.suma / this.estudiantesTemp?.curso?.modulos! as number;
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

    this.estudianteService.obtenerEstudiantePorId(id)
    .pipe(
      delay(100)
    )
                            .subscribe( (estudiantes:any) => {   
                                const { curso, estudiante,modulos} = estudiantes
                                this.estudiantesTemp = estudiantes
                                this.cargando = false;
                                this.myForm.setValue( { periodo: curso._id , estudiante: estudiante._id, modulos: [] } )
                                this.ComprobadorAprobado(estudiante.modulos?.length);
                                console.log(this.estudiantesTemp);
                            }, error => {
                              return this.router.navigateByUrl(`/dashboard/notas-cursos`);
                            })


  }
}



get periodos(): Periodo[] {

  return this.periodo;

}
numeroModulos(){
   
   
  // if (this.cantidad > 0 ) {

  //   for (let index = 0; index < this.cantidad; index++) {

  //     this.modulo.removeAt(-1);
      
  //   }

  // }

  // if (this.myForm.get('periodo')?.value !== "") {
    
    this.modulos = []
    
    this.jd = this.myForm.get('periodo')?.value ?? "0";
      
      
    //   this.periodoService.obtenerPeriodoPorId(this.jd!).subscribe(resp => {
    //     this.period = resp;
    let array = this.myForm.get('modulos') as FormArray;
    
    
    for ( let index = 0 ; index  < (this.estudiantesTemp?.curso?.modulos! ?? 0); index++) {
      
      
      this.addModulo(index);
      console.log("hola mundo");
           
          } 
          
          // this.ComprobadorAprobado(hdh);
          this.cantidad = array.length
          
     
  // })
  }
// }

}
