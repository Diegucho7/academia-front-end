import { Component, Input, OnInit } from '@angular/core';
import { CursoService } from '../../../services/curso.service';
import { EstudianteService } from '../../../services/estudiante.service';
import { ProfesorService } from '../../../services/profesor.service';
import { Curso } from '../../../models/curso.model';
import { Subscription, delay } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Profesor } from '../../../models/profesor.model';
import { ResultadosService } from '../../../services/resultados.service';
import { Estudiante } from '../../../models/estudiante.model';
import { Periodo } from '../../../models/periodo.model';
import { PeriodoService } from '../../../services/periodo.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData } from 'chart.js';
@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: ``
})
export class ResultadosComponent implements OnInit{

  @Input() title: string = 'Sin titulo';
  @Input('labels') doughnutChartLabels: string[] = [];
  @Input('data') dataDonut: number[] = [];
  @Input('backgroundColor') backgroundColorDonut: string[] = [];
  

  charOptions = {
    resposive: true,
    maintainAspectRatio: false
  }; // TODO: evaluar si es candidato a ser @Input()
 
  public titulo: string = ''
  public cantidadA: number = 0
  public arreglo: number[] = [1,1]

  constructor(
            private cursoService: CursoService,
            private profesorService: ProfesorService,
            private resultadosService: ResultadosService,
            private periodoService: PeriodoService
  ) {  this.dataDonut = [350, 450, 100];
    this.doughnutChartLabels = ['Labels1', 'Labels2', 'Labels3'];
    this.backgroundColorDonut = ['#6857E6', '#009FEE', '#F02059']; }
  ngOnInit(): void {
    this.cargarCursos()

    this.doughnutChartData.datasets[0].data = this.dataDonut;
    this.doughnutChartData.datasets[0].backgroundColor = this.backgroundColorDonut;
    this.doughnutChartData.labels = this.doughnutChartLabels;
    // this.cargarDatos()
  }


    public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [350, 450, 100],
        backgroundColor: this.backgroundColorDonut
      },
    ]
    };

  public profesores: Estudiante[] = [];
  public cargando: boolean = true;
  public profesoresTemp:Estudiante[] =  [];
  public cursos: Estudiante[] = [];
  public curso : Periodo[] = [];
  private imgSubs?: Subscription;

  public cursosTemp:Periodo[] =  [];

  
    
  


  cargarCursos(){
    this.cargando = true;
    this.periodoService.cargarPeriodos()
                        .subscribe(cursos=>{
                          this.cargando = false;
                         this.curso = cursos; 

                         this.curso   = cursos;
                         this.cursosTemp = cursos;
                         this.cargando = false;
                        })



  }



  select(event:any){
    const selectedCursoId = event.target.value;
    // Aquí puedes realizar las operaciones que necesites con el valor seleccionado
    console.log('Curso seleccionado:', selectedCursoId);

    this.cargarDatos(selectedCursoId);



}
selectb(event:any){
  const selectedCursoIdB = event.target.value;
  // Aquí puedes realizar las operaciones que necesites con el valor seleccionado
  console.log('Curso seleccionado:', selectedCursoIdB);

  // this.data = [this.cantidadA,  4 ]
}
  cargarDatos(curso:string){
    this.cargando = true;
    this.resultadosService.buscar('cursos',curso)
                        .subscribe(cursos=>{
                          this.cargando = false;
                         this.profesores = cursos; 

                         this.profesores   = cursos;
                         this.profesoresTemp = cursos;

                         this.cargando = false;
                          this.cantidadA = this.profesoresTemp.length
                           this.arreglo=[this.cantidadA,3]

                         console.log(this.cantidadA+"jj");
                         console.log(this.arreglo);
                        })



  }

}
