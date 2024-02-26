import Swal from 'sweetalert2';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AcademiaService } from '../../../services/academia.service';
import { Academia } from '../../../models/academia.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription, delay } from 'rxjs';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-academias',
  templateUrl: './academias.component.html',
  styles: ``
})
export class AcademiasComponent implements OnInit, OnDestroy{
  
  public academias: Academia[] = [];
  public cargando: boolean = true;
  private imgSubs?: Subscription;

  public academiasTemp:Academia[] =  [];
  constructor(
              private academiaService:AcademiaService,
              private modalImagenService: ModalImagenService,
              private busquedaService: BusquedasService
  ){}

  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }
  
  ngOnInit(): void {
    this.cargarAcademias();

    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100))
    .subscribe(img=> 
      this.cargarAcademias());


  }
  
  cargarAcademias(){
    this.cargando = true;
    this.academiaService.cargarAcademias()
                        .subscribe(academias=>{
                          this.cargando = false;
                         this.academias = academias; 

                         this.academias   = academias;
                         this.academiasTemp = academias;
                         this.cargando = false;
                        })



  }

  guardarCambios(academia:Academia){
      this.academiaService.actualizarAcademia(academia._id,academia.nombre)
      .subscribe( resp => {
        Swal.fire('Actualizado', academia.nombre, 'success')
      })
  }
  eliminarAcademia(academia:Academia){
      this.academiaService.borrarAcademia(academia._id)
      .subscribe( resp => {
        this.cargarAcademias()
        Swal.fire('Borrado', academia.nombre, 'success')
      })
  }

   async abrirSweetAlert(){
    
    const {value = ''} = await Swal.fire<string>({
      title:"Crear Academia",
      text: "Ingrese el nombre del nuevo academia",
      input: "text",
      inputPlaceholder: "Nombre del academia",
      showCancelButton: true,
    });
    if (value!.trim().length > 0){
      this.academiaService.crearAcademia( value! )
                          .subscribe((resp:any) => {
                            this.academias.push(resp.academia)
                          })

    }
    
  }

  abrirModal(academia:Academia){
    this.modalImagenService.abrirModal('academias', academia._id, academia.img);
  }

  buscar(termino:string){
    if (termino.length === 0) {
      return this.academias = this.academiasTemp;
    }
    
    this.busquedaService.buscar('academias',termino)
      .subscribe(resultados => {
        this.academias = resultados as Academia[];
      })
      return [];

  }
  
}
