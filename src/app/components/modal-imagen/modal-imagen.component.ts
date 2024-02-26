import { Component } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: ``
})


export class ModalImagenComponent {
  


  public imagenSubir?: File;
  public imgTemp: any = null;
  
  constructor(public modalImagenService:ModalImagenService,
                public fileUploadservice:FileUploadService){}
                

  cerrarModal(){
    this.modalImagenService.cerrarModal();
    this.imgTemp = null 
  } 

 
   cambiarImagen( file: File ) {
    this.imagenSubir = file;

    if ( !file ) { 
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
      
    }
     return;
  }

  subirImagen(){

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;



    this.fileUploadservice.actualizarFoto(this.imagenSubir!, tipo, id)
    .then( img =>{
      Swal.fire('Guardado', 'Cambios fueron guardados','success');
      this.modalImagenService.nuevaImagen.emit(img);
      this.cerrarModal();

    }).catch (err=>{
      console.log(err);
      Swal.fire('Error', err.error.msg,'error')

    })
      
  }
} 
