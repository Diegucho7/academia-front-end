import { environment } from '../../environments/environment';
import { Academia } from './academia.model';

const base_url = environment.base_url;
export class Usuario{

    constructor(
        public nombre: string,
        public apellido: string,
        public email: string,
        public cedula: string,
        public telefono: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: 'ADMIN_ROLE' | 'USER_ROLE' | 'PROFESOR_ROLE' | 'ESTUDIANTE_ROLE',
        public academia?: string,
        public estado?: boolean,
        public uid?: string,

    ){}

    get imagenUrl() {

        if(!this.img){
            return `${ base_url }/uploads/uploads/no-img.jpg`;

        }else if ( this.img?.includes('https') ) {
            return this.img;
            
        } else if ( this.img) {
            return `${ base_url }/uploads/usuarios/${ this.img }`;
        } else {
            return `${ base_url }/uploads/uploads/no-img.jpg`;
        }
    }
}