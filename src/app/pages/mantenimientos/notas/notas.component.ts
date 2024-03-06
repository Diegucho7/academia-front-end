import { Component, OnInit, input } from '@angular/core';
import { MateriaService } from '../../../services/materia.service';
import { CursoService } from '../../../services/curso.service';
import { Materia } from '../../../models/materia.model';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styles: ``
})

export class NotasComponent implements OnInit {
  public cargando: boolean = true;
  public materias : Materia[] =[];
    constructor(
                private materiaService: MateriaService,
                private cursoService: CursoService,
    ){

      
    }
    progreso1: number = 0;
    progreso2: number = 0;
   
    get getProgreso1(){
       return `${this.progreso1}%`;
    }
    get getProgreso2(){
       return `${this.progreso2}%`;
    }
   
    
  ngOnInit(): void {
    this.cargarMaterias()
  }
    cargarMaterias(){
      cargando: true;
      this.materiaService.cargarMaterias().subscribe((
            materias:Materia[]
      ) =>{ this.materias = materias

      })
    }
}
