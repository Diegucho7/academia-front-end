import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, Subscription, switchMap, tap } from 'rxjs';
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
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { RecibosService } from '../../../services/recibos.service';
import { Recibo } from '../../../models/recibo.model';


@Component({
  selector: 'app-pagos-id',
  templateUrl: './pagos-id.component.html',
  styles: ``
})
export class PagosIdComponent  implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }
  public Recib?: Recibo[];
  public cargando: boolean = true;
  private imgSubs?: Subscription;
  public periodo: Periodo[] = [];
  public period?: Periodo;
  public estudiante: EstudianteAc[] = [];
  public pagoSeleccionado?: Estudiante;
  public cantidad! : number ;
  public cread : boolean = false;

public hdh: number = 0

  public suma : number = 0;
  public promedio : number = 0;
  public aprobado : boolean = false;

  public valores? : number[]= []

  public idPago:string = "";
  public est?: Estudiante
  public estudiantes: Estudiante[] = [];
  public estudiantesTemp?:Estudiante;
  
  public myForm: FormGroup = this.fb.group({
      // periodo : ['', Validators.required ],
    // estudiante: ['', Validators.required ],
    pagos : this.fb.array([])

 
  });
  
  public pagos : number[] = [0];
  public jd? :string = "0";
  

  
  constructor(
    private fb: FormBuilder,

    private router : Router,
    private activateRoute:ActivatedRoute,
    private estudianteService:EstudianteService,
    private modalImagenService: ModalImagenService,
    private reciboService: RecibosService,
    
    
  ) {
    
}

ngOnInit(): void {

  // this.idPago = this.activateRoute.snapshot.params['id'];

  // this.imgSubs = this.reciboService.actualizacion
  // .pipe(
  //   delay(3000))
  
  this.activateRoute.params
  .subscribe(({id})=> 
    this.cargarReciboPorPago(id));
    
  this.activateRoute.params
  .subscribe( ({id}) => 
    {this.cargarPagos(id)});

  this.activateRoute.params
  .subscribe(resp => 
    this.cargarReciboPorPago(this.idPago));
}




get pago() {
  
  return this.myForm.get('pagos') as FormArray;
  
}


cargarReciboPorPago(id:string){
  if (id === undefined) {
    return;
  }


  this.cargando = true;
  
  this.reciboService.obtenerReciboPorPagoId( id ).subscribe( (resp:any) => {
    
    this.Recib = resp
    this.cargando = false;
    
    if (this.Recib?.length === 0) {
      return;
    }
    
     
      
    }) 

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
                       this.hdh = this.estudiantesTemp.pagos?.length as number;
                       console.log(this.estudiantesTemp)
                       this.ComprobadorAprobado();

                      })

}


addModulo(index:number) {

if (this.pagoSeleccionado?.curso?.valor === undefined) {
    
    this.pago.push(this.fb.control(0));
  }

  

  if (this.pagoSeleccionado?.curso?.valor !== undefined) {
    this.pago.push(this.fb.control(this.pagoSeleccionado?.pagos![index]));   
    
  }


 
}


ComprobadorAprobado(){
  if(this.estudiantesTemp?.pagos?.length == this.estudiantesTemp?.curso?.valor){
    this.cread = true;
    this.suma = (this.estudiantesTemp?.pagos as number[]).reduce((accumulator, currentValue) => accumulator + currentValue, 0);        
    // console.log(this.suma)
    
    if (this.suma == this.estudiantesTemp?.curso?.valor) {
      this.aprobado = true;
    } else {
      this.aprobado = false;
    }
   
  }

  
}


cargarPagos(id:string){
  if (id === 'nuevo') {
    return;
  }

  if (id !== undefined) {

    this.estudianteService.obtenerEstudiantePorId(id)
    .pipe(
      delay(100)
    )
                            .subscribe( (estudianteP:Estudiante) => {   
                                // const { curso, usuario } = estudianteP
                                this.pagoSeleccionado = estudianteP
                            
                                // this.myForm.setValue( {  pagos: [] } )

                                this.numeroModulos()
                            }, error => {
                              return this.router.navigateByUrl(`/dashboard/notas`);
                            })


  }
}

cambiarEstado(recibo:Recibo){

console.log(recibo)
  Swal.fire({
    title: "Quiere Actualizar el recibo?",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Actualizar",
    denyButtonText: `No Actualizar`
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire("Actualización con exito" , "", "success");
      console.log(recibo)
      this.reciboService.actualizarRecibo(recibo)

      
      
      .subscribe(resp=>{
      })
    } else if (result.isDenied) {
      Swal.fire("No se Actualizo la información", "", "info");
    }
  });

  // this.reciboService.actualizarRecibo(recibo)
  // .subscribe(resp=>{

  //   Swal.fire('Actualizado',`Actualizado correctamente`, 'success');
  // })
}

get periodos(): Periodo[] {

  return this.periodo;

}

eliminarRecibo(recibo:Recibo){
  Swal.fire({
    title: "Esta seguro de eliminar el recibo?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Borrar",
    denyButtonText: `No Borrar`
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire("Borrado con exito" , "", "success");
      this.reciboService.borrarRecibo(recibo)
  .subscribe(resp=>{
    })
    } else if (result.isDenied) {
      Swal.fire("No se Actualizo la información", "", "info");
    }
  });

  
}
numeroModulos(){
   
    
    this.pagos = []
    
    this.jd = this.myForm.get('periodo')?.value ?? "0";
      
    
    let array = this.myForm.get('pagos') as FormArray;
    
    // console.log(this.pagoSeleccionado)
    for ( let index = 0 ; index  < (this.pagoSeleccionado?.curso?.modulos ?? 0); index++) {
      
      this.addModulo(index);
           
          } 
          
         
          this.cantidad = array.length
          
     
  // })
  }
// }
guardarNota(){

    

  const {nota} =this.myForm.value;

  if (this.pagoSeleccionado) {
    //Actualizar
    const data = {
      ...this.myForm.value,
      _id:this.pagoSeleccionado._id
    }
    this.estudianteService.actualizarEstudiante(data)
    .subscribe(resp=>{
     
      Swal.fire('Actualizado',`Actualizado correctamente`, 'success');
    })
  }

}


}
