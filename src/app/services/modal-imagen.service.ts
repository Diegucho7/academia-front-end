import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal:boolean = true;
  public tipo! :'usuarios'|'profesores'|'academias'|'cursos'|'materias'|'estudiantes'|'recibos';
  public id! : string;
  public img? : string;

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal(){
    return this._ocultarModal;
  }

    abrirModal(
    tipo: 'usuarios'|'profesores'|'academias'|'cursos'|'materias'|'estudiantes'|'recibos',
    id: string,
    img :string = 'no-image'
  ){
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    // this.img = img;
    if (img.includes('https')) {

      this.img = img;
    }   else {
      this.img = `${base_url}/uploads/${tipo}/${img}`;
    }
    //http://localhost:3000/api/uploads/usuarios/d69fb091-133f-4409-9cfb-33d08f5838d5.jpg


  }
  cerrarModal(){
    this._ocultarModal = true;
  }


  constructor() { }
}
