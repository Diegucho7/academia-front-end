import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {


  public menu: any[] = [];

    cargarMenu(){

      this.menu = JSON.parse(localStorage.getItem('menu') || '') || [];

      //Redirecionar al login
      // if (this.menu.length === 0) {
        
      // }
    }
  // menu : any[] = [
  //   {   
  //       titulo : "Principal",
  //       icono: "fa-solid fa-gauge",
  //         submenu:[
  //           { titulo: 'Main', url: '/' },
  //           { titulo: 'Gráficas', url: 'grafica1' },
  //           { titulo: 'rxjs', url: 'rxjs' },
  //           { titulo: 'Promesas', url: 'promesas' },
  //           { titulo: 'ProgressBar', url: 'progress' },
  //           { titulo: 'Perfil', url: 'perfil' },

  //         ]
  
  //   },
  //   {   
  //       titulo : "Mantenimiento",
  //       icono: "fa-solid fa-screwdriver-wrench",
  //         submenu:[
  //           { titulo: 'Usuarios', url: 'usuarios' },
  //           { titulo: 'Hospitales', url: 'hospitales' },
  //           { titulo: 'medicos', url: 'medicos' },
         

  //         ]
  
  //   }
  // ]

  constructor() { }
}
