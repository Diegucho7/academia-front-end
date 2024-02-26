import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';
import { Usuario } from '../../models/usuario.model';
import { Profesor } from '../../models/profesor.model';
import { Academia } from '../../models/academia.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: ``
})
export class BusquedaComponent implements OnInit{


    public usuarios: Usuario[] = [];
    public profesores: Profesor[] = [];
    public academias: Academia[] = [];

      constructor(private activateRoute:ActivatedRoute,
                  private busquedasService:BusquedasService){ }

  ngOnInit(): void {
    this.activateRoute.params
        .subscribe(({termino}) =>
          this.busquedaGlobal(termino))
  }

  busquedaGlobal(termino:string){
    this.busquedasService.busquedaGlobal(termino)
                          .subscribe((resp:any) =>{
                            this.usuarios = resp.usuarios;
                            this.profesores = resp.profesores;
                            this.academias = resp.academias;
                          })
  }

  abrirProfesor(profesor:Profesor){
      
  }

}
