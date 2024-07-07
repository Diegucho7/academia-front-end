import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectService } from '../../../services/select.service';
import { PeriodoService } from '../../../services/periodo.service';
import { Periodo } from '../../../models/periodo.model';
import { EstudianteAc } from '../../../models/estudianteUser.model';

import Swal from 'sweetalert2';
import { PagosService } from '../../../services/pagos.service';
import { Pago } from '../../../models/pago.model';
import { FileUploadService } from '../../../services/file-upload.service';
import { EstudianteService } from '../../../services/estudiante.service';
import { Estudiante } from '../../../models/estudiante.model';
import { ProfesorService } from '../../../services/profesor.service';
import { Usuario } from '../../../models/usuario.model';
import { Profesor } from '../../../models/profesor.model';


@Component({
  selector: 'app-pagos-id',
  templateUrl: './pagos-id.component.html',
  styles: ``
})
export class PagosIdComponent implements OnInit {
  
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
  
  public myForm: FormGroup = this.fb.group({
    cursos : ['', Validators.required ],
    periodo : ['', Validators.required ],
    estudiante: ['', Validators.required ],
    modulos : this.fb.array([]),
    img: this.fb.array([])

 
  });
  
  public imagenSubir!: File;
  public imgTemp: any = null ;

  public img : number[] = [0];
  public modulos : number[] = [0];
  public jd? :string = "0";
  
  
  constructor(
    private fb: FormBuilder,
    private selectService: SelectService,
    private periodoService: PeriodoService,
    private router : Router,
    private activateRoute : ActivatedRoute,
    private pagoService : PagosService,
    private fileUploadservice: FileUploadService,
    private estudianteService: EstudianteService,
    private profesoresService: ProfesorService
    
  ) {
    
}

ngOnInit(): void {
  this.activateRoute.params
  .subscribe( ({id}) => 
    {this.cargarPago(id)});
  this.cargarEstudiante();

  this.onPeriodoChanged();
  this.numeroModulos();
  this.cargarPeriodo ();
}

cargarPeriodo(){
  this.periodoService.cargarPeriodos().subscribe(periodos => {
    this.periodo = periodos;
 
  });
}

get imagenes(){
  return this.myForm.get('img') as FormArray;
}

get modulo() {
  
  return this.myForm.get('modulos') as FormArray;
  
}

subirImagen(){
  // this.fileUploadservice.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid!)
  // .then( img =>{
  //   this.usuario.img = img ;
    
  
  // Swal.fire('Guardado', 'Cambios fueron guardados','success');

  // }).catch (err=>{
  //   console.log(err);
  //   Swal.fire('Error', err.error.msg,'error')

  // })
    
}

cargarEstudiante(){
  this.profesoresService.cargarEstudiantes().subscribe( estudiantes => {
    this.estu = estudiantes;
    console.log(this.estu)  
 
  });
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

    this.pagoService.obtenerPagoPorId(id)
    .pipe(
      delay(100)
    )
                            .subscribe( (pago:any) => {   
                              console.log(pago)
                                const { periodo, estudiante,modulos} = pago
                                this.pagoSeleccionado = pago
                                this.myForm.setValue( { periodo: periodo._id , estudiante: estudiante._id, modulos: [] } )
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

onPeriodoChanged(): void {
 
  this.myForm.get('periodo')?.valueChanges
  .pipe(
    tap( () => this.myForm.get('estudiante')!.setValue('') ),

    switchMap( (periodo) => this.selectService.getCursebyEstudiante(periodo) )
    )
    .subscribe( estudiantes => {
      this.estudiante= estudiantes ;
    }
       );

}

onEstudianteChanged(): void {
 
  this.myForm.get('cursos')?.valueChanges
  .pipe(
    tap( () => this.myForm.get('periodo')!.setValue('') ),

    switchMap( (periodo) => this.selectService.getEstudiantebyCurse(periodo) )
    )
    .subscribe( estudiantes => {
      this.estudiante= estudiantes ;
    }
       );

}



}
