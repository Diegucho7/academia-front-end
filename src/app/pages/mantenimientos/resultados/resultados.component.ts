import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../../services/curso.service';
import { EstudianteService } from '../../../services/estudiante.service';
import { ProfesorService } from '../../../services/profesor.service';
import { Curso } from '../../../models/curso.model';
import { Subscription, delay } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Profesor } from '../../../models/profesor.model';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: ``
})
export class ResultadosComponent implements OnInit{
  public titulo: string = 'Estadisticas'
  constructor(
            private cursoService: CursoService,
            private estudianteService: EstudianteService,
            private profesorService: ProfesorService
  ) {   }
  ngOnInit(): void {
    this.cargarCursos(),
    this.cargarProfesores()
  }


  public profesores: Profesor[] = [];
  public cargando: boolean = true;
  public profesoresTemp:Profesor[] =  [];
  public cursos: Curso[] = [];
  private imgSubs?: Subscription;

  public cursosTemp:Curso[] =  [];
  cargarCursos(){
    this.cargando = true;
    this.cursoService.cargarCursos()
                        .subscribe(cursos=>{
                          this.cargando = false;
                         this.cursos = cursos; 

                         this.cursos   = cursos;
                         this.cursosTemp = cursos;
                         this.cargando = false;
                        })



  }

  cargarProfesores(){
    this.cargando = true;
    this.profesorService.cargarProfesores()
                        .subscribe(profesores=>{
                          this.cargando = false;
                         this.profesores = profesores; 

                         this.profesores   = profesores;
                         this.profesoresTemp = profesores;
                         this.cargando = false;
                        })



  }

}
