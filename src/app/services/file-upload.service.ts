import { Injectable } from '@angular/core';
import{environment} from '../../environments/environment'
import Swal from 'sweetalert2';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }


  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios'|'profesores'|'academias'|'cursos'|'materias'|'estudiantes'|'recibos',  
    id: string
  ) :Promise<any>{

    try {
      
      const url = `${base_url}/uploads/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen',archivo);
      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token')|| ''       
        },
        body: formData
      });

      const data = await resp.json() 
      if(data.ok){
        return data.nombreArchivo;
      }else{
             console.log(data.msg);
                return false;
      }


    } catch (error) {
      console.log(error);
      return false;
    }

  }

}
