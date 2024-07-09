import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { delay, switchMap, tap, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectService } from '../../../services/select.service';
import { PeriodoService } from '../../../services/periodo.service';
import { Periodo } from '../../../models/periodo.model';
import { EstudianteAc } from '../../../models/estudianteUser.model';


import Swal from 'sweetalert2';
import { PagosService } from '../../../services/pagos.service';
import { Pago } from '../../../models/pago.model';
import { FileUploadService } from '../../../services/file-upload.service';

import { ProfesorService } from '../../../services/profesor.service';
import { Usuario } from '../../../models/usuario.model';
import { Recibo } from '../../../models/recibo.model';
import { RecibosService } from '../../../services/recibos.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';





import { BusquedasService } from '../../../services/busquedas.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Observable, Observer} from 'rxjs';
import { AcademiaService } from '../../../services/academia.service';
import { Academia } from '../../../models/academia.model';


@Component({
  selector: 'app-pagos-id',
  templateUrl: './pagos-id.component.html',
  styles: ``
})
export class PagosIdComponent implements OnInit {


  public imagenSubir!: File;
  public imgTemp: any = null ;

  public img? : string;
  public modulos : number[] = [0];
  public jd? :string = "0";

  // public reciboForm : FormGroup ;
  public recib : Recibo[]= [];
  private imgSubs?: Subscription;
  public curso: EstudianteAc[] = [];
  public periodo: Periodo[] = [];
  public period?: Periodo;
  public estudiante: EstudianteAc[] = [];
  public estu: Usuario[]=[];
  public pagoSeleccionado?: Pago;
  public cantidad! : number ;
  public cread : boolean = false;
  
  public suma : number = 0;
  public promedio : number = 0;
  public aprobado : boolean = false;
  
  public cargando: boolean = true;

  
  public myForm: FormGroup = this.fb.group({
    
    estudiante : ['', Validators.required ],
    periodo : ['', Validators.required ],
    
    modulos : this.fb.array([]),
    // img: this.fb.array([])
    
    
  });
  
 
  
  
  
  constructor(
    private fb: FormBuilder,
    private selectService: SelectService,
    private periodoService: PeriodoService,
    private router : Router,
    private activateRoute : ActivatedRoute,
    private pagoService : PagosService,
    private fileUploadservice: FileUploadService,
    private profesoresService: ProfesorService,
    private reciboService:RecibosService,
    private modalImagenService: ModalImagenService
  ) {
    
}

ngOnInit(): void {

  

  this.activateRoute.params
  .subscribe( ({id}) => 
    {this.cargarPago(id)});
  this.activateRoute.params
  .subscribe( ({id}) => 
    {this.cargarRecibos(id)});
  this.cargarEstudiante();

  this.onEstudianteChanged();
  this.numeroModulos();




  
}


get imagenes(){
  return this.myForm.get('img') as FormArray;
}

get modulo() {
  
  return this.myForm.get('modulos') as FormArray;
  
}

subirImagen(){


  // Subir imagen con comprobante de pago

  // this.reciboService.crearRecibo(this.reciboForm.value)
  //     .subscribe((resp:any) =>{
  //       Swal.fire('Subido',`Subido correctamente`, 'success');
  //       // this.router.navigateByUrl(`/dashboard/pagos/${resp.recibo._id}`)
  //     })

// Fin


  // this.fileUploadservice.actualizarFoto(this.imagenSubir, 'recibos', this.recibo._id!)
  // .then( img =>{
  //   this.recibo.img = img ;
    
  
  // Swal.fire('Guardado', 'Cambios fueron guardados','success');

  // }).catch (err=>{
  //   console.log(err);
  //   Swal.fire('Error', err.error.msg,'error')

  // })
    
}

async abrirSweetAlert(){
  const id = this.activateRoute.snapshot.params['id']; 
  const {value = 0} = await Swal.fire<number>({
    title:"Ingresar Recibo",
    text: "Ingrese el valor del Recibo",
    input: "number",
    inputPlaceholder: "Valor del Recibo",
    showCancelButton: true,
  });
  if (value! > 0){
    this.reciboService.crearRecibo( value!,id )
                        .subscribe((resp:any) => {
                          this.recib.push(resp.recibo)
                        })

  }
  
}
guardarCambios(recibos:Recibo){
  
  this.reciboService.actualizarRecibo(recibos._id,`${recibos.valor}`)
      .subscribe( resp => {
        Swal.fire('Actualizado', recibos.valor?.toString(), 'success')
      })
}


eliminarRecibo(recibo:Recibo){
  const id = this.activateRoute.snapshot.params['id']; 
  this.reciboService.borrarRecibo(recibo._id)
  .subscribe( resp => {
    this.cargarRecibos(id)
    Swal.fire('Borrado', recibo.valor?.toString(), 'success')
  })
}


cambiarAprobado(recibo:Recibo){
  this.reciboService.guardarAprobado(recibo)
  .subscribe(resp=>{
    console.log(resp);
    console.log(recibo)
  })
}
cargarEstudiante(){
  this.profesoresService.cargarEstudiantes().subscribe( estudiantes => {
    this.estu = estudiantes;
    
    // this.cargando = false;

  });
}
cargarRecibos(id:string){
  this.reciboService.obtenerReciboPorPagoId(id).subscribe( resp => {
    this.recib = resp;
    
    // this.cargando = false;

  });
}

abrirModal(recibo:Recibo){
  this.modalImagenService.abrirModal('recibos', recibo._id, recibo.img);
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

addModulo(index:number) {

  if (this.pagoSeleccionado?.modulos === undefined) {
    
    this.modulo.push(this.fb.control(0));
  }

  

  if (this.pagoSeleccionado) {
      this.modulo.push(this.fb.control(this.pagoSeleccionado?.modulos![index]));   
  }
 
}

addFile(index:number) {
  this.imagenes.push(this.fb.control([index]))
  console.log("Probando")
}

ComprobadorAprobado(){
  if(this.pagoSeleccionado){
    this.cread = true;

    this.suma = (this.pagoSeleccionado.modulos as number[]).reduce((accumulator, currentValue) => accumulator + currentValue, 0);        
    
    this.promedio = this.suma / this.pagoSeleccionado.modulos!.length;
    if (this.suma == this.pagoSeleccionado.periodo?.valor) {
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
cargarPago(id:string){
  if (id === 'nuevo') {
    return;
  }

  if (id !== undefined) {
    this.cargando = true;
    this.pagoService.obtenerPagoPorId(id)
    .pipe(
      delay(100)
    )
                            .subscribe( (pago:any) => {   
                             
                                const {  estudiante,periodo,modulos} = pago
                                this.pagoSeleccionado = pago
                                this.myForm.setValue( {estudiante: estudiante._id, periodo: periodo._id ,  modulos: [] } )
                                this.cargando = false;
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
      
      
      this.periodoService.obtenerPeriodoPorId(this.jd!).subscribe(resp => {
        this.period = resp;
        let array = this.myForm.get('modulos') as FormArray;
        

          for ( let index = 0 ; index  < this.period.modulos! ?? 0; index++) {

            
            this.addModulo(index);
           
          } 
          
          this.ComprobadorAprobado();
          this.cantidad = array.length
          
  })
  }
}

guardarPago(){

  
  const {pago} =this.myForm.value;

  if (this.pagoSeleccionado) {
    //Actualizar
    const data = {
      ...this.myForm.value,
      _id:this.pagoSeleccionado._id
    }
    this.pagoService.actualizarPago(data)
    .subscribe(resp=>{
     
      Swal.fire('Actualizado',`Actualizado correctamente`, 'success');
    })
  }else{
    //Crear
   
    this.pagoService.crearPago(this.myForm.value)
      .subscribe((resp:any) =>{
        Swal.fire('Creado',`Creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/pagos/${resp.pago._id}`)
      })
  }


}
get periodos(): Periodo[] {

  return this.periodo;

}


onEstudianteChanged(): void {
 

      
      this.myForm.get('estudiante')?.valueChanges
      .pipe(
        tap( () => this.myForm.get('periodo')!.setValue('') ),
        
        switchMap( (curso) => this.selectService.getCursebyEstudiante(curso) )
      )
      
      .subscribe( cursos => {
        this.curso = cursos;
       
    })

 }

}
