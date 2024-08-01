import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, Subscription, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectService } from '../../../services/select.service';
import { PeriodoService } from '../../../services/periodo.service';
import { Periodo } from '../../../models/periodo.model';
import { EstudianteAc } from '../../../models/estudianteUser.model';
import { Recibo } from '../../../models/recibo.model';


import { Nota } from '../../../models/nota.model';
import Swal from 'sweetalert2';
import { NotaService } from '../../../services/nota.service';
import { EstudianteService } from '../../../services/estudiante.service';
import { Estudiante } from '../../../models/estudiante.model';
import { PagosService } from '../../../services/pagos.service';
import { RecibosService } from '../../../services/recibos.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { FileUploadService } from '../../../services/file-upload.service';

@Component({
  selector: 'app-pagos-estudiante',
  templateUrl: './pagos-estudiante.component.html',
  styles: ``
})
export class PagosEstudianteComponent  implements OnInit {


  public Recib?: Recibo[]

  public recibo?: Recibo;

  public cargando: boolean = true;

  public periodo: Periodo[] = [];
  public period?: Periodo;
  public estudiante: EstudianteAc[] = [];
  public notaSeleccionada?: Nota;
  public cantidad! : number ;
  public cread : boolean = false;
  public  idRecibo?: string;

  public hdh: number = 0

  public suma : number = 0;
  public promedio : number = 0;
  public aprobado : boolean = false;

  public valores? : number[]= []

  public idPago:string = "";

  public est?: Estudiante
  public estudiantes: Estudiante[] = [];
  public estudiantesTemp?:Estudiante;
  public reciboTemp?:Recibo;
  public imagenSubir!: File;
  public ultimo?: Recibo

  private imgSubs?: Subscription;
  public imgTemp: any = null ;
  public myForm: FormGroup = this.fb.group({
    periodo : ['', Validators.required ],
    estudiante: ['', Validators.required ],
    pagos : this.fb.array([])
 
  });
  
  public pagos : number[] = [0];
  public jd? :string = "0";
  
  
  constructor(
    private fb: FormBuilder,
    private selectService: SelectService,
    private periodoService: PeriodoService,
    private router : Router,
    private notaService : NotaService,
    private activateRoute:ActivatedRoute,
    private estudianteService:EstudianteService,
    private reciboService: RecibosService,
    private modalImagenService: ModalImagenService,
    private fileUploadservice: FileUploadService
  ) {
    
}

ngOnDestroy(): void {
  this.imgSubs?.unsubscribe();
}
ngOnInit(): void {

  this.idPago = this.activateRoute.snapshot.params['id'];

  this.activateRoute.params
  .subscribe( ({id}) => 
    {this.cargarEstudiantes(id)});


  this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(2000))
      
      .subscribe(img=> 
        this.cargarReciboPorPago(this.idPago));
        
      

    this.activateRoute.params
    .subscribe( ({id}) => 
      {this.cargarReciboPorPago(id)});
  }



cargarPeriodo(){
  this.periodoService.cargarPeriodos().subscribe(periodos => {
    this.periodo = periodos;
 
  });
}


get pago() {
  
  return this.myForm.get('pagos') as FormArray;
  
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
                       this.ComprobadorAprobado();
                      //  console.log(this.estudiantesTemp)
                      })




}


addModulo(index:number) {

if (this.estudiantesTemp?.curso?.valor === undefined) {
    
    this.pago.push(this.fb.control(0));
  }

  

  if (this.estudiantesTemp?.curso?.valor !== undefined) {
    this.pago.push(this.fb.control(this.estudiantesTemp?.pagos![index]));   
    
  }


 
}


ComprobadorAprobado(){
  if(this.estudiantesTemp?.modulos){
    this.cread = true;
    this.suma = (this.estudiantesTemp?.pagos as number[]).reduce((accumulator, currentValue) => accumulator + currentValue, 0);        
    
    if (this.suma == this.estudiantesTemp?.curso?.valor) {
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
                                const { curso, estudiante,pagos} = estudiantes
                                this.estudiantesTemp = estudiantes
                                this.cargando = false;
                                this.myForm.setValue( { periodo: curso._id , estudiante: estudiante._id, pagos: [] } )
                                this.ComprobadorAprobado();
                              }, error => {
                              return this.router.navigateByUrl(`/dashboard//pagos-estudiante`);
                            })


  }
}



get periodos(): Periodo[] {

  return this.periodo;

}


numeroModulos(){
   
  
    
    this.pagos = []
    
    this.jd = this.myForm.get('periodo')?.value ?? "0";
      
      
    
    let array = this.myForm.get('pagos') as FormArray;
    
    
    for ( let index = 0 ; index  < this.estudiantesTemp?.curso?.valor! ?? 0; index++) {
      
      
      this.addModulo(index);
           
          } 
          
          // this.ComprobadorAprobado(hdh);
          this.cantidad = array.length
          
     
  // })
  }
// }

// }
async abrirSweetAlert(){
    
  const {value = undefined} = await Swal.fire<number>({
    title:"Ingrese comprobante de pago",
    text: "Ingrese el valor del comprobante de pago",
    input: "number",
    // inputPlaceholder: "Valor del comprobante de pago" +
    // input: "number",
    inputPlaceholder: "Referencia del comprobante de pago",
    showCancelButton: true,
  });
  if (value!.toString().trim().length > 0){
    this.reciboService.crearRecibo(value!,this.idPago)
    .subscribe((resp:any) => {
      this.reciboService.obtenerReciboPorId(resp)
      .subscribe((resp:any) =>{
        this.reciboTemp = resp
      })
                          // this.router.navigateByUrl(`/dashboard/notas/${resp.id}`)
                          // this.academias.push(resp.academia)
                        })
                        this.activateRoute.params
                        .subscribe( ({id}) => 
                          {this.cargarReciboPorPago(id)});
                      

  }
  
}
abrirModal(recibo:Recibo){

  this.modalImagenService.abrirModal('recibos', recibo._id, recibo.img!);

}

 cambiarImagen(file:File){
  this.imagenSubir = file;


  if(!file){return;}

  const reader = new FileReader();
  const url64 = reader.readAsDataURL(file);


  reader.onloadend = () =>{
   this.imgTemp = reader.result;
  }
 }

 subirImagen(){
 
                          // this.router.navigateByUrl(`/dashboard/notas/${resp.id}`)
                          // this.academias.push(resp.academia)
                        // })
   this.fileUploadservice.actualizarFoto(this.imagenSubir, 'recibos', this.recibo?._id!)
   .then( img =>{
    this.recibo = img ;
     // Swal.fire('Guardado', 'Cambios fueron guardados','success');

   }).catch (err=>{
     Swal.fire('Error', err.error.msg,'error')

   })
     
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
        this.ultimo = this.Recib![this.Recib!.length-1]
     
      
    }) 

}
}
