import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';


const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  
  transform(img?: string, tipo?: 'usuarios'|'profesores'|'academias'|'cursos'|'materias'|'estudiantes'|'recibos'): string {
    if(!img){
      return `${ base_url }/uploads/uploads/no-img.jpg`;

  }else if ( img?.includes('https') ) {
      return img;
      
  } else if ( img) {
      return `${ base_url }/uploads/${tipo}/${ img }`;

    } 
    
    else {
      return `${ base_url }/uploads/uploads/no-img.jpg`;
  }
  
}

}
