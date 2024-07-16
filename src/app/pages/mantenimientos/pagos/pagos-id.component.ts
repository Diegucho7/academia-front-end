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
import { Estudiante } from '../../../models/estudiante.model';

@Component({
  selector: 'app-pagos-id',
  templateUrl: './pagos-id.component.html',
  styles: ``
})
export class PagosIdComponent  implements OnInit {
  public cargando: boolean = true;
  public periodo: Periodo[] = [];
  public period?: Estudiante;
  public estudiante: EstudianteAc[] = [];
  public notaSeleccionada?: Estudiante;
  public cantidad! : number ;
  public cread : boolean = false;

  public suma : number = 0;
  public promedio : number = 0;
  public aprobado : boolean = false;
  public valores? : number[]= []
  public estudiantes: Estudiante[] = [];
  public estudiantesTemp:Estudiante[] =  [];

  public modu:number = 0;

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
    private estudianteService: EstudianteService,
  
    
  ) {
    
}

ngOnInit(): void {

  // this.activateRoute.params
  // .subscribe( ({id}) => 
  // {this.cargarEstudiantes(id)

  // });

  this.activateRoute.params
  .subscribe( ({id}) => 
    {this.cargarPago(id)});
  
  
  this.onPeriodoChanged();
  this.cargarPeriodo ();
  this.numeroModulos();
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
  // const data = this.activateRoute.params;
  
  this.cargando = true;
  this.estudianteService.cargarEstudiantesPorNotas(id)
  .subscribe( estudiantes =>{
    this.cargando = false;
                       this.estudiantes = estudiantes; 

                       this.estudiantes   = estudiantes;
                       this.estudiantesTemp = estudiantes;
                       this.cargando = false;

            this.ciclo();
                      })



}

ciclo(){
  this.aprobado = false;
  for (let index = 0; index < this.estudiantes.length; index++) {

    this.valores = this.estudiantes[index].modulos

    this.suma = (this.valores as number[]).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    this.promedio = this.suma / this.estudiantes[index].curso?.modulos! as number;
    if (this.promedio >= 8) {
      this.aprobado = true;
      this.estudiantes[index].aprobado = true;
    } else {
      this.aprobado = false;
      this.estudiantes[index].aprobado = false;
    }
    // this.ComprobadorAprobado();

  }
}
addModulo(index:number) {

  if (this.notaSeleccionada?.modulos === undefined) {
    
    this.modulo.push(this.fb.control(0));
  }

  

  if (this.notaSeleccionada) {

    
     
      

      this.modulo.push(this.fb.control(this.notaSeleccionada?.pagos![index]));  
     
    
  }


 
}


ComprobadorAprobado(){
  if(this.notaSeleccionada){
    this.cread = true;

    this.suma = (this.notaSeleccionada.pagos as number[]).reduce((accumulator, currentValue) => accumulator + currentValue, 0);        

    if (this.suma == this.notaSeleccionada.curso?.valor! as number) {
      this.aprobado = true;
      
    } else {
      // this.promedio = this.suma  this.notaSeleccionada.curso?.valor! as number;
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
cargarPago(id:string){
  if (id === 'nuevo') {
    return;
  }

  if (id !== undefined) {

    this.estudianteService.obtenerEstudiantePorId(id)
    .pipe(
      delay(100)
    )
                            .subscribe( (estudiantes:any) => {   
                              
                              const { curso, usuario,modulos} = estudiantes
                                this.notaSeleccionada = estudiantes
                                this.myForm.setValue( { periodo: curso._id , estudiante: usuario._id, modulos: []} )
                                // this.cdRef.detectChanges();
                              }, error => {
                              return this.router.navigateByUrl(`/dashboard/pagos`);
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
      
      this.modu = this.notaSeleccionada?.curso?.modulos ?? 0
      // this.estudianteService.obtenerEstudiantePorId(this.jd!).subscribe(resp => {
        // this.period = resp;
        let array = this.myForm.get('modulos') as FormArray;

          for ( let index = 0 ; index  < this.modu ?? 0; index++) {

            
            this.addModulo(index);
           
          } 
          
          this.ComprobadorAprobado();
          this.cantidad = array.length
          
     
  // })
  }
}

guardarNota(){

  

  const {nota} =this.myForm.value;
    console.log(nota)

  // if (this.notaSeleccionada) {
  //   //Actualizar
  //   const data = {
  //     ...this.myForm.value,
  //     _id:this.notaSeleccionada._id
  //   }
  //   this.estudianteService.actualizarEstudiante(data)
  //   .subscribe(resp=>{
     
  //     Swal.fire('Actualizado',`Actualizado correctamente`, 'success');
  //   })
  // }else{
  //   //Crear
  //   console.log(this.myForm.value)
  //   this.notaService.crearNota(this.myForm.value)
  //     .subscribe((resp:any) =>{
  //       Swal.fire('Creado',`Creado correctamente`, 'success');
  //       this.router.navigateByUrl(`/dashboard/notas/${resp.nota._id}`)
  //     })
  // }


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
