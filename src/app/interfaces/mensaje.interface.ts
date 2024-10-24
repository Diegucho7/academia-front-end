export interface Mensaje {
    
    for: string;
    cedula: string;
    nombre: string;
    apellido: string;
    mensaje: string;
    fecha: Date;
    uid?: string;
}